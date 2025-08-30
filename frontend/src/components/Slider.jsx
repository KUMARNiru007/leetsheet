import React from 'react';

const InfiniteSlider = ({ images = [] }) => {
  // Default images for demonstration (you can remove these when using your own)
  const defaultImages = [
    'https://via.placeholder.com/300x200/FF6B6B/white?text=Image+1',
    'https://via.placeholder.com/300x200/4ECDC4/white?text=Image+2', 
    'https://via.placeholder.com/300x200/45B7D1/white?text=Image+3',
    'https://via.placeholder.com/300x200/96CEB4/white?text=Image+4',
    'https://via.placeholder.com/300x200/FECA57/white?text=Image+5',
    'https://via.placeholder.com/300x200/FF9FF3/white?text=Image+6'
  ];

  const slideImages = images.length > 0 ? images : defaultImages;
  
  
  const duplicatedImages = [...slideImages, ...slideImages];

  return (
    <div className=" w-full flex flex-col p-4" style={{ backgroundColor: 'var(--leetsheet-bg-primary)' }}>



    <div className="w-full overflow-hidden relative">
      {/* Left blur edge */}
{/* Left blur edge */}
<div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10 pointer-events-none"></div>

{/* Right blur edge */}
<div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10 pointer-events-none"></div>

      {/* Slider container */}
      <div className="flex animate-slide-rtl">
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 h-40 mx-2 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
          >
            <img
              src={typeof image === 'string' ? image : image.src || image.url}
              alt={typeof image === 'object' ? image.alt || `Slide ${index + 1}` : `Slide ${index + 1}`}
              className="w-full h-full object-cover"
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