import React from "react";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            One platform to master coding and ace your <span className="highlight">interviews</span>
          </h1>
          <p className="hero-description">
            LeetLab combines the power of competitive programming with real-world interview preparation. 
            Practice with 2000+ problems, track your progress, and build the skills that top tech companies demand.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-secondary">See Demo</button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="profile-circle top-left">
            <div className="profile-avatar">👨‍💻</div>
          </div>
          <div className="profile-circle top-right">
            <div className="profile-avatar">👩‍💻</div>
          </div>
          <div className="profile-circle bottom-left">
            <div className="profile-avatar">🧑‍💻</div>
          </div>
          <div className="profile-circle bottom-right">
            <div className="profile-avatar">👨‍🎓</div>
          </div>
          <div className="connection-lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
            <div className="line line-4"></div>
          </div>
        </div>
      </div>
      
      <div className="hero-partners">
        <div className="partner-logos">
          <div className="partner-logo">Google</div>
          <div className="partner-logo">Microsoft</div>
          <div className="partner-logo">Amazon</div>
          <div className="partner-logo">Meta</div>
          <div className="partner-logo">Apple</div>
          <div className="partner-logo">Netflix</div>
        </div>
        <p className="partner-text">More than 100+ companies hire from LeetLab</p>
      </div>
    </section>
  );
};

export default Hero;
