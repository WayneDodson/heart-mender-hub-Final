
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, LogIn, AlertTriangle, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isAdmin, loginAdmin } = useAdminAuth();
  const navigate = useNavigate();
  
  // Check if already authenticated as admin
  useEffect(() => {
    if (isAdmin) {
      toast({
        title: "Already Authenticated",
        description: "You are already logged in as administrator.",
        duration: 3000,
      });
      onLoginSuccess();
      navigate('/admin');
    }
  }, [isAdmin, navigate, onLoginSuccess, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const success = await loginAdmin(username, password);
      
      if (success) {
        // Reset attempts
        setAttempts(0);
        
        // Trigger the success callback
        onLoginSuccess();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        // Show different messages based on number of attempts
        if (newAttempts >= 3) {
          setError(`Invalid username or password. Multiple failed attempts detected (${newAttempts}). Please verify your credentials.`);
        } else {
          setError("Invalid username or password");
        }
        
        setPassword("");
      }
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Admin login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-healing-700" />
            Administrator Login
          </CardTitle>
          <CardDescription>
            Enter your administrator credentials to access restricted features.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin email"
                required
                autoFocus
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Login as Administrator
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
