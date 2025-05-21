
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Loader2, Mail, Lock, ShieldAlert } from 'lucide-react';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp"

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [showMFASetup, setShowMFASetup] = useState(false);
  const [showMFAVerify, setShowMFAVerify] = useState(false);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [mfaSetupComplete, setMfaSetupComplete] = useState(false);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [isLeakedPassword, setIsLeakedPassword] = useState(false);
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

  // Function to check if a password has been leaked
  const checkPasswordStrength = async (password: string) => {
    if (password.length < 8) {
      return false;
    }
    
    // Check for common patterns
    const commonPatterns = [
      /^123456/, /password/i, /qwerty/i, /admin/i, 
      /welcome/i, /letmein/i, /abc123/i
    ];
    
    for (const pattern of commonPatterns) {
      if (pattern.test(password)) {
        return false;
      }
    }
    
    // Check if it contains both letters and numbers
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasLetters && hasNumbers && (password.length > 10 || hasSpecial);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsLeakedPassword(false);

    try {
      // Check password strength for both signup and signin
      const isStrongPassword = await checkPasswordStrength(password);
      if (!isStrongPassword) {
        setIsLeakedPassword(true);
        toast({
          title: "Password Security Warning",
          description: "The password you entered appears to be weak or commonly used. Please choose a stronger password.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

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
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Check if MFA is already enabled for user
        const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        
        if (mfaError) {
          console.error("Error checking MFA status:", mfaError);
        }
        
        if (mfaData?.currentLevel === 'aal2') {
          // MFA is already setup and verified
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          navigate('/');
        } else {
          // Show MFA setup screen
          setShowMFASetup(true);
        }
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

  const setupMFA = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });
      
      if (error) throw error;
      
      setFactorId(data.id);
      setQrCode(data.totp.qr_code);
      toast({
        title: "MFA Setup",
        description: "Scan the QR code with your authenticator app.",
      });
    } catch (error: any) {
      toast({
        title: "MFA Setup Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowMFAVerify(true);
    }
  };

  const verifyMFA = async () => {
    if (!factorId || otpCode.length !== 6) {
      toast({
        title: "Verification Failed",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId,
      });
      
      if (challengeError) throw challengeError;
      
      setChallengeId(challengeData.id);
      
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: otpCode,
      });
      
      if (verifyError) throw verifyError;
      
      toast({
        title: "MFA Enabled",
        description: "Multi-factor authentication has been set up successfully.",
      });
      
      setMfaSetupComplete(true);
      
      // Navigate to home after short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const skipMFA = () => {
    toast({
      title: "Login successful",
      description: "Welcome back! (MFA setup skipped)",
    });
    navigate('/');
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

  if (showMFASetup) {
    return (
      <div className="min-h-screen py-6 md:py-12 px-3 md:px-4 flex items-center justify-center bg-healing-50">
        <Card className="w-full max-w-md">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-xl md:text-2xl">Secure Your Account</CardTitle>
            <CardDescription>
              Set up two-factor authentication to add an extra layer of security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 px-3 md:px-6">
            {!showMFAVerify ? (
              <div className="space-y-4">
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertDescription>
                    Two-factor authentication requires you to verify your identity with an authenticator app each time you sign in.
                  </AlertDescription>
                </Alert>
                <div className="flex flex-col items-center gap-4 mt-6">
                  <Button 
                    onClick={setupMFA} 
                    className="w-full bg-healing-600 hover:bg-healing-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Setting up...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Set up two-factor authentication
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={skipMFA}
                    className="w-full"
                    disabled={isLoading}
                  >
                    Skip for now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {qrCode && (
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-center font-medium">Scan this QR code with your authenticator app</p>
                    <div className="border border-gray-200 p-2 rounded-md mx-auto">
                      <img src={qrCode} alt="QR Code for MFA" className="h-48 w-48" />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter verification code</Label>
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={6} 
                      onChange={(value) => setOtpCode(value)}
                      value={otpCode}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                {mfaSetupComplete && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <AlertDescription>
                      Two-factor authentication successfully set up. You will be redirected shortly.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col items-center gap-4 mt-6">
                  <Button 
                    onClick={verifyMFA} 
                    className="w-full bg-healing-600 hover:bg-healing-700"
                    disabled={isLoading || mfaSetupComplete || otpCode.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify and enable"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={skipMFA}
                    className="w-full"
                    disabled={isLoading || mfaSetupComplete}
                  >
                    Skip for now
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
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
              {isLeakedPassword && (
                <Alert variant="destructive" className="mt-2">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertDescription>
                    This password is too weak. Please use a stronger password with at least 8 characters, 
                    including letters, numbers, and special characters.
                  </AlertDescription>
                </Alert>
              )}
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
