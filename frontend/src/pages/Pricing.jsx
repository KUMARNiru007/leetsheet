import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Pricing = () => {
  const navigate = useNavigate();
  const prices = {
    free: "₹0",
    pro: "₹199",
    enterprise: "₹999",
  };

  const features = {
    free: [
      "✓ Access to all current problem sheets",
      "✓ Company-specific questions (growing over time)",
      "✓ Track your coding progress",
    ],
    pro: [
      "✓ Everything in Free",
      "✓ Advanced curated questions",
      "✓ Exclusive company interview sets",
      "✓ Early access to new content",
    ],
    enterprise: [
      "✓ Everything in Pro",
      "✓ Lifetime / bulk access",
      "✓ Personalized roadmap support",
      "✓ Priority updates & features",
    ],
  };

  const handleStartFree = () => {
    navigate("/problems");
  };

  return (
    <div className="w-full text-center mb-8 md:mb-12 lg:mb-16 mt-10 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--leetsheet-text-primary)" }}>
        Pricing
      </h1>
      <div className="w-45 h-1 mx-auto mb-3" style={{ backgroundColor: 'var(--leetsheet-orange)' }}></div>
      <span className="text-lg md:text-xl" style={{ color: "var(--leetsheet-text-secondary)" }}>
        Get started with LeetSheet — more premium features coming soon!
      </span>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12 mt-8">
        {/* Free Plan */}
        <div className="card-leetsheet border2 flex flex-col" >
          <h2 className="text-2xl sm:text-4xl font-bold mb-1" style={{ color: "var(--leetsheet-text-primary)" }}>
            Free
          </h2>
          <p className="mb-4 sm:mb-6" style={{ color: "var(--leetsheet-text-muted)" }}>
            For all learners
          </p>
          <div className="flex items-end mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: "var(--leetsheet-orange)" }}>
              {prices.free}
            </span>
            <span className="mb-1 ml-1" style={{ color: "var(--leetsheet-text-muted)" }}>/month</span>
          </div>
          <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow text-base sm:text-xl" style={{ color: "var(--leetsheet-text-secondary)" }}>
            {features.free.map((point, index) => (
              <li key={index} className="flex items-start">
                {point}
              </li>
            ))}
          </ul>
          <button 
            className="btn-leetsheet-primary w-full py-3 sm:py-4"
            onClick={handleStartFree}
          >
            Start Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="card-leetsheet flex flex-col opacity-75" style={{ borderColor: 'var(--leetsheet-orange)' }}>
          <h2 className="text-2xl sm:text-4xl font-bold mb-1" style={{ color: "var(--leetsheet-text-primary)" }}>
            Pro
          </h2>
          <p className="mb-4 sm:mb-6" style={{ color: "var(--leetsheet-text-muted)" }}>
            For serious interview prep
          </p>
          <div className="flex items-end mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: "var(--leetsheet-orange-light)" }}>
              {prices.pro}
            </span>
            <span className="mb-1 ml-1" style={{ color: "var(--leetsheet-text-muted)" }}>
              /month
            </span>
          </div>
          <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow text-base sm:text-xl" style={{ color: "var(--leetsheet-text-secondary)" }}>
            {features.pro.map((point, index) => (
              <li key={index} className="flex items-start">
                {point}
              </li>
            ))}
          </ul>
          <button className="btn-leetsheet-secondary w-full py-3 sm:py-4 cursor-not-allowed">
            Coming Soon
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="card-leetsheet flex flex-col opacity-75">
          <h2 className="text-2xl sm:text-4xl font-bold mb-1" style={{ color: "var(--leetsheet-text-primary)" }}>
            Enterprise
          </h2>
          <p className="mb-4 sm:mb-6" style={{ color: "var(--leetsheet-text-muted)" }}>
            For long-term learners & teams
          </p>
          <div className="flex items-end mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: "var(--leetsheet-orange)" }}>
              {prices.enterprise}
            </span>
            <span className="mb-1 ml-1" style={{ color: "var(--leetsheet-text-muted)" }}>one-time</span>
          </div>
          <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow text-base sm:text-xl" style={{ color: "var(--leetsheet-text-secondary)" }}>
            {features.enterprise.map((point, index) => (
              <li key={index} className="flex items-start">
                {point}
              </li>
            ))}
          </ul>
          <button className="btn-leetsheet-secondary w-full py-3 sm:py-4 cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;