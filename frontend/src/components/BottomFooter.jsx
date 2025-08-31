import React from 'react';
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

function BottomFooter() {
  return (
    <div className="bottom-footer flex flex-col lg:px-26 lg:flex-row lg:justify-between lg:items-center border-t border-[var(--leetsheet-border-primary)] pt-6 pb-6 gap-y-4 text-sm nav-leetsheet">

       <div className="w-full lg:w-auto flex justify-center lg:justify-end">
        <div className="flex flex-wrap justify-center lg:justify-end gap-4 lg:gap-6 font-normal text-center break-words ml-3">
          <a
            href="https://github.com/KUMARNiru007/leetsheet"
            className="nav-link-leetsheet flex items-center gap-2 hover:text-[var(--leetsheet-orange)] transition-colors duration-200"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          
          <a
            href="https://www.linkedin.com/in/kumarnirupam/"
            className="nav-link-leetsheet flex items-center gap-2 hover:text-[var(--leetsheet-orange)] transition-colors duration-200"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          
          <a
            href="https://x.com/KumarNirupam1"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-leetsheet flex items-center gap-2 hover:text-[var(--leetsheet-orange)] transition-colors duration-200 break-words"
            aria-label="X (Twitter)"
          >
            <FaXTwitter size={20} />
          </a>
        </div>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-end gap-4 lg:gap-6 font-normal text-center break-words">
        <span className="text-[var(--leetsheet-text-secondary)]">
          © 2025 
          LeetSheet
          All Rights Reserved.
        </span>
        <span className="text-[var(--leetsheet-text-secondary)] hover:text-[var(--leetsheet-orange)]">
          Privacy Policy</span>
        <span className="text-[var(--leetsheet-text-secondary)] hover:text-[var(--leetsheet-orange)]">
          Terms & Conditions
        </span>
      </div>
      
     
    </div>
  );
}

export default BottomFooter;