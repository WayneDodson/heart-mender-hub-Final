
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast({
      title: 'Subscription successful',
      description: 'Thank you for subscribing to our newsletter.',
      duration: 5000,
    });
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-msblue-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-msblue-500" />
              <span className="font-bold text-xl text-msblue-800">Heart Mender</span>
            </div>
            <p className="text-gray-600 mb-4">
              Supporting you through your healing journey after divorce, one step at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-msblue-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-msblue-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:contact@heartmender.com" aria-label="Email" className="text-gray-500 hover:text-msblue-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/resources', label: 'Resources' },
                { to: '/stories', label: 'Stories' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-600 hover:text-msblue-600 transition-colors" onClick={scrollToTop}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to receive healing insights and updates.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="healing-input rounded-r-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="bg-msblue-500 text-white px-4 py-2 rounded-r-lg hover:bg-msblue-600 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
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
