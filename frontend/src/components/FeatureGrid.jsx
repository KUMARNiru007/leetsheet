import React from 'react';
import { ArrowRight, Code, Trophy, Users, TrendingUp, BookOpen, Target } from 'lucide-react';

const FeatureGrid = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 pb-10" >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span style={{ color: '#ffa116' }}>Key</span>
          <span style={{ color: '#ffffff' }}> Features</span>
        </h1>
        <p className="text-xl" style={{ color: '#b3b3b3' }}>
          Your comprehensive coding interview preparation platform
        </p>
      </div>
      {/* Bento Grid */}
      <div className="bento-grid ">
        {/* Algorithm Practice */}
        <div className="bento-card card-2x1">
          <div>
            <div className="card-icon">
              <Code size={24} color="#ffa116" />
            </div>
            <h3 className="card-title">Algorithm Practice</h3>
            <p className="card-description">
              Master essential data structures and algorithms with company-focused problem sets designed to boost your coding skills.
            </p>
          </div>
        </div>
       
        {/* Progress Analytics */}
        <div className="bento-card card-1x1">
          <div>
            <div className="card-icon">
              <TrendingUp size={24} color="#ffa116" />
            </div>
            <h3 className="card-title">Progress Analytics</h3>
            <p className="card-description">
              Track your performance with detailed insights, identify weak areas, and measure your growth over time.
            </p>
          </div>
        </div>
       
        {/* Achievement System */}
        <div className="bento-card card-1x1">
          <div>
            <div className="card-icon">
              <Trophy size={24} color="#ffa116" />
            </div>
            <h3 className="card-title">Achievement System</h3>
            <p className="card-description">
              Stay motivated by earning badges and climbing the leaderboard as you solve problems and improve your skills.
            </p>
          </div>
        </div>
       
        {/* Study Groups */}
        <div className="bento-card card-2x1">
          <div>
            <div className="card-icon">
              <Users size={24} color="#ffa116" />
            </div>
            <h3 className="card-title">Custom Sheets</h3>
            <p className="card-description">
              Create personalized DSA sheets tailored to your goals and progress. Focus on the topics that matter most to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;