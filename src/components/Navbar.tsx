import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Community', href: '/community' },
  { label: 'Resources', href: '/resources' },
  { label: 'Stories', href: '/stories' },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    navigate('/');
    setUserMenuOpen(false);
  };

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Account';

  return (
    <nav className="w-full bg-[#1a1a3e] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#6A5ACD] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#008080] font-bold text-base tracking-tight">Heart Mender</span>
            <span className="text-gray-400 text-[10px] tracking-widest uppercase">Healing Community</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-shimmer px-4 py-2 rounded text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'text-[#008080] bg-white/5'
                    : 'text-gray-300 hover:text-[#008080] hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6A5ACD] via-[#008080] to-[#8FBC8F] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6A5ACD] to-[#008080] flex items-center justify-center text-white text-xs font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{displayName}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#6A5ACD] to-[#008080] hover:opacity-90 text-white font-semibold shimmer-border"
                onClick={() => navigate('/auth?tab=signup')}
              >
                Join Free
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#12122e] border-t border-white/10 px-4 pb-4 pt-2">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-white/5 ${
                location.pathname === link.href ? 'text-[#008080]' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-4">
            {user ? (
              <>
                <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white" onClick={() => { navigate('/profile'); setMobileOpen(false); }}>
                  Profile
                </Button>
                <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white" onClick={() => { navigate('/auth'); setMobileOpen(false); }}>
                  Sign In
                </Button>
                <Button size="sm" className="flex-1 bg-[#6A5ACD] hover:bg-[#5949ab] text-white" onClick={() => { navigate('/auth?tab=signup'); setMobileOpen(false); }}>
                  Join Free
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
