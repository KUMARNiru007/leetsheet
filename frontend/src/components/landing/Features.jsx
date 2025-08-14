import React from "react";

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <span className="features-label">FEATURES</span>
          <h2 className="features-title">
            Advanced coding tools to accelerate your learning journey
          </h2>
          <p className="features-subtitle">
            Everything you need to become a coding expert, from problem-solving to interview preparation
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-content">
              <h3 className="feature-heading">Smart Problem Tracking</h3>
              <p className="feature-description">
                LeetLab's intelligent dashboard helps you track your progress, identify weak areas, 
                and optimize your learning path with data-driven insights and personalized recommendations.
              </p>
              <button className="feature-btn">Explore all</button>
            </div>
            <div className="feature-visual">
              <div className="progress-chart">
                <div className="chart-bar" style={{height: '60%'}}></div>
                <div className="chart-bar" style={{height: '80%'}}></div>
                <div className="chart-bar" style={{height: '45%'}}></div>
                <div className="chart-bar" style={{height: '90%'}}></div>
                <div className="chart-bar" style={{height: '70%'}}></div>
              </div>
              <div className="user-avatars">
                <div className="avatar">👤</div>
                <div className="avatar">👤</div>
                <div className="avatar">👤</div>
              </div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-content">
              <h3 className="feature-heading">Performance Analytics</h3>
              <p className="feature-description">
                Deep dive into your coding performance with detailed analytics, 
                time tracking, and comparison with peers to identify improvement opportunities.
              </p>
            </div>
            <div className="feature-visual">
              <div className="analytics-chart">
                <div className="chart-line"></div>
                <div className="chart-points">
                  <div className="point"></div>
                  <div className="point"></div>
                  <div className="point"></div>
                  <div className="point"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-content">
              <h3 className="feature-heading">Intelligent Notifications</h3>
              <p className="feature-description">
                Stay on track with smart reminders, daily challenges, and personalized notifications 
                that adapt to your learning pace and goals.
              </p>
              <div className="notification-settings">
                <div className="setting-item">
                  <span>Daily challenges</span>
                  <div className="toggle active"></div>
                </div>
                <div className="setting-item">
                  <span>Progress updates</span>
                  <div className="toggle active"></div>
                </div>
                <div className="setting-item">
                  <span>Study reminders</span>
                  <div className="toggle active"></div>
                </div>
                <div className="setting-item">
                  <span>Competition alerts</span>
                  <div className="toggle active"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-content">
              <h3 className="feature-heading">Learning Management</h3>
              <p className="feature-description">
                Organize your coding journey with custom playlists, track completed problems, 
                and manage your study schedule efficiently.
              </p>
              <div className="activity-feed">
                <div className="activity-item">
                  <div className="activity-user">Alex Chen</div>
                  <div className="activity-text">Solved "Two Sum" in 15 minutes</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-user">Sarah Kim</div>
                  <div className="activity-text">Completed Array playlist</div>
                  <div className="activity-time">5 hours ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-user">Mike Johnson</div>
                  <div className="activity-text">Achieved 100 problems milestone</div>
                  <div className="activity-time">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
