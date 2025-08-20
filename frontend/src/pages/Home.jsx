import React from "react";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Integration from "../components/landing/Integration";
import Testimonial from "../components/landing/Testimonial";
import Statistics from "../components/landing/Statistics";
import CallToAction from "../components/landing/CallToAction";

const Home = () => {
  return (
    <div className="landing-page">
       <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-30 blur-3xl rounded-md bottom-9"></div>
      <h1 className="text-4xl font-extrabold z-10 text-center">
        Welcome to <span className="text-primary">LeetLab</span>
      </h1>
    </div>
  );
};

export default Home;
