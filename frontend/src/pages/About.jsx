import React, { useRef } from "react";
import codeleaplogo from "./assets/google.svg";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

import akash from "./assets/akash.webp";
import mukul from "./assets/mukul.webp";
import hitesh from "./assets/hitesh.webp";
import piyush from "./assets/piyush.webp";
import anirudh from "./assets/anirudh.webp";
import suraj from "./assets/suraj.webp";

const mentors = [
  {
    name: "Hitesh Chaudhary",
    image: hitesh,
    social: {
      twitter: "https://x.com/Hiteshdotcom",
    },
  },
  {
    name: "Piyush Garg",
    image: piyush,
    social: {
      twitter: "https://x.com/piyushgarg_dev",
    },
  },
  {
    name: "Suraj Kumar Jha",
    image: suraj,
    social: {
      twitter: "https://x.com/sigmadev234",
    },
  },
  {
    name: "Anirudh Jwala",
    image: anirudh,
    social: {
      twitter: "https://x.com/nirudhuuu",
    },
  },
  {
    name: "Akash Kadlag",
    image: akash,
    social: {
      twitter: "https://x.com/yntpdotme",
    },
  },
  {
    name: "Mukul Padwal",
    image: mukul,
    social: {
      twitter: "https://x.com/mukulpadwal",
    },
  },
];

