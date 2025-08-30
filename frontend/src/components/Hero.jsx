import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import herobg from '../assets/bg.png';
// import ImageSlider from '../components/Slider.jsx';

// Import language icons
import javaIcon from '../assets/languages/java.png';
import javascriptIcon from '../assets/languages/javascript.png';
import pythonIcon from '../assets/languages/python.png';
import rubyIcon from '../assets/languages/ruby.png';
import rustIcon from '../assets/languages/rust.png';
import typescriptIcon from '../assets/languages/typescript.png';
import goIcon from '../assets/languages/go.png';
import phpIcon from '../assets/languages/php.png';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const floatingLeftRef = useRef(null);
  const floatingRightRef = useRef(null);
  const bottomImageSection = useRef(null);
  const underlineRef = useRef(null); // New ref for the animated underline
  
  // Refs for language icons
  const javaRef = useRef(null);
  const javascriptRef = useRef(null);
  const pythonRef = useRef(null);
  const rubyRef = useRef(null);
  const rustRef = useRef(null);
  const typescriptRef = useRef(null);
  const phpRef = useRef(null);
  const goRef = useRef(null);

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

      // Animated underline for "Coding" - starts after the main text animations
      gsap.fromTo(underlineRef.current, 
        {
          width: '0%',
          opacity: 0
        },
        {
          width: '100%',
          opacity: 1,
          duration: 1.2,
          delay: 1, // Starts after the main heading animation
          ease: 'power2.out',
        }
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
      
      gsap.to(javaRef.current, {
        y: 25,
        x: 5,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(javascriptRef.current, {
        y: -10,
        x: -8,
        rotation: -3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(pythonRef.current, {
        y: 12,
        x: -5,
        rotation: 4,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(rubyRef.current, {
        y: -15,
        x: 7,
        rotation: -5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(rustRef.current, {
        y: 10,
        x: 10,
        rotation: 3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(typescriptRef.current, {
        y: -8,
        x: -10,
        rotation: -4,
        duration: 2.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(goRef.current, {
        y: -12,
        x: 8,
        rotation: 6,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      
      gsap.to(phpRef.current, {
        y: 8,
        x: -12,
        rotation: -6,
        duration: 2.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
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
      
      {/* Language Icons - Floating with Random Positions */}
      <img 
        ref={javaRef}
        src={javaIcon} 
        alt="Java" 
        className="absolute z-10 opacity-70 hover:opacity-100 transition-opacity"
        style={{ width: "45px", height: "45px", top: "8%", left: "12%" }}
      />
      
      <img 
        ref={javascriptRef}
        src={javascriptIcon} 
        alt="JavaScript" 
        className="absolute z-10 opacity-70 hover:opacity-100 transition-opacity"
        style={{ width: "48px", height: "48px", top: "32%", right: "18%" }}
      />
      
      <img 
        ref={pythonRef}
        src={pythonIcon} 
        alt="Python" 
        className="absolute z-10 opacity-70 hover:opacity-100 transition-opacity"
        style={{ width: "52px", height: "52px", bottom: "35%", left: "8%" }}
      />
      
      <img 
        ref={rubyRef}
        src={rubyIcon} 
        alt="Ruby" 
        className="absolute z-10 opacity-70 hover:opacity-100 transition-opacity"
        style={{ width: "46px", height: "46px", top: "35%", left: "17%" }}
      />
      
      <img 
        ref={rustRef}
        src={rustIcon} 
        alt="Rust" 
        className="absolute z-10 opacity-70 hover:opacity-100 transition-opacity"
        style={{ width: "60px", height: "50px", bottom: "15%", right: "22%" }}
      />
      
      <img 
        ref={typescriptRef}
        src={typescriptIcon} 
        alt="TypeScript" 
        className="absolute z-10 opacity-70 hover:opacity-100 transition-opacity"
        style={{ width: "47px", height: "47px", top: "12%", right: "28%" }}
      />
      
      <img 
        ref={goRef}
        src={goIcon} 
        alt="Go" 
        className="absolute z-10 opacity-70 hover:opacity-600 transition-opacity"
        style={{ width: "70px", height: "60px", top: "55%", right: "6%" }}
      />
      
      <img 
        ref={phpRef}
        src={phpIcon} 
        alt="PHP" 
        className="absolute z-10 opacity-70 hover:opacity-100 transition-opacity"
        style={{ width: "51px", height: "51px", bottom: "15%", left: "25%" }}
      />
      
      <section
        className="w-screen min-h-screen flex flex-col items-center justify-center mt-[-70px] px-4 pt-38 pb-14 relative"
      >
        {/* Text Content - Full opacity */}
        <div className="w-full text-center space-y-8 relative z-10">
          <div
            ref={headingRef}
            className='inline-block px-4 text-gray-300 rounded-full font-semibold tracking-wide shadow'
          >
            Crack DSA With Confidence
          </div>

          <h1
            ref={subheadingRef}
            className='text-4xl sm:text-5xl md:text-6xl font-bold '
          >
            Your Personal <span className ="text-orange-400">Sheet</span>  To <br /> 
            Master <span className="relative inline-block  ">
              Coding
              {/* Animated underline */}
              <span 
                ref={underlineRef}
                className="absolute bottom-0 left-0 h-1 bg-orange-400 block"
                style={{ width: '0%' }}
              />
            </span> Interviews
          </h1>
          

          <p
            ref={paragraphRef}
            className='text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto'
          >
            LeetSheet helps you track progress, practice structured problems, 
            and stay consistent — giving you the edge to ace your coding rounds 
            with clarity and confidence.
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
              Explore Sheets <i class="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;