
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Mail, Lock } from 'lucide-react';
import { loginUser } from '@/Calls/users';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would be an API call in a real application
    console.log(email,password);
    const userLogin=async()=>{
      const userData={
        "email":email,
        "password":password
      }
      const response=await(loginUser(userData));
      if(response.success){
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Signed in successfully",
            description: "Welcome back to AllClear News!",
          });
          localStorage.setItem('token',response.token);
          navigate('/');
        }, 1500);
      }else{
        toast({
          title:"Invalid Credentials",
          description:"You've entered wrong credentials. Kindly enter corrrect credentials"
        })
      }
    }
    userLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="news-container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-bold">Sign in</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <Button 
                  type="submit" 
                  className="w-full bg-news-primary hover:bg-news-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <Link to="/forgot-password" className="text-news-primary hover:text-news-accent">
                  Forgot your password?
                </Link>
              </div>
              
              <div className="mt-6 text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-news-primary hover:text-news-accent font-semibold">
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
