import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Mail } from 'lucide-react';
import { toast } from 'sonner';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    toast.success('Thank you for subscribing to our newsletter.');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-[#1a1a3e] text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6F61] to-[#6A5ACD] rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-xl text-white">Heart Mender</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Supporting you through grief, loss, divorce, and life's hardest moments. A safe space for healing — for everyone.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#6A5ACD] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#6A5ACD] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="mailto:hello@heartmenderhub.com"
                className="w-9 h-9 bg-white/10 hover:bg-[#008080] rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email">
                <Mail className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Community', href: '/community' },
                { label: 'Resources', href: '/resources' },
                { label: 'Stories', href: '/stories' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-[#008080] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Get weekly resources, community updates, and healing insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#6A5ACD] transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#6A5ACD] hover:bg-[#5949ab] text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-60 shimmer-border"
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>&copy; {currentYear} Heart Mender Hub. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Safeguarding</span>
          </div>
          <div className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#FF6F61] mx-0.5" fill="currentColor" /> for healing
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
