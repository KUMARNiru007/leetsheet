import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import googleImg from "../assets/comapnylogo/google.png";
import amazonImg from "../assets/comapnylogo/amazon.png";
import accentureImg from "../assets/comapnylogo/accenture.png";
import zomatoImg from "../assets/comapnylogo/zomato.png";
import microsoftImg from "../assets/comapnylogo/microsoft.png";
// import ciscoImg from "../assets/comapnylogo/cisco.png";
// import oracleImg from "../assets/comapnylogo/oracle.png";
import nvidiaImg from "../assets/comapnylogo/nvidia.png";

const companyLogos = [
  // { logo: oracleImg, name: "Oracle" },
  { logo: nvidiaImg, name: "NVIDIA" },
  // { logo: ciscoImg, name: "Cisco" },
  // { logo: spotifyImg, name: "Spotify" },
  { logo: googleImg, name: "Google" },
  { logo: amazonImg, name: "Amazon" },
  { logo: microsoftImg, name: "Microsoft" },
  { logo: accentureImg, name: "Accenture" },
];

const LogoCard = ({ company }) => (
  <div className="mx-4 flex items-center justify-center h-16">
    <img
      src={company.logo}
      alt={`${company.name} logo`}
      className="h-8 md:h-10 object-contain"
    />
  </div>
);

const ImageSlider = () => {
  const [translateX, setTranslateX] = useState(0);
  const cardWidth = 120; // Width of each logo card plus margin

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => prev - 0.5);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const resetPoint = -(companyLogos.length * cardWidth);
    if (translateX <= resetPoint) {
      setTranslateX(0);
    }
  }, [translateX]);

  const infiniteLogos = [...companyLogos, ...companyLogos, ...companyLogos];

  return (
    <div className="w-full py-12 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Where Our Learners Work</h2>
        <p className="text-sm text-gray-600">From startups to Fortune 500s, our alumni are building the future.</p>
      </div>

      {/* Logo Carousel */}
      <div className="relative w-full">
        {/* Scrolling Container */}
        <div className="overflow-hidden w-full">
          <div
            className="flex items-center"
            style={{
              transform: `translateX(${translateX}px)`,
              width: "max-content",
            }}
          >
            {infiniteLogos.map((company, index) => (
              <LogoCard key={`logo-${index}`} company={company} />
            ))}
          </div>
        </div>

        {/* Gradient Overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default ImageSlider;