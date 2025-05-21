
import { useState, useEffect } from 'react';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is admin on component mount
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem("isAdminAuthenticated") === "true";
      setIsAdmin(adminStatus);
      setIsLoading(false);
    };

    checkAdminStatus();
    
    // Listen for storage events (in case admin logs in/out in another tab)
    window.addEventListener("storage", checkAdminStatus);
    
    return () => {
      window.removeEventListener("storage", checkAdminStatus);
    };
  }, []);

  const loginAdmin = () => {
    localStorage.setItem("isAdminAuthenticated", "true");
    setIsAdmin(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setIsAdmin(false);
  };

  return { isAdmin, isLoading, loginAdmin, logoutAdmin };
}
