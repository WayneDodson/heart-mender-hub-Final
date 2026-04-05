import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Heart, Shield, Users, BookOpen, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth: React.FC = () => {
  const { signIn, signUp, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'signin';

  const [signInData, setSignInData] = useState({ emailOrUsername: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '', username: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && !isLoading) navigate('/');
  }, [user, isLoading, navigate]);

  // Resolve username to email if needed
  const resolveEmail = async (emailOrUsername: string): Promise<string | null> => {
    // If it looks like an email, use it directly
    if (emailOrUsername.includes('@')) return emailOrUsername;

    // Otherwise look up the username in auth.users via profiles
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', emailOrUsername.toLowerCase().trim())
      .single();

    if (error || !data) return null;

    // Get the email from auth admin via service role — not available client-side,
    // so instead we store email in profiles at sign-up. Fall back to asking user to use email.
    // For now, try to get it from user_metadata via a sign-in attempt with a dummy password
    // to get the "invalid credentials" vs "user not found" distinction.
    // Best approach: store email in profiles table.
    return null;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { emailOrUsername, password } = signInData;
    if (!emailOrUsername || !password) { toast.error('Please fill in all fields'); return; }

    setSubmitting(true);

    let emailToUse = emailOrUsername.trim();

    // If it's a username (no @), look up the email from profiles
    if (!emailToUse.includes('@')) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('username', emailToUse.toLowerCase())
        .single();

      if (error || !data) {
        setSubmitting(false);
        toast.error('Username not found. Please try signing in with your email address.');
        return;
      }

      // We need the email — fetch it from auth.users using the user id
      // Since we can't access auth.users from the client, we store email in profiles at sign-up
      // Check if email column exists in profiles
      const { data: profileWithEmail } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', emailToUse.toLowerCase())
        .single();

      if (profileWithEmail && (profileWithEmail as any).email) {
        emailToUse = (profileWithEmail as any).email;
      } else {
        setSubmitting(false);
        toast.error('Could not resolve username to email. Please sign in with your email address instead.');
        return;
      }
    }

    const { error } = await signIn(emailToUse, password);
    setSubmitting(false);
    if (error) {
      toast.error(error.message || 'Sign in failed. Please check your credentials.');
    } else {
      toast.success('Welcome back!');
      navigate('/');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.password || !signUpData.username) { toast.error('Please fill in all fields'); return; }
    if (signUpData.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    if (signUpData.password !== signUpData.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (signUpData.username.length < 3) { toast.error('Username must be at least 3 characters'); return; }
    setSubmitting(true);
    const { error } = await signUp(signUpData.email, signUpData.password, signUpData.username);
    setSubmitting(false);
    if (error) { toast.error(error.message || 'Sign up failed. Please try again.'); }
    else { toast.success('Account created! Please check your email to verify your account.'); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a3e] via-[#2d2d6b] to-[#1a1a3e] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6A5ACD]/10 rounded-full blur-3xl" />
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left panel */}
        <div className="text-white space-y-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Heart Mender Hub</h1>
              <p className="text-gray-300 text-sm">Healing Community</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight">You don't have to face this alone.</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            A safe, supportive space for anyone navigating divorce, bereavement, estrangement, and life's hardest challenges.
          </p>
          <div className="space-y-4 pt-4">
            {[
              { icon: Users, text: "Connect with others who truly understand" },
              { icon: Shield, text: "Safe, moderated community — your privacy protected" },
              { icon: BookOpen, text: "Real stories of healing and recovery" },
              { icon: Heart, text: "Expert resources and curated guidance" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-200">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — auth card */}
        <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-2 lg:hidden">
              <Heart className="w-6 h-6 text-[#6A5ACD]" fill="currentColor" />
              <span className="font-bold text-[#1a1a3e]">Heart Mender Hub</span>
            </div>
            <CardTitle className="text-2xl text-[#1a1a3e]">Join the Community</CardTitle>
            <CardDescription>Your journey to healing starts here</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>

              {/* SIGN IN */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email or Username</Label>
                    <Input
                      id="signin-email"
                      type="text"
                      placeholder="your@email.com or username"
                      value={signInData.emailOrUsername}
                      onChange={e => setSignInData(d => ({ ...d, emailOrUsername: e.target.value }))}
                      required
                      autoComplete="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={signInData.password}
                        onChange={e => setSignInData(d => ({ ...d, password: e.target.value }))}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#6A5ACD] hover:bg-[#5949ab] text-white"
                    disabled={submitting}
                  >
                    {submitting ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    You can sign in with your <strong>email address</strong> or your <strong>username</strong>
                  </p>
                </form>
              </TabsContent>

              {/* SIGN UP */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="Choose a username"
                      value={signUpData.username}
                      onChange={e => setSignUpData(d => ({ ...d, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") }))}
                      required
                      minLength={3}
                      maxLength={30}
                    />
                    <p className="text-xs text-gray-500">Letters, numbers, and underscores only</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signUpData.email}
                      onChange={e => setSignUpData(d => ({ ...d, email: e.target.value }))}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={signUpData.password}
                        onChange={e => setSignUpData(d => ({ ...d, password: e.target.value }))}
                        required
                        minLength={8}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Repeat your password"
                      value={signUpData.confirmPassword}
                      onChange={e => setSignUpData(d => ({ ...d, confirmPassword: e.target.value }))}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#6A5ACD] hover:bg-[#5949ab] text-white"
                    disabled={submitting}
                  >
                    {submitting ? "Creating account..." : "Create Free Account"}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    By creating an account, you agree to our{' '}
                    <Link to="/" className="text-[#6A5ACD] hover:underline">community guidelines</Link>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
