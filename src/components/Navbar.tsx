
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ContactSupportDialog from '@/components/ContactSupportDialog';
import logo from '@/assets/heart-hands-logo.jpg';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Community', path: '/community' },
    { text: 'Resources', path: '/resources' },
    { text: 'Stories', path: '/stories' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-healing-900 text-white">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Heart Mender Logo" className="h-8 w-8 object-contain" />
              <span className="text-lg md:text-xl font-bold">Heart Mender</span>
            </Link>
          </div>

          {isMobile ? (
            <button onClick={toggleMenu} className="text-white focus:outline-none" aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          ) : (
            <nav>
              <ul className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`${isActive(link.path) ? 'text-healing-300 font-medium' : 'hover:text-healing-300'}`}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white p-0 h-auto hover:bg-transparent hover:text-healing-300"
                    onClick={() => setContactDialogOpen(true)}
                  >
                    Contact
                  </Button>
                </li>
              </ul>
            </nav>
          )}
        </div>

        {isMobile && isMenuOpen && (
          <div className="pb-4">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block py-2 ${isActive(link.path) ? 'text-healing-300 font-medium' : 'hover:text-healing-300'}`}
                    onClick={closeMenu}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white p-0 h-auto hover:bg-transparent hover:text-healing-300"
                  onClick={() => { setContactDialogOpen(true); closeMenu(); }}
                >
                  Contact
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <ContactSupportDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </div>
  );
};

export default Navbar;
