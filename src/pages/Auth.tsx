import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', confirmPassword: '', username: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && !isLoading) navigate('/');
  }, [user, isLoading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) { toast.error('Please fill in all fields'); return; }
    setSubmitting(true);
    const { error } = await signIn(signInData.email, signInData.password);
    setSubmitting(false);
    if (error) { toast.error(error.message || 'Sign in failed. Please check your credentials.'); }
    else { toast.success('Welcome back!'); navigate('/'); }
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
    <div className="min-h-screen bg-gradient-to-br from-healing-900 via-healing-800 to-healing-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-healing-400/10 rounded-full blur-3xl" />
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="text-white space-y-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Heart Mender Hub</h1>
              <p className="text-healing-200 text-sm">Men's Grief & Healing Community</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight">You don't have to face this alone.</h2>
          <p className="text-healing-200 text-lg leading-relaxed">A safe, supportive space built specifically for men navigating divorce, bereavement, estrangement, and life's hardest challenges.</p>
          <div className="space-y-4 pt-4">
            {[
              { icon: Users, text: "Connect with men who truly understand" },
              { icon: Shield, text: "Safe, moderated community — your privacy protected" },
              { icon: BookOpen, text: "Real stories of healing and recovery" },
              { icon: Heart, text: "Expert resources tailored for men" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-healing-100">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-2 lg:hidden">
              <Heart className="w-6 h-6 text-healing-600" fill="currentColor" />
              <span className="font-bold text-healing-900">Heart Mender Hub</span>
            </div>
            <CardTitle className="text-2xl text-healing-900">Join the Community</CardTitle>
            <CardDescription>Your journey to healing starts here</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" type="email" placeholder="your@email.com" value={signInData.email} onChange={e => setSignInData(d => ({ ...d, email: e.target.value }))} required autoComplete="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input id="signin-password" type={showPassword ? "text" : "password"} placeholder="Your password" value={signInData.password} onChange={e => setSignInData(d => ({ ...d, password: e.target.value }))} required autoComplete="current-password" />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-healing-600 hover:bg-healing-700 text-white" disabled={submitting}>
                    {submitting ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input id="signup-username" type="text" placeholder="Choose a username" value={signUpData.username} onChange={e => setSignUpData(d => ({ ...d, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") }))} required minLength={3} maxLength={30} />
                    <p className="text-xs text-gray-500">Letters, numbers, and underscores only</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="your@email.com" value={signUpData.email} onChange={e => setSignUpData(d => ({ ...d, email: e.target.value }))} required autoComplete="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input id="signup-password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" value={signUpData.password} onChange={e => setSignUpData(d => ({ ...d, password: e.target.value }))} required minLength={8} autoComplete="new-password" />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input id="signup-confirm" type="password" placeholder="Repeat your password" value={signUpData.confirmPassword} onChange={e => setSignUpData(d => ({ ...d, confirmPassword: e.target.value }))} required autoComplete="new-password" />
                  </div>
                  <Button type="submit" className="w-full bg-healing-600 hover:bg-healing-700 text-white" disabled={submitting}>
                    {submitting ? "Creating account..." : "Create Free Account"}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    By creating an account, you agree to our <Link to="/" className="text-healing-600 hover:underline">community guidelines</Link>
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
