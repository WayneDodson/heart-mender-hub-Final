
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-healing-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-healing-500" />
              <span className="font-bold text-xl text-healing-800">Heart Mender</span>
            </div>
            <p className="text-gray-600 mb-4">
              Supporting you through your healing journey after divorce, one step at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-healing-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-healing-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:contact@heartmender.com" aria-label="Email" className="text-gray-500 hover:text-healing-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-healing-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-healing-600 transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/stories" className="text-gray-600 hover:text-healing-600 transition-colors">Stories</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-healing-600 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to receive healing insights and updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="healing-input rounded-r-none"
              />
              <button className="bg-healing-500 text-white px-4 py-2 rounded-r-lg hover:bg-healing-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© {currentYear} Heart Mender. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
