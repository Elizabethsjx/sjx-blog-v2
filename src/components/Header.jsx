import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const links = [
    ["/", "Home"],
    ["/blog", "My journal"],
    ["/watchlist", "Watchlist"],
    ["/about", "About me"],
  ];
  const accountLinks = (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/profile" onClick={closeMenu}>
            {user?.name || "Profile"}
          </Link>
          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={closeMenu}>
            Log in
          </Link>
          <Link to="/register" onClick={closeMenu}>
            Register
          </Link>
        </>
      )}
    </>
  );
  return (
    <header className="sjx-header">
      <a className="sjx-skip" href="#main-content">
        Skip to content
      </a>
      <div className="sjx-wrap sjx-header-inner">
        <Link className="sjx-logo" to="/" onClick={closeMenu}>
          <span className="sjx-logo-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            sjx<span className="sjx-logo-sub">WITH JUNXI</span>
          </span>
        </Link>
        <nav className="sjx-desktop-nav" aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink end={to === "/"} to={to} key={to}>
              {label}
            </NavLink>
          ))}
          {isAuthenticated && isAdmin() && (
            <NavLink to="/admin/posts">Manage</NavLink>
          )}
        </nav>
        <div className="sjx-header-actions">
          <button
            className="sjx-theme-toggle"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
          >
            {darkMode ? "☼" : "◐"}
          </button>
          <Link className="sjx-header-contact" to="/contact">
            Let's talk <span aria-hidden="true">↗</span>
          </Link>
          <button
            className="sjx-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="sjx-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close −" : "Menu +"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          className="sjx-wrap sjx-mobile-nav"
          id="sjx-mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([to, label]) => (
            <NavLink end={to === "/"} to={to} key={to} onClick={closeMenu}>
              {label}
              <span aria-hidden="true">↗</span>
            </NavLink>
          ))}
          {isAuthenticated && isAdmin() && (
            <NavLink to="/admin/posts" onClick={closeMenu}>
              Manage
            </NavLink>
          )}
          <div className="sjx-mobile-account">{accountLinks}</div>
        </nav>
      )}
      <div className="sjx-account-links sjx-wrap">{accountLinks}</div>
    </header>
  );
}
