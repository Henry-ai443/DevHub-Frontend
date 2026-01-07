import { Link } from "react-router-dom";
import "../styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/profiles">Profiles</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

        <div className="footer-legal">
          <p>© {new Date().getFullYear()} DevHub. All rights reserved.</p>
        </div>

        <div className="footer-social">
          {/* Optional: replace # with your social links */}
          <a href="#" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="#" target="_blank" rel="noopener noreferrer">💼</a>
          <a href="#" target="_blank" rel="noopener noreferrer">📷</a>
        </div>
      </div>
    </footer>
  );
}
