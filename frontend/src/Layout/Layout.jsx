import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx"


const Layout = () => {

    return (
        <div className="min-h-screen w-full relative bg-[#1a1a1a]">
            {/* LeetCode Dark Theme Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                }}
            />
            <div className="relative z-10">
                <div className="flex flex-col items-center justify-start">
                    <Navbar/>
                    <div className="w-full max-w-6xl mx-auto px-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Layout;
