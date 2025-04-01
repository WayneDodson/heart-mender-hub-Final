
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Instagram, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use direct SQL query method instead of the typed .from() method
      // since TypeScript doesn't know about the newsletter_subscribers table yet
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });
        
      if (error) {
        console.error('Error subscribing to newsletter:', error);
        
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            duration: 5000,
          });
        } else {
          toast({
            title: "Subscription failed",
            description: "There was an error subscribing to the newsletter. Please try again.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } else {
        toast({
          title: "Subscription successful",
          description: "Thank you for subscribing to our newsletter!",
          duration: 5000,
        });
        setEmail(''); // Clear the input
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-healing-600 transition-colors"
                  onClick={scrollToTop}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="text-gray-600 hover:text-healing-600 transition-colors"
                  onClick={scrollToTop}
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/stories" 
                  className="text-gray-600 hover:text-healing-600 transition-colors"
                  onClick={scrollToTop}
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-healing-600 transition-colors"
                  onClick={scrollToTop}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to receive healing insights and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="healing-input rounded-r-none"
                value={email}
                onChange={handleEmailChange}
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                className="bg-healing-500 text-white px-4 py-2 rounded-r-lg hover:bg-healing-600 transition-colors disabled:opacity-50"
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
