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
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Financial Insights Blog</h1>
        <p className="text-gray-600">
          Explore our articles on financial markets, investment strategies, and economic trends.
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={post.image_url || "https://via.placeholder.com/800x600"} 
                  alt={post.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-600 text-sm font-semibold">
                      {post.category ? post.category.name : 'Uncategorized'}
                    </span>
                    <span className="text-gray-500 text-sm">{formatDate(post.created_at)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {post.content.length > 150 
                      ? `${post.content.substring(0, 150)}...` 
                      : post.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link to={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Read More →
                    </Link>
                    <span className="text-gray-500 text-sm">{getReadTime(post.content)}</span>
                  </div>
                </div>
              </div>
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
