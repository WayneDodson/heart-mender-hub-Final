import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, Heart, User, LogOut, Shield, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/heart-hands-logo.jpg';

const Navbar: React.FC = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Community', path: '/community' },
    { text: 'Resources', path: '/resources' },
    { text: 'Stories', path: '/stories' },
    { text: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const getInitials = () => {
    if (profile?.display_name) return profile.display_name.slice(0, 2).toUpperCase();
    if (profile?.username) return profile.username.slice(0, 2).toUpperCase();
    if (user?.email) return user.email.slice(0, 2).toUpperCase();
    return 'HM';
  };

  return (
    <nav className="bg-healing-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img src={logo} alt="Heart Mender Logo" className="h-9 w-9 object-contain rounded-lg" />
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white">Heart Mender</span>
              <span className="block text-xs text-healing-300 -mt-1">Men's Healing Community</span>
            </div>
            <span className="sm:hidden text-lg font-bold text-white">Heart Mender</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'bg-healing-700 text-white' : 'text-healing-200 hover:bg-healing-800 hover:text-white'
                }`}
              >{link.text}</Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-healing-800 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-healing-600 text-white text-xs">{getInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-healing-100 max-w-[100px] truncate">
                      {profile?.display_name || profile?.username || 'Member'}
                    </span>
                    <ChevronDown className="w-3 h-3 text-healing-300" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2"><User className="w-4 h-4" />My Profile</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2 text-healing-600"><Shield className="w-4 h-4" />Admin Panel</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
                    <LogOut className="w-4 h-4" />Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-healing-200 hover:text-white hover:bg-healing-800" onClick={() => navigate('/auth?tab=signin')}>Sign In</Button>
                <Button size="sm" className="bg-white text-healing-900 hover:bg-healing-100 font-semibold" onClick={() => navigate('/auth?tab=signup')}>Join Free</Button>
              </>
            )}
          </div>

          <button className="md:hidden text-white p-2 rounded-lg hover:bg-healing-800" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-healing-800 mt-2 pt-4">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive(link.path) ? 'bg-healing-700 text-white' : 'text-healing-200 hover:bg-healing-800 hover:text-white'}`}
                  onClick={() => setIsMenuOpen(false)}
                >{link.text}</Link>
              ))}
            </div>
            {user ? (
              <div className="border-t border-healing-800 pt-4 space-y-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="h-8 w-8"><AvatarImage src={profile?.avatar_url || undefined} /><AvatarFallback className="bg-healing-600 text-white text-xs">{getInitials()}</AvatarFallback></Avatar>
                  <span className="text-sm text-healing-100">{profile?.display_name || profile?.username || 'Member'}</span>
                </div>
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-healing-200 hover:text-white" onClick={() => setIsMenuOpen(false)}><User className="w-4 h-4" /> My Profile</Link>
                {isAdmin && <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-healing-300 hover:text-white" onClick={() => setIsMenuOpen(false)}><Shield className="w-4 h-4" /> Admin Panel</Link>}
                <button onClick={() => { handleSignOut(); setIsMenuOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 w-full"><LogOut className="w-4 h-4" /> Sign Out</button>
              </div>
            ) : (
              <div className="border-t border-healing-800 pt-4 flex flex-col gap-2">
                <Button variant="ghost" className="text-healing-200 justify-start" onClick={() => { navigate('/auth?tab=signin'); setIsMenuOpen(false); }}>Sign In</Button>
                <Button className="bg-white text-healing-900 hover:bg-healing-100 font-semibold" onClick={() => { navigate('/auth?tab=signup'); setIsMenuOpen(false); }}>Join Free</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
