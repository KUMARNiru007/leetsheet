import React from "react";
import Footer from "../components/Footer.jsx"
import Hero from "../components/Hero.jsx";
import Feature from "../components/FeatureGrid.jsx";
import InfiniteSlider from "../components/Slider.jsx";

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br transition-colors duration-300 overflow-x-hidden"
    >
      <Hero/>
      <InfiniteSlider/>
      <Feature/>
      <Footer/>
    </div>
  );
};

export default Home;