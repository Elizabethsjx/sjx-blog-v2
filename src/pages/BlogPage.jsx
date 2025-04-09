import { useState } from 'react';
import { Link } from 'react-router-dom';

// In a real app, this would come from an API or database
const samplePosts = [
  {
    id: 1,
    title: 'Understanding Market Volatility in 2025',
    excerpt: 'An in-depth look at what\'s driving market fluctuations this year and strategies to navigate uncertainty.',
    category: 'stocks',
    categoryName: 'Stock Analysis',
    image: 'https://via.placeholder.com/800x600',
    date: 'April 2, 2025',
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'The Evolution of Blockchain and Financial Markets',
    excerpt: 'How blockchain technology continues to reshape traditional finance and investment opportunities.',
    category: 'crypto',
    categoryName: 'Cryptocurrency',
    image: 'https://via.placeholder.com/800x600',
    date: 'March 28, 2025',
    readTime: '6 min read'
  },
  {
    id: 3,
    title: 'Building a Resilient Portfolio for Long-term Growth',
    excerpt: 'Essential strategies for creating a diversified investment portfolio that can withstand market turbulence.',
    category: 'strategies',
    categoryName: 'Investment Strategy',
    image: 'https://via.placeholder.com/800x600',
    date: 'March 22, 2025',
    readTime: '10 min read'
  },
  {
    id: 4,
    title: 'Economic Indicators to Watch in Q2 2025',
    excerpt: 'Key economic data points that could signal market movements in the coming months.',
    category: 'economy',
    categoryName: 'Economy',
    image: 'https://via.placeholder.com/800x600',
    date: 'March 18, 2025',
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'Emerging Markets: Opportunities and Risks',
    excerpt: 'Analysis of investment prospects in developing economies and how to balance potential returns with higher volatility.',
    category: 'stocks',
    categoryName: 'Stock Analysis',
    image: 'https://via.placeholder.com/800x600',
    date: 'March 15, 2025',
    readTime: '9 min read'
  },
  {
    id: 6,
    title: 'Sustainable Investing: The Growth of ESG Funds',
    excerpt: 'How environmental, social, and governance criteria are becoming central to investment decisions.',
    category: 'strategies',
    categoryName: 'Investment Strategy',
    image: 'https://via.placeholder.com/800x600',
    date: 'March 10, 2025',
    readTime: '8 min read'
  }
];

// Category options for filtering
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'stocks', name: 'Stocks' },
  { id: 'crypto', name: 'Cryptocurrency' },
  { id: 'strategies', name: 'Investment Strategies' },
  { id: 'economy', name: 'Economy' }
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts based on category and search term
  const filteredPosts = samplePosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
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
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-600 text-sm font-semibold">{post.categoryName}</span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <Link to={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Read More →
                    </Link>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
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