const About = () => {
  const teamSectionRef = useRef(null);
  const teamMemberRefs = useRef([]);

  return (
    <div className="w-full min-h-screen" style={{color: 'var(--leetsheet-text-primary)' }}>
      {/* Header Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          About <span style={{ color: 'var(--leetsheet-orange)' }}>Us</span>
        </h1>
        <div className="w-64 h-1 mx-auto" style={{ backgroundColor: 'var(--leetsheet-orange)' }}></div>
      </div>

      {/* Hero Section */}
      <section className="py-3 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--leetsheet-orange)' }}>
            DSA Made Clear, Concise, and Career-Ready
          </h2>
          <p className="text-lg max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--leetsheet-text-secondary)' }}>
            From struggles to triumph, LeetSheet is a testament to the power of dedication and determination. 
            Our journey is a testament to the pursuit of excellence and the unwavering pursuit of success.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-3 px-4 max-w-6xl mx-auto">
        <div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: 'var(--leetsheet-text-primary)' }}>
                Our Story
              </h2>
              <div className="space-y-6" style={{ color: 'var(--leetsheet-text-secondary)' }}>
                <p className="text-lg leading-relaxed">
                  LeetSheet is an intuitive and modern coding platform designed to help learners and developers 
                  sharpen their problem-solving skills through hands-on coding challenges. Whether you're preparing 
                  for technical interviews, improving algorithmic thinking, or just love solving problems, LeetSheet 
                  provides the tools, challenges, and community you need to grow.
                </p>
                <p className="text-lg leading-relaxed">
                  In just 35 days, I transformed an idea into a working platform, ready to be used by students 
                  and developers of all levels.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: 'var(--leetsheet-border-primary)' }}>
                <img
                  src={codeleaplogo}
                  alt="Leetsheet journey"
                  className="w-full h-80 object-contain"
                  style={{ backgroundColor: 'var(--leetsheet-bg-secondary)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Why LeetSheet, Vision, and Road Ahead */}
      <section
        className="py-16 px-4 max-w-6xl mx-auto"
        style={{ color: 'var(--leetsheet-text-primary)' }}
      >
        <div className="grid md:grid-cols-2 gap-20">
          {/* Why LeetSheet? */}
          <div>
            <h3 className="text-3xl font-semibold mb-6">Why "Leet<span style={{ color: 'var(--leetsheet-orange)' }}>Sheet</span>"?</h3>
            <p className="text-lg mb-6" style={{ color: 'var(--leetsheet-text-secondary)' }}>
              We wanted a name that reflects clarity, structure, and growth. LeetSheet is all about:
            </p>
            <ul className="space-y-3">
              {[
                "Organized problem sheets to sharpen your coding skills",
                "Tailored practice for interview success",
                "A smooth and distraction-free learning experience",
                "Building confidence with every challenge you solve"
              ].map((item, index) => (
                <li key={index} className="flex items-start" style={{ color: 'var(--leetsheet-text-secondary)' }}>
                  <span className="inline-block mr-3" style={{ color: 'var(--leetsheet-orange)' }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Vision */}
          <div className="lg:ml-10">
            <h3 className="text-3xl font-semibold mb-6">Our Vision</h3>
            <p className="text-lg mb-6" style={{ color: 'var(--leetsheet-text-secondary)' }}>
              We're building LeetSheet for:
            </p>
            <ul className="space-y-3">
              {[
                "Students preparing for placements",
                "Developers aiming to crack top tech companies",
                "Learners who want structured, step-by-step coding prep",
                "Anyone seeking a reliable resource to practice and grow"
              ].map((item, index) => (
                <li key={index} className="flex items-start" style={{ color: 'var(--leetsheet-text-secondary)' }}>
                  <span className="inline-block mr-3" style={{ color: 'var(--leetsheet-orange)' }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The Road Ahead */}
        <div className="mt-16">
          <h3 className="text-3xl font-semibold mb-6">The Road Ahead</h3>
          <p className="text-lg mb-6" style={{ color: 'var(--leetsheet-text-secondary)' }}>
            This is just the beginning. Over time, we'll be:
          </p>
          <ul className="space-y-3">
            {[
              "Adding more company-specific sheets (Google, Amazon, Netflix, and beyond)",
              "Introducing premium questions curated for advanced prep",
              "Expanding into a one-stop website to practice, track progress, and prepare for interviews with confidence"
            ].map((item, index) => (
              <li key={index} className="flex items-start" style={{ color: 'var(--leetsheet-text-secondary)' }}>
                <span className="inline-block mr-3" style={{ color: 'var(--leetsheet-orange)' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--leetsheet-orange)' }}>
            Meet the <span style={{ color: 'var(--leetsheet-text-primary)' }}>Creator</span> 
          </h2>
          <div className="w-90 h-1 mx-auto" style={{ backgroundColor: 'var(--leetsheet-orange)' }}></div>
        </div>
        
        <div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: 'var(--leetsheet-text-primary)' }}>
                Kumar Nirupam
              </h3>
              <div className="space-y-4" style={{ color: 'var(--leetsheet-text-secondary)' }}>
                <p className="text-lg leading-relaxed">
                  Hi, I am Kumar Nirupam, the creator of LeetSheet. I am a Computer Science student currently 
                  in my second year. I am passionate about coding and I am always looking for new challenges 
                  and opportunities to learn and grow.
                </p>
                <p className="text-lg leading-relaxed">
                  I created this platform as a challenge given by Hitesh Sir in the Chaicode web development 
                  Cohort 1.0. Our Cohort teachers and Teaching Assistants helped me a lot in creating this platform.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: 'var(--leetsheet-border-primary)' }}>
                <img
                  src={codeleaplogo}
                  alt="Kumar Nirupam"
                  className="w-full h-80 object-cover"
                />
                
                {/* Social Icons Overlay */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 text-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="https://x.com/KumarNirupam1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
                  >
                    <FaXTwitter className="transition duration-300" />
                  </a>
                  <a
                    href="https://github.com/KUMARNiru007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
                  >
                    <FaGithub className="transition duration-300" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kumarnirupam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
                  >
                    <FaLinkedin className="transition duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section ref={teamSectionRef} className="py-6 px-4">
        <div className="max-w-8xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 border" 
                 style={{ 
                   backgroundColor: 'var(--leetsheet-bg-tertiary)', 
                   color: 'var(--leetsheet-orange)',
                   borderColor: 'var(--leetsheet-orange)'
                 }}>
              Our Mentors
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--leetsheet-orange)' }}>
              Mentorship that <span style={{ color: 'var(--leetsheet-text-primary)' }}>Guided</span>  Me
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--leetsheet-text-secondary)' }}>
              I am deeply grateful to our mentors who not only guided me technically but also supported me 
              emotionally and mentally throughout this journey.
            </p>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
            {mentors.map((mentor, index) => (
              <div
                key={mentor.name}
                ref={(el) => (teamMemberRefs.current[index] = el)}
                className="group relative"
              >
                <div className="card-leetsheet p-4 text-center transition-all duration-300 hover:scale-105">
                  {/* Mentor Image */}
                  <div className="relative mb-4">
                    <div className="w-50 h-50 mx-auto rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:border-4"
                         style={{ borderColor: 'var(--leetsheet-orange)' }}>
                      <img
                        src={mentor.image || "/placeholder.svg"}
                        alt={mentor.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Social Icon */}
                    <a
                      href={mentor.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -top-2 -right-2 p-2 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: 'var(--leetsheet-text-primary)' }}
                    >
                      <FaXTwitter className="text-sm text-black" />
                    </a>
                  </div>
                  
                  {/* Mentor Name */}
                  <h3 className="text-sm font-semibold leading-tight" style={{ color: 'var(--leetsheet-text-primary)' }}>
                    {mentor.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Thank You Message */}
          <div className="text-center">
            <div className="inline-block px-8 py-4">
              <p className="text-lg font-medium" style={{ color: 'var(--leetsheet-text-secondary)' }}>
                I'm truly grateful for their wisdom and encouragement, which kept me on track throughout this journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;