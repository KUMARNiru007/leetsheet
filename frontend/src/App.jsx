import React, { useEffect } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import "./App.css";
import Layout from "./Layout/Layout.jsx";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import AddProblem from "./pages/AddProblem.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";

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
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-start">
          <Toaster/>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to={"/"}/>} />
            <Route path="/signup" element={<SignUpPage/>} />

            <Route path="/problem/:id" element={authUser ? <ProblemPage/> : <Navigate to={"/login"}/>}
            />

            <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          />
        </Route>

            
          </Routes>
        </div>
      </div>
  );
};

export default App;