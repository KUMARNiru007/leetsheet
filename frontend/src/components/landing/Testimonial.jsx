import React from "react";

const Testimonial = () => {
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-content">
          <blockquote className="testimonial-quote">
            "LeetLab transformed my coding interview preparation. The structured learning path, 
            real-time feedback, and comprehensive problem library helped me land offers from 
            top tech companies. It's like having a personal coding mentor 24/7."
          </blockquote>
          <div className="testimonial-author">
            <div className="author-avatar">👨‍💼</div>
            <div className="author-info">
              <div className="author-name">David Rodriguez</div>
              <div className="author-title">Senior Software Engineer at Google</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
