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
      <Hero />
      <Features />
      <Integration />
      <Testimonial />
      <Statistics />
      <CallToAction />
    </div>
  );
};

export default Home;
