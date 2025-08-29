import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx"
import BottomFooter from "../components/BottomFooter.jsx"
import Footer from "../components/Footer.jsx"

const Layout = () => {
    const location = useLocation();
    
    // Check if current path is home page
    const isHomePage = location.pathname === '/' || location.pathname === '/home';
    
    return (
        <div className="min-h-screen w-full relative bg-[#1a1a1a] flex flex-col">
            {/* LeetSheet Dark Theme Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                }}
            />
            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="flex flex-col items-center justify-start flex-grow">
                    <Navbar/>
                    <div className="w-full max-w-6xl mx-auto px-6 flex-grow">
                        <Outlet />
                    </div>
                </div>
                {isHomePage && <Footer/>}
                <BottomFooter />
            </div>
        </div>
    );
};

export default Layout;