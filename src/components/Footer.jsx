import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="sjx-footer">
      <div className="sjx-wrap">
        <div className="sjx-footer-top">
          <div>
            <Link to="/" className="sjx-footer-logo">
              sjx<span>↗</span>
            </Link>
            <p>
              A little clarity.
              <br />A better conversation about money.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <Link to="/blog">My journal</Link>
            <Link to="/watchlist">My watchlist</Link>
            <Link to="/about">About Junxi</Link>
            <Link to="/contact">Let's talk ↗</Link>
          </nav>
        </div>
        <div className="sjx-footer-bottom">
          <span>© {new Date().getFullYear()} SJX · With Junxi</span>
          <span>Research, education, and a personal perspective.</span>
        </div>
      </div>
    </footer>
  );
}
