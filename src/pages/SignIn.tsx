import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Mail, Lock, KeyRound, LogIn, ShieldCheck } from 'lucide-react';
import { loginUser, loginWithOtp, sendOtpToEmail } from '@/Calls/users';
import { singInWithGoogle } from '@/Calls/users';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [otpStep, setOtpStep] = useState<'enterEmail' | 'enterOtp'>('enterEmail');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        localStorage.setItem('token', response.token);
        toast({ title: "Signed in", description: "Welcome back!" });
        navigate('/');
      } else {
        toast({ title: "Login failed", description: response.message || "Invalid credentials" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast({ title: "Email Required", description: "Please enter your email first." });
      return;
    }
    setIsLoading(true);
    try {
      const response = await sendOtpToEmail({ email });
      if (response.success) {
        toast({ title: "OTP Sent", description: "Check your email for the OTP." });
        setOtpStep('enterOtp');
      } else {
        toast({ title: "Error", description: response.message || "Failed to send OTP" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to send OTP." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginWithOtp({ email, otp });
      if (response.success) {
        localStorage.setItem('token', response.token);
        toast({ title: "Logged in", description: "Welcome!" });
        navigate('/');
      } else {
        toast({ title: "Invalid OTP", description: response.message || "Try again." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await singInWithGoogle(email);
      if (response.success) {
        localStorage.setItem('token', response.token);
        toast({ title: "Signed in", description: "Welcome!" });
        navigate('/');
      } else {
        toast({ title: "Google login failed", description: response.message });
      }
    } catch (error) {
      toast({ title: "Error", description: "Google login failed." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="news-container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  variant={loginMethod === 'password' ? "default" : "outline"}
                  onClick={() => { setLoginMethod('password'); setOtpStep('enterEmail'); }}
                >
                  <Lock size={16} className="mr-1" /> Password
                </Button>
                <Button
                  variant={loginMethod === 'otp' ? "default" : "outline"}
                  onClick={() => { setLoginMethod('otp'); setOtpStep('enterEmail'); }}
                >
                  <KeyRound size={16} className="mr-1" /> OTP
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loginMethod === 'password' ? (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Mail size={18} className="text-gray-400 mr-2" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Lock size={18} className="text-gray-400 mr-2" />
                    <Input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-news-primary" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              ) : (
                <>
                  {otpStep === 'enterEmail' ? (
                    <div className="space-y-4">
                      <div className="flex items-center border rounded-md px-3 py-2">
                        <Mail size={18} className="text-gray-400 mr-2" />
                        <Input
                          type="email"
                          placeholder="Email address"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleSendOtp} className="w-full bg-news-primary" disabled={isLoading}>
                        {isLoading ? "Sending OTP..." : "Send OTP"}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleOtpLogin} className="space-y-4">
                      <div className="flex items-center border rounded-md px-3 py-2">
                        <ShieldCheck size={18} className="text-gray-400 mr-2" />
                        <Input
                          type="text"
                          placeholder="Enter OTP"
                          required
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-news-primary" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify OTP & Sign in"}
                      </Button>
                    </form>
                  )}
                </>
              )}

              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full mt-4 flex items-center justify-center"
                disabled={isLoading}
              >
                <LogIn size={18} className="mr-2" />
                Continue with Google
              </Button>

              <div className="mt-4 text-center text-sm">
                <Link to="/forgot-password" className="text-news-primary hover:text-news-accent">
                  Forgot your password?
                </Link>
              </div>

              <div className="mt-6 text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-news-primary font-semibold">
                  Register here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
