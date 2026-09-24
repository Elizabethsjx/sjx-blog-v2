import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostService, CategoryService } from '../services/api';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch posts and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch posts
        const postsData = await PostService.getAllPosts();
        setPosts(postsData.posts);
        
        // Fetch categories
        const categoriesData = await CategoryService.getAllCategories();
        
        // Add "All Categories" option
        const categoriesWithAll = [
          { id: 'all', name: 'All Categories' },
          ...categoriesData.categories.map(cat => ({
            id: cat.id.toString(),
            name: cat.name
          }))
        ];
        
        setCategories(categoriesWithAll);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Calculate read time (rough estimation based on content length)
  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };
  
  // Filter posts based on category and search term
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || 
                          (post.category_id && post.category_id.toString() === selectedCategory);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <section className="mb-8">
        <h1 className="section-title">Insights</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Articles on financial markets, investment strategies, and economic trends.
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-8 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search articles..."
          className="evercore-input flex-1 px-4 py-2 text-sm rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="evercore-input px-4 py-2 text-sm rounded-md md:w-56"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </section>

      {/* Blog Posts */}
      <section>
        {loading ? (
          <div className="text-center py-12">
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map(post => (
              <Link
                to={`/blog/${post.id}`}
                key={post.id}
                className="block rounded-lg border p-6 hover:shadow-sm transition-shadow"
                style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-evercore-accent-blue)' }}>
                    {post.category ? post.category.name : 'Uncategorized'}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {formatDate(post.created_at)}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                  {post.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {post.content.length > 120
                    ? `${post.content.substring(0, 120)}...`
                    : post.content}
                </p>
                <span className="text-xs font-medium" style={{ color: 'var(--color-evercore-accent-blue)' }}>
                  {getReadTime(post.content)} · Read →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
