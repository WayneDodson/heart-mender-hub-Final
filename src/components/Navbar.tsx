
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BellAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePendingStoriesCount } from '@/hooks/usePendingStoriesCount';
import { useMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const { isMobile } = useMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { pendingCount } = usePendingStoriesCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const links = [
    { text: 'Home', path: '/' },
    { text: 'Stories', path: '/stories' },
    { text: 'Submit Story', path: '/submit-story' },
    { text: 'Resources', path: '/resources' },
    { text: 'Contact', path: '/contact' },
  ];

  const adminLinks = [
    { 
      text: 'Review Stories', 
      path: '/admin/stories', 
      hasBadge: pendingCount > 0,
      badgeCount: pendingCount 
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-healing-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">Healing Journeys</Link>
          </div>
          
          {isMobile ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-white"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              
              {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-healing-900 z-50 px-4 py-2 shadow-lg">
                  <nav>
                    <ul className="space-y-2">
                      {links.map((link) => (
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
                      {adminLinks.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className={`block py-2 ${isActive(link.path) ? 'text-healing-300 font-medium' : 'hover:text-healing-300'} flex items-center`}
                            onClick={closeMenu}
                          >
                            {link.text}
                            {link.hasBadge && (
                              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {link.badgeCount}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <nav>
              <ul className="flex space-x-6">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`${isActive(link.path) ? 'text-healing-300 font-medium' : 'hover:text-healing-300'}`}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
                {adminLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`${isActive(link.path) ? 'text-healing-300 font-medium' : 'hover:text-healing-300'} flex items-center`}
                    >
                      {link.text}
                      {link.hasBadge && (
                        <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {link.badgeCount}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
