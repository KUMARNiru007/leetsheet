import React, { useEffect } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import "./App.css";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {

  const{authUser,checkAuth,isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()

  },[checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Dark Sphere Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-start">

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
          
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;