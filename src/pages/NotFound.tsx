
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-healing-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-healing-800 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for may have been moved or doesn't exist.
            Let's get you back to a helpful page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-healing-600 hover:bg-healing-700">
                Return Home
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="outline" className="border-healing-500 text-healing-600">
                Explore Resources
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
