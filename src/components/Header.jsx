import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Button from './ui/Button';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="border-b" style={{ backgroundColor: 'var(--color-header-bg)', color: 'var(--color-header-text)', borderColor: 'var(--color-header-border)' }}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-5">
          <Link to="/" className="text-xl font-serif font-semibold flex items-center">
            Financial Insights
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-sm font-medium hover:text-evercore-accent-blue transition py-2">Home</Link></li>
              <li><Link to="/blog" className="text-sm font-medium hover:text-evercore-accent-blue transition py-2">Insights</Link></li>
              <li><Link to="/watchlist" className="text-sm font-medium hover:text-evercore-accent-blue transition py-2">Markets</Link></li>
              <li><Link to="/categories" className="text-sm font-medium hover:text-evercore-accent-blue transition py-2">Sectors</Link></li>
              <li><Link to="/about" className="text-sm font-medium hover:text-evercore-accent-blue transition py-2">About</Link></li>
              <li><Link to="/contact" className="text-sm font-medium hover:text-evercore-accent-blue transition py-2">Contact</Link></li>
            </ul>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Authentication links */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-sm font-medium hover:text-evercore-accent-blue transition"
                  >
                    {user?.name || 'Profile'}
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-sm font-medium hover:text-evercore-accent-blue transition"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-evercore-navy-600 dark:text-evercore-navy-300"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-evercore-navy-700 dark:text-evercore-navy-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-evercore-gray-200 dark:border-evercore-navy-700">
          <nav className="container mx-auto px-6 py-3">
            <ul className="space-y-3">
              <li><Link to="/" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/blog" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>Insights</Link></li>
              <li><Link to="/watchlist" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>Markets</Link></li>
              <li><Link to="/categories" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>Sectors</Link></li>
              <li><Link to="/about" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
              <li><Link to="/contact" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
              
              {/* Mobile authentication links */}
              <div className="pt-2 border-t border-evercore-gray-200 dark:border-evercore-navy-700">
                {isAuthenticated ? (
                  <>
                    <li><Link to="/profile" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>Profile</Link></li>
                    <li><button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block py-1 text-sm text-red-600 hover:text-red-700 transition">Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
                    <li><Link to="/register" className="block py-1 text-sm hover:text-evercore-accent-blue transition" onClick={() => setMobileMenuOpen(false)}>Register</Link></li>
                  </>
                )}
              </div>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
