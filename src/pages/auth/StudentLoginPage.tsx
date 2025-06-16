import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2, GraduationCap, User, Key } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const StudentLoginPage = () => {
  const [formData, setFormData] = useState({
    parentEmail: '',
    parentPassword: '',
    studentCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { studentLogin } = useAuth();
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
      const success = await studentLogin(
        formData.parentEmail, 
        formData.parentPassword, 
        formData.studentCode
      );
      if (success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Student login error:', error);
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
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Student Login
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Access your student dashboard
                </p>
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-green-900 mb-1">How to Login as a Student</h4>
                      <div className="text-xs text-green-700 space-y-1">
                        <p>• Enter your <strong>parent's email address</strong></p>
                        <p>• Enter your <strong>parent's password</strong></p>
                        <p>• Enter your <strong>unique student code</strong> (provided by parent)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* User Type Selection - Moved to top */}
                <div className="mb-8 space-y-4">
                  {/* Student Login Option */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg hover:border-green-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">S</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-green-900">Students</h3>
                        <p className="text-sm text-green-700">Use parent credentials + your student code</p>
                      </div>
                    </div>
                  </div>

                  {/* Parent Login Option */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">P</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900">Are you a parent?</h3>
                        <p className="text-sm text-blue-700 mb-3">
                          Use your registration email and password
                        </p>
                        <Link
                          to="/auth/login"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Go to Parent Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center mb-6">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <span className="text-sm text-gray-500 px-4 bg-white">Student Login Form</span>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Parent Email */}
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">
                      Parent Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="parentEmail"
                        name="parentEmail"
                        type="email"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        placeholder="parent@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Parent Password */}
                  <div className="space-y-2">
                    <Label htmlFor="parentPassword">
                      Parent Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="parentPassword"
                        name="parentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.parentPassword}
                        onChange={handleInputChange}
                        placeholder="Enter parent password"
                        className="pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Student Code */}
                  <div className="space-y-2">
                    <Label htmlFor="studentCode">
                      Student Code <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="studentCode"
                        name="studentCode"
                        type="text"
                        value={formData.studentCode}
                        onChange={handleInputChange}
                        placeholder="ABC123"
                        className="pl-10 font-mono uppercase text-center text-lg tracking-wider border-2 border-green-200 focus:border-green-500"
                        style={{ textTransform: 'uppercase' }}
                        maxLength={6}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-xs text-gray-600">
                        Your unique 6-character code provided by your parent
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <GraduationCap className="mr-2 h-5 w-5" />
                        Sign In as Student
                      </>
                    )}
                  </Button>
                </form>

                {/* Demo Account */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🎓</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-3">Demo Student Login</h4>
                      <div className="bg-white rounded-md p-3 border border-blue-100">
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Parent Email:</span>
                            <span className="font-mono text-blue-700 font-medium">parent@demo.com</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Parent Password:</span>
                            <span className="font-mono text-blue-700 font-medium">demo123</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Student Code:</span>
                            <span className="text-orange-600 font-medium">Create student first</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        💡 First login as parent and create a student to get the student code
                      </p>
                    </div>
                  </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Don't have a student code? Ask your parent to create your account first
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

export default StudentLoginPage;
