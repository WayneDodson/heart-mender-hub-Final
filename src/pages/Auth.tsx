
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Loader2, Mail } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
        
        setSignupSuccess(true);
        setSignupEmail(email);
        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: signupEmail,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Email sent",
        description: "Verification email has been resent.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen py-6 md:py-12 px-3 md:px-4 flex items-center justify-center bg-healing-50">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-center text-xl md:text-2xl">Verify Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent a verification email to <strong>{signupEmail}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 px-3 md:px-6">
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Please check your inbox (and spam folder) and click the verification link to complete your registration.
              </AlertDescription>
            </Alert>
            <div className="text-center mt-4 md:mt-6">
              <p className="text-sm text-gray-600 mb-3 md:mb-4">Didn't receive the email?</p>
              <Button 
                onClick={handleResendEmail} 
                variant="outline" 
                className="flex items-center gap-2"
                disabled={resendLoading}
              >
                {resendLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Resend Verification Email
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 md:space-y-4 pt-0 px-3 md:px-6 pb-4 md:pb-6">
            <Button
              type="button"
              variant="link"
              className="text-healing-600"
              onClick={() => {
                setSignupSuccess(false);
                setIsSignUp(false);
              }}
            >
              Return to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-12 px-3 md:px-4 flex items-center justify-center bg-healing-50">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-xl md:text-2xl">{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Sign up to share your story and join our community'
              : 'Sign in to access your account and share your story'
            }
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-3 md:space-y-4 px-3 md:px-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 md:space-y-4 pt-0 px-3 md:px-6 pb-4 md:pb-6">
            <Button 
              type="submit" 
              className="w-full bg-healing-600 hover:bg-healing-700"
              disabled={isLoading}
            >
              {isLoading ? 
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Logging In...'}
                </> : 
                (isSignUp ? 'Sign Up' : 'Sign In')
              }
            </Button>
            <Button
              type="button"
              variant="link"
              className="text-healing-600"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
