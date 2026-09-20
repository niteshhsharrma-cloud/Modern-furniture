import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { admin } = useAuth();

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span>Modern Furniture</span>
          <small>Hetauda</small>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          {admin && <NavLink to="/admin/products">Admin</NavLink>}
        </nav>

        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "☾" : "☀"}
        </button>
      </div>
    </header>
  );
}
