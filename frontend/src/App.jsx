import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Blog from "./pages/Blog";
import AllProblems from "./pages/Problems";
import Companies from "./pages/Companies";
import Signin from "./pages/SignUpPage";
import Login from "./pages/LoginPage";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/support" element={<Support />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/problems" element={<AllProblems />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
