
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePendingStoriesCount } from '@/hooks/usePendingStoriesCount';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { pendingCount } = usePendingStoriesCount();
  const { isAdmin, logoutAdmin } = useAdminAuth();

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
    { text: 'Community', path: '/community' },
    { text: 'Resources', path: '/resources' },
    { text: 'Contact', path: '/contact' },
  ];

  // Only show this if user is admin
  const adminLinks = isAdmin ? [
    { 
      text: 'Review Stories', 
      path: '/admin', 
      hasBadge: pendingCount > 0,
      badgeCount: pendingCount,
      icon: <Shield className="h-4 w-4 mr-1" />
    }
  ] : [];

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
                            {link.icon}
                            {link.text}
                            {link.hasBadge && (
                              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {link.badgeCount}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                      <li>
                        {isAdmin ? (
                          <Link
                            to="/"
                            className="block py-2 hover:text-healing-300 flex items-center"
                            onClick={() => {
                              logoutAdmin();
                              closeMenu();
                            }}
                          >
                            <LogOut className="h-4 w-4 mr-1" />
                            Logout
                          </Link>
                        ) : (
                          <Link
                            to="/admin"
                            className="block py-2 hover:text-healing-300 flex items-center"
                            onClick={closeMenu}
                          >
                            <LogIn className="h-4 w-4 mr-1" />
                            Admin Login
                          </Link>
                        )}
                      </li>
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
                      {link.icon}
                      {link.text}
                      {link.hasBadge && (
                        <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {link.badgeCount}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  {isAdmin ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white p-0 h-auto hover:bg-transparent hover:text-healing-300 flex items-center"
                      onClick={logoutAdmin}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </Button>
                  ) : (
                    <Link
                      to="/admin"
                      className="hover:text-healing-300 flex items-center"
                    >
                      <LogIn className="h-4 w-4 mr-1" />
                      Admin Login
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
