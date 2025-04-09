import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Financial Insights</Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-blue-300 transition">Home</Link></li>
              <li><Link to="/blog" className="hover:text-blue-300 transition">Blog</Link></li>
              <li><Link to="/categories" className="hover:text-blue-300 transition">Categories</Link></li>
              <li><Link to="/about" className="hover:text-blue-300 transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300 transition">Contact</Link></li>
            </ul>
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu button - can be expanded later */}
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
