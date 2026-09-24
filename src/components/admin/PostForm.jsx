import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill'; // Will be lazy loaded
import 'react-quill/dist/quill.snow.css'; // or 'quill.bubble.css'
import { PostService, CategoryService } from '../../services/api';
import Button from '../ui/Button'; // Assuming you have a Button component
import ClientOnly from './ClientOnly'; // Import ClientOnly

// Define Quill modules and formats as constants
const quillModules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean'],
    [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
    [{ 'align': [] }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};

const quillFormats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'color', 'background', 'align'
];

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(''); // For form-specific validation errors

  const navigate = useNavigate();
  const { postId } = useParams(); // For editing existing post

  const ReactQuillLazy = lazy(() => import('react-quill')); // Lazy load ReactQuill

  const isEditing = Boolean(postId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response.items || []); // Ensure categories is an array
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories. Please try again.');
      }
    };

    fetchCategories();

    if (isEditing) {
      setLoading(true);
      const fetchPostData = async () => {
        try {
          const post = await PostService.getPost(postId);
          setTitle(post.title);
          setContent(post.content);
          setImageUrl(post.image_url || '');
          setCategoryId(post.category_id || '');
          setError(null);
        } catch (err) {
          console.error('Failed to fetch post data:', err);
          setError('Failed to load post data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchPostData();
    }
  }, [postId, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous form errors

    if (!title.trim() || !content.trim()) {
      setFormError('Title and Content are required.');
      return;
    }

    setLoading(true);
    setError(null);

    const postData = {
      title,
      content,
      image_url: imageUrl || null, // Send null if empty
      category_id: categoryId ? parseInt(categoryId, 10) : null, // Send null if no category selected
    };

    try {
      if (isEditing) {
        await PostService.updatePost(postId, postData);
      } else {
        await PostService.createPost(postData);
      }
      navigate('/admin/posts'); // Redirect to manage posts page after success
    } catch (err) {
      console.error('Failed to save post:', err);
      setError(err.response?.data?.detail || 'Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && isEditing && !title) { // Show loading only when fetching existing post data
    return <div className="container mx-auto px-4 py-8 text-center">Loading post data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
      
      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      {formError && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{formError}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <ClientOnly>
            <Suspense fallback={<div className="py-2 px-3 border border-gray-300 rounded-md shadow-sm min-h-[340px] dark:bg-gray-700 dark:border-gray-600">Loading editor...</div>}>
              <ReactQuillLazy
                theme="snow" // or "bubble"
                value={content}
                onChange={setContent} // ReactQuill passes the HTML content directly
                modules={quillModules}
                formats={quillFormats}
                className="mt-1 bg-white dark:bg-gray-700 dark:text-white" // Added bg-white for light mode visibility
                placeholder="Write your amazing post content here..."
                style={{ height: '300px', marginBottom: '40px' }} // Adjust height and margin as needed
              />
            </Suspense>
          </ClientOnly>
        </div>

        <div style={{ marginTop: '50px' }}> {/* Add margin to push elements below Quill editor */}
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category (Optional)
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="" disabled>Loading categories...</option>
            )}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/posts')} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (isEditing ? 'Saving...' : 'Creating...') : (isEditing ? 'Save Changes' : 'Create Post')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
