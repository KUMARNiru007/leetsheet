import React from "react";
import Footer from "../components/Footer.jsx"
import Hero from "../components/Hero.jsx";


const Home = () => {
 
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen max-w-8xl bg-gradient-to-br transition-colors duration-300  "
    >
    <Hero/>
    <Footer/>

    </div>
  );
};

export default Home;