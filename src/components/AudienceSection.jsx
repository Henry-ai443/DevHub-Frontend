import "../styles/components/AudienceSection.css";

export default function AudienceSection() {
  return (
    <section className="audience-section">
      <div className="audience-container">
        <h2 className="audience-title">Who Is This Platform For?</h2>
        <p className="audience-subtitle">
          Built to connect people and ideas in a clear, human-centered way.
        </p>

        <div className="audience-grid">
          <div className="audience-card">
            <h3>Individuals</h3>
            <p>
              Create a public profile that represents who you are, what you do,
              and what you’re looking for — without noise or unnecessary friction.
            </p>
            <ul>
              <li>Showcase skills and experience</li>
              <li>Discover opportunities</li>
              <li>Connect with purpose</li>
            </ul>
          </div>

          <div className="audience-card">
            <h3>Businesses & Teams</h3>
            <p>
              Explore profiles, discover talent, and connect with people aligned
              with your goals — transparently and efficiently.
            </p>
            <ul>
              <li>Browse real profiles</li>
              <li>Initiate direct connections</li>
              <li>Build meaningful collaborations</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
