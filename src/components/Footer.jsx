import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Financial Insights</h3>
            <p className="text-gray-300">
              Sharing insights and analysis on financial markets, trends, and investment strategies.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-blue-300 transition">Home</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-blue-300 transition">Blog</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-blue-300 transition">Categories</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-blue-300 transition">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-blue-300 transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with the latest financial insights.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 w-full text-gray-800 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Financial Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
