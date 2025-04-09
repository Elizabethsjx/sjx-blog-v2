import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 rounded-lg mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Insights</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Analysis and insights on financial markets, investment strategies, and economic trends
          </p>
          <Link to="/blog" className="bg-white text-blue-800 hover:bg-blue-100 transition px-6 py-3 rounded-full font-semibold text-lg inline-block">
            Explore Articles
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <Link to="/blog" className="text-blue-600 hover:text-blue-800 transition">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Post 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/600x400" alt="Market Analysis" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Stock Analysis</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Understanding Market Volatility in 2025</h3>
              <p className="text-gray-600 mb-4">An in-depth look at what's driving market fluctuations this year and strategies to navigate uncertainty.</p>
              <Link to="/blog/1" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* Featured Post 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/600x400" alt="Cryptocurrency" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Cryptocurrency</span>
              <h3 className="text-xl font-bold mb-2 mt-1">The Evolution of Blockchain and Financial Markets</h3>
              <p className="text-gray-600 mb-4">How blockchain technology continues to reshape traditional finance and investment opportunities.</p>
              <Link to="/blog/2" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* Featured Post 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/600x400" alt="Investment Strategy" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Investment Strategy</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Building a Resilient Portfolio for Long-term Growth</h3>
              <p className="text-gray-600 mb-4">Essential strategies for creating a diversified investment portfolio that can withstand market turbulence.</p>
              <Link to="/blog/3" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/categories/stocks" className="bg-blue-100 hover:bg-blue-200 transition p-6 rounded-lg text-center">
            <h3 className="font-bold text-blue-800">Stocks</h3>
          </Link>
          <Link to="/categories/crypto" className="bg-purple-100 hover:bg-purple-200 transition p-6 rounded-lg text-center">
            <h3 className="font-bold text-purple-800">Cryptocurrency</h3>
          </Link>
          <Link to="/categories/strategies" className="bg-green-100 hover:bg-green-200 transition p-6 rounded-lg text-center">
            <h3 className="font-bold text-green-800">Investment Strategies</h3>
          </Link>
          <Link to="/categories/economy" className="bg-yellow-100 hover:bg-yellow-200 transition p-6 rounded-lg text-center">
            <h3 className="font-bold text-yellow-800">Economy</h3>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 p-8 rounded-lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest financial insights and analysis.</p>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg border flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
