import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ backgroundColor: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }}>
      <div className="container mx-auto px-6">
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-base font-semibold mb-3">Financial Insights</h3>
            <p className="text-sm text-evercore-navy-300 mb-3">
              Independent financial analysis and market insights.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-evercore-navy-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/blog" className="text-evercore-navy-300 hover:text-white transition">Insights</Link></li>
              <li><Link to="/watchlist" className="text-evercore-navy-300 hover:text-white transition">Markets</Link></li>
              <li><Link to="/about" className="text-evercore-navy-300 hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="text-evercore-navy-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">Subscribe</h4>
            <p className="text-sm text-evercore-navy-300 mb-3">
              Receive our financial newsletter
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 px-3 py-2 text-sm bg-evercore-navy-800 border border-evercore-navy-600 text-white focus:outline-none focus:border-white"
              />
              <button className="bg-white hover:bg-evercore-navy-100 text-evercore-navy-900 px-3 py-2 text-sm transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-evercore-navy-800 py-5">
          <p className="text-sm text-evercore-navy-300 text-center">
            &copy; {currentYear} Financial Insights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
