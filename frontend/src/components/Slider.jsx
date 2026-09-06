import  React from 'react';

import accentureImg from "../assets/comapnylogo/accenture.webp"
import amazonImg from "../assets/comapnylogo/amazon.webp"
import googleImg from "../assets/comapnylogo/google.webp"
import microsoftImg from "../assets/comapnylogo/microsoft.webp"
import netflixImg from "../assets/comapnylogo/netflix.webp"
import nvidiaImg from "../assets/comapnylogo/nvidia.webp"
import openaiImg from "../assets/comapnylogo/openai.webp"
import paypalImg from "../assets/comapnylogo/paypal.webp"
import zomatoImg from "../assets/comapnylogo/zomato.webp"




const InfiniteSlider = ({ images = [] }) => {
  // Company logos array
  const companyLogos = [
    { src: accentureImg, alt: 'Accenture' },
    { src: amazonImg, alt: 'Amazon' },
    { src: googleImg, alt: 'Google' },
    { src: microsoftImg, alt: 'Microsoft' },
    { src: netflixImg, alt: 'Netflix' },
    { src: nvidiaImg, alt: 'NVIDIA' },
    { src: openaiImg, alt: 'OpenAI' },
    { src: paypalImg, alt: 'PayPal' },
    { src: zomatoImg, alt: 'Zomato' }
  ];

  const slideImages = images.length > 0 ? images : companyLogos;
  
  const duplicatedImages = [...slideImages, ...slideImages];


  return (
    <div className=" w-full flex flex-col py-4 pb-20 " >

      <div className="text-center mb-8 mt-10">
        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--leetsheet-text-primary)' }}>
          Company Specific <span style={{ color: 'var(--leetsheet-orange)' }}>DSA </span>Sheets
        </h2>
        <p className="text-lg mb-6" style={{ color: 'var(--leetsheet-text-secondary)' }}>
          Boost your coding preparation with sheets tailored to company-specific requirements.
        </p>
      </div>

    <div className="w-full overflow-hidden relative">
      {/* Left blur edge */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10 pointer-events-none"></div>

      {/* Right blur edge */}
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10 pointer-events-none"></div>

      {/* Slider container */}
      <div className="flex animate-slide-rtl">
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 h-35 mx-2 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white flex items-center justify-center p-4"
          >
            <img
              src={typeof image === 'string' ? image : image.src || image.url}
              alt={typeof image === 'object' ? image.alt || `Slide ${index + 1}` : `Slide ${index + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200/E5E5E5/999?text=Image+Not+Found';
              }}
            />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slide-rtl {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        .animate-slide-rtl {
          animation: slide-rtl 20s linear infinite;
          width: calc(256px * ${duplicatedImages.length} + 16px * ${duplicatedImages.length});
        }
      `}</style>
    </div>
    </div>
  );
};

export default InfiniteSlider;