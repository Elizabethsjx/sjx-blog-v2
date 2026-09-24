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
        const related = (allPostsData.items || []).filter( // Changed .posts to .items and added fallback
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
    <article className="max-w-3xl mx-auto">
      {/* Article Header */}
      <header className="mb-8">
        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-evercore-accent-blue)' }}>
          {post.category ? post.category.name : 'Uncategorized'}
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold my-3" style={{ color: 'var(--color-text-primary)' }}>
          {post.title}
        </h1>
        
        <div className="flex items-center text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>
          <span>{formatDate(post.created_at)}</span>
          <span className="mx-2">•</span>
          <span>{getReadTime(post.content)}</span>
        </div>
      </header>
      
      {/* Article Content */}
      <div 
        className="max-w-none leading-relaxed"
        style={{ color: 'var(--color-text-primary)' }}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
      
      {/* Tags */}
      <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 rounded-full text-xs"
              style={{ backgroundColor: 'var(--color-bg-accent)', color: 'var(--color-text-secondary)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Related Posts */}
      <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="section-title">Related Articles</h2>
        {relatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(relatedPost => (
              <Link
                to={`/blog/${relatedPost.id}`}
                key={relatedPost.id}
                className="block rounded-lg border p-5 hover:shadow-sm transition-shadow"
                style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
              >
                <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-evercore-accent-blue)' }}>
                  {relatedPost.category ? relatedPost.category.name : 'Uncategorized'}
                </span>
                <h3 className="font-serif text-lg font-semibold mb-2 mt-1" style={{ color: 'var(--color-text-primary)' }}>
                  {relatedPost.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {relatedPost.content.length > 120
                    ? `${relatedPost.content.substring(0, 120)}...`
                    : relatedPost.content}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No related articles found.</p>
        )}
      </section>
    </article>
  );
};

export default BlogPostPage;
