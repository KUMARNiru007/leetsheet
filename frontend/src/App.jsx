import React, { useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {Toaster} from "sonner";
import "./App.css";
import Layout from "./Layout/Layout.jsx";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import AddProblem from "./pages/AddProblem.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import AllProblems from "./pages/Problems.jsx"
import Playlists from "./pages/PlaylistsPage.jsx";
import PlaylistDetailpage from "./pages/PlaylistDetailpage.jsx";
import Profile from "./pages/Profile.jsx";
import FAQ from "./pages/FAQ.jsx"
import About from "./pages/About.jsx"
import Pricing from "./pages/Pricing.jsx"

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, refreshToken, completeGoogleAuth } = useAuthStore();
  const location = useLocation();

  // Create a memoized version of checkAuth
  const checkAuthStatus = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  // Check auth on initial load
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Check auth when route changes (especially after Google redirect)
  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname, checkAuthStatus]);

  // Token refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 1000 * 60 * 3); // Refresh every 3 minutes

    return () => clearInterval(interval);
  }, [refreshToken]);

  // Add this effect to handle Google auth redirect
  useEffect(() => {
    const handleGoogleAuthRedirect = async () => {
      // Check if we're coming from a Google auth redirect
      const isRedirectedFromGoogle = sessionStorage.getItem('googleAuthRedirect') === 'true';
      
      if (isRedirectedFromGoogle && location.pathname === '/problems') {
        // Complete the Google auth process
        const success = await completeGoogleAuth();
        if (success) {
          sessionStorage.removeItem('googleAuthRedirect');
        }
      }
    };

    handleGoogleAuthRedirect();
  }, [location.pathname, completeGoogleAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster/>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/problems" element={authUser ?<AllProblems /> :<Navigate to = "/login"/>} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/playlist" element={authUser ? <Playlists /> : <Navigate to="/login" />} />
          <Route path="/playlist/:id" element={authUser ? <PlaylistDetailpage /> : <Navigate to="/login" />} />
        </Route>

        <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to={"/"}/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        
        <Route path="/problem/:id" element={authUser ? <ProblemPage/> : <Navigate to={"/login"}/>} />

        <Route element={<AdminRoute />}>
          <Route path="/add-problem" element={authUser ? <AddProblem /> : <Navigate to="/" />}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;