import React from "react";
import { Check, MessageSquare, Users, Mail, Settings } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2F4F4F] py-16 relative">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                <Check className="w-5 h-5 text-white font-bold" />
              </div>
              <span className="text-xl font-bold text-white">LeetLab</span>
            </div>
            <p className="text-gray-300 mb-4">Master coding challenges with confidence</p>
            <p className="text-gray-300">hello@leetlab.com</p>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Problem Sets</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Learning Paths</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 LeetLab. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform">
              <MessageSquare className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform">
              <Users className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 transform">
              <Settings className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
