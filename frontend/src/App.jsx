import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div className="content-container">
          <h1>Welcome to LeetLab</h1>
          <p>Your platform for mastering coding problems and improving programming skills.</p>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Practice Problems</h3>
              <p>Solve coding challenges from easy to hard difficulty levels.</p>
            </div>
            <div className="feature-card">
              <h3>Curated Playlists</h3>
              <p>Follow structured learning paths for different topics.</p>
            </div>
            <div className="feature-card">
              <h3>Track Progress</h3>
              <p>Monitor your submissions and see your improvement over time.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
