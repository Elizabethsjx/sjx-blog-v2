import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card'; // Corrected import for default export
import Button from '../components/ui/Button'; // Assuming you have a Button component

const ManagePostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAdmin } = useAuth(); // Get the current user and isAdmin function

  useEffect(() => {
    const fetchUserPosts = async () => {
      // This page is now admin-only, so we fetch all posts.
      // The check for admin status will be handled by the ProtectedRoute.
      if (!user) { // Should ideally be caught by ProtectedRoute, but good for safety
        setLoading(false);
        setError('You must be logged in and an admin to view this page.');
        return;
      }
      try {
        const response = await PostService.getAllPosts(1, 100); // Fetch all posts
        setPosts(response.items);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await PostService.deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
        // Optionally, show a success message
      } catch (err) {
        setError(err.message || 'Failed to delete post.');
        console.error('Error deleting post:', err);
        // Optionally, show an error message to the user
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading posts...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please log in to manage your posts.</p>
        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Your Posts</h1>
        <Link to="/admin/posts/new">
          <Button variant="primary">Create New Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Category: {post.category?.name || 'N/A'}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Last updated: {new Date(post.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <Link to={`/admin/posts/edit/${post.id}`}>
                  <Button variant="secondary" size="sm">Edit</Button>
                </Link>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </Button>
                <Link to={`/blog/${post.id}`}>
                  <Button variant="outline" size="sm">View</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePostsPage;
