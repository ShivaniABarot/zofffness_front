import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2, User, GraduationCap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Sign in to your Zoffness account
                </p>
              </CardHeader>

              <CardContent>
                {/* User Type Selection - Moved to top */}
                <div className="mb-8 space-y-4">
                  {/* Parent Login Option */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">P</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900">Parents</h3>
                        <p className="text-sm text-blue-700">Use your registration email and password</p>
                      </div>
                    </div>
                  </div>

                  {/* Student Login Option */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg hover:border-green-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">S</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-green-900">Students</h3>
                        <p className="text-sm text-green-700 mb-3">
                          Use parent credentials + your student code
                        </p>
                        <Link
                          to="/auth/student-login"
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                        >
                          Go to Student Login →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center mb-6">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <span className="text-sm text-gray-500 px-4 bg-white">Parent Login Form</span>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="parent@example.com"
                      required
                      className="w-full border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                        className="w-full pr-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link 
                      to="/auth/forgot-password" 
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-5 w-5" />
                        Sign In as Parent
                      </>
                    )}
                  </Button>
                </form>

                {/* Demo Accounts */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                    <span className="mr-2">🎯</span>
                    Demo Accounts
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="font-medium">Parent Account</span>
                      </div>
                      <div className="text-gray-600">
                        parent@demo.com / demo123
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded border">
                      <div className="flex items-center mb-1">
                        <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                        <span className="font-medium">Student Accounts</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Student accounts are created by parents from their dashboard.
                        Try logging in as a parent first, then create a student account.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    New parent?{' '}
                    <Link
                      to="/auth/signup"
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                    >
                      Create parent account
                    </Link>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Students: Ask your parent to create your account from their dashboard
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
