
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Mail, Lock, User } from 'lucide-react';
import { registerUser } from '@/Calls/users';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive"
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Terms and conditions required",
        description: "Please accept the terms and conditions to register",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // This would be an API call in a real application
    const response=async ()=>{
      
    }

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful",
        description: "Welcome to AllClear News!",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="news-container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-bold">Create an account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-news-primary focus-within:border-news-primary">
                    <User size={18} className="text-gray-400 mr-2" />
                    <Input
                      type="text"
                      placeholder="Full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-news-primary focus-within:border-news-primary">
                    <Mail size={18} className="text-gray-400 mr-2" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-news-primary focus-within:border-news-primary">
                    <Lock size={18} className="text-gray-400 mr-2" />
                    <Input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-news-primary focus-within:border-news-primary">
                    <Lock size={18} className="text-gray-400 mr-2" />
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms} 
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the{" "}
                    <Link to="/terms" className="text-news-primary hover:text-news-accent underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-news-primary hover:bg-news-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                Already have an account?{' '}
                <Link to="/signin" className="text-news-primary hover:text-news-accent font-semibold">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
