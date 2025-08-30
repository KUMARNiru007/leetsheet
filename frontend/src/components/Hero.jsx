import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import herobg from '../assets/bg.png';

const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const floatingLeftRef = useRef(null);
  const floatingRightRef = useRef(null);
  const bottomImageSection = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        [
          headingRef.current,
          subheadingRef.current,
          paragraphRef.current,
          ctaRef.current,
        ],
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
        },
      );

      gsap.to(floatingLeftRef.current, {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(floatingRightRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.from(bottomImageSection.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert(); // clean up properly
  }, []);

  return (
    <div style={{
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background with opacity - positioned fixed to cover entire viewport */}
      <div 
        className="fixed inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${herobg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.20,
          zIndex: -1
        }}
      />
      
      <section
        className="w-screen min-h-screen flex flex-col items-center justify-center mt-[-70px] px-4 pt-38 pb-14 relative"
      >
        {/* Text Content - Full opacity */}
        <div className="w-full text-center space-y-8 relative z-10">
          <div
            ref={headingRef}
            className='inline-block px-4 py-2 swing-ocean-gradient-animate text-white rounded-full text-sm font-semibold tracking-wide shadow'
          >
            PUT SOME SWING IN YOUR STACK
          </div>

          <h1
            ref={subheadingRef}
            className='text-4xl sm:text-5xl md:text-6xl font-bold '
          >
            Made To Build Things <br />
            You're Proud Of.
          </h1>

          <p
            ref={paragraphRef}
            className='text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto'
          >
            A modern Tailwind CSS component library that helps you design sleek,
            responsive interfaces with ease — and style to spare.
          </p>

          <div
            ref={ctaRef}
            className='flex flex-col sm:flex-row justify-center items-center gap-4'
          >
            <Link
  to='/problems'
  className='px-6 py-3 rounded-full w-[85%] sm:w-auto border border-orange-300 font-semibold bg-orange-400 hover:bg-orange-500 text-white'
>
  Get Started
</Link>

            <Link
              to='/playlist'
              className='px-6 py-3 rounded-full w-[85%] sm:w-auto border border-orange-300 font-semibold hover:text-white hover:bg-orange-400 transition'
            >
              Explore Sheets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;