import React from "react";
import Footer from "../components/Footer.jsx"


const Home = () => {
 
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen max-w-8xl bg-gradient-to-br transition-colors duration-300  "
    >
    <div className="min-h-screen flex flex-col items-center mt-14">
      <h1 className="text-4xl font-extrabold z-10 text-center">
        Welcome to <span className="text-leetsheet-primary">LeetSheet</span>
      </h1>

      <p className="mt-4 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
        A Platform Inspired by Leetcode which helps you to prepare for coding
        interviews and helps you to improve your coding skills by solving coding
        problems
      </p>

      
    </div>
    <Footer/>

    </div>
  );
};

export default Home;