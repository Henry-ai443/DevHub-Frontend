import { Link } from "react-router-dom";
import "../styles/components/CallToAction.css";

export default function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Start Exploring Meaningful Connections</h2>
        <p>
          View profiles, understand what people are building, or create your own
          presence on the platform.
        </p>

        <div className="cta-buttons">
          <Link to="/profiles" className="cta-btn primary">
            View Profiles
          </Link>
          <Link to="/signup" className="cta-btn secondary">
            Create Your Profile
          </Link>
        </div>
      </div>
    </section>
  );
}
