import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PostService } from '../services/api';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch post data when component mounts or ID changes
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        
        // Fetch the current post
        const postData = await PostService.getPost(parseInt(id));
        setPost(postData);
        
        // Fetch all posts to find related ones
        const allPostsData = await PostService.getAllPosts();
        
        // Filter for related posts (same category, different ID)
        const related = allPostsData.posts.filter(
          relatedPost => relatedPost.id !== parseInt(id) && 
                       relatedPost.category_id === postData.category_id
        ).slice(0, 2); // Limit to 2 related posts
        
        setRelatedPosts(related);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load the blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostData();
  }, [id]);
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Calculate read time (rough estimation based on content length)
  const getReadTime = (content) => {
    if (!content) return '';
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // If loading, show loading message
  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading post...</p>
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="mb-4 text-red-600">{error}</p>
        <button 
          onClick={() => navigate('/blog')} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Return to Blog
        </button>
      </div>
    );
  }
  
  // If post not found, show error message
  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="mb-4">The blog post you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/blog')} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Return to Blog
        </button>
      </div>
    );
  }
  
  // Format content for display with simple formatting
  const formattedContent = `
    <div>
      <p>${post.content}</p>
    </div>
  `;
  
  // Extract tags from content
  const extractTags = (content) => {
    // A simple implementation - in a real app you might have a more sophisticated approach
    const commonTags = ['Investment', 'Finance', 'Markets', 'Economy', 'Analysis'];
    // Return 2-4 random tags for demonstration purposes
    return commonTags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);
  };
  
  const tags = extractTags(post.content);
  
  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header */}
      <header className="mb-8">
        <span className="text-blue-600 font-semibold">
          {post.category ? post.category.name : 'Uncategorized'}
        </span>
        <h1 className="text-4xl font-bold my-2">{post.title}</h1>
        
        <div className="flex items-center mt-6">
          <img 
            src="https://via.placeholder.com/100" 
            alt="Author" 
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-medium">Admin</p>
            <div className="flex text-gray-500 text-sm">
              <span>{formatDate(post.created_at)}</span>
              <span className="mx-2">•</span>
              <span>{getReadTime(post.content)}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Featured Image */}
      <img 
        src={post.image_url || "https://via.placeholder.com/1200x600"} 
        alt={post.title} 
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      
      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
      
      {/* Tags */}
      <div className="mt-8 pt-6 border-t">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Related Posts */}
      <section className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        {relatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={relatedPost.image_url || "https://via.placeholder.com/800x600"} 
                  alt={relatedPost.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <span className="text-blue-600 text-sm font-semibold">
                    {relatedPost.category ? relatedPost.category.name : 'Uncategorized'}
                  </span>
                  <h3 className="text-xl font-bold mb-2 mt-1">{relatedPost.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {relatedPost.content.length > 150 
                      ? `${relatedPost.content.substring(0, 150)}...` 
                      : relatedPost.content}
                  </p>
                  <Link to={`/blog/${relatedPost.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No related articles found.</p>
        )}
      </section>
    </article>
  );
};

export default BlogPostPage;
