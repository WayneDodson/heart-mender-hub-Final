
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-healing-500" />
            <span className="font-bold text-xl text-healing-800">Heart Mender</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-healing-600 transition-colors">Home</Link>
            <Link to="/resources" className="text-gray-700 hover:text-healing-600 transition-colors">Resources</Link>
            <Link to="/stories" className="text-gray-700 hover:text-healing-600 transition-colors">Stories</Link>
            <Link to="/contact" className="text-gray-700 hover:text-healing-600 transition-colors">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4 pb-4">
              <Link to="/" className="text-gray-700 hover:text-healing-600 transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/resources" className="text-gray-700 hover:text-healing-600 transition-colors" onClick={toggleMenu}>Resources</Link>
              <Link to="/stories" className="text-gray-700 hover:text-healing-600 transition-colors" onClick={toggleMenu}>Stories</Link>
              <Link to="/contact" className="text-gray-700 hover:text-healing-600 transition-colors" onClick={toggleMenu}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
