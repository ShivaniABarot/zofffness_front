import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowLeft, GraduationCap, User, Key, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [loginType, setLoginType] = useState<'parent' | 'student'>('parent');
  const [isFlipping, setIsFlipping] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [studentFormData, setStudentFormData] = useState({
    parentEmail: '',
    parentPassword: '',
    studentCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, studentLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleToggleLoginType = async () => {
    setIsFlipping(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Wait for flip animation
    setLoginType(prev => prev === 'parent' ? 'student' : 'parent');
    setIsFlipping(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (loginType === 'parent') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setStudentFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      if (loginType === 'parent') {
        success = await login(formData.email, formData.password);
      } else {
        success = await studentLogin(
          studentFormData.parentEmail,
          studentFormData.parentPassword,
          studentFormData.studentCode
        );
      }

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
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-lg">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Welcome back!
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Simplify your workflow and boost your productivity with Zoffness Academy. Get started for free.
            </p>

            {/* Login Type Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gray-100 rounded-2xl p-1 flex">
                <button
                  type="button"
                  onClick={handleToggleLoginType}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    loginType === 'parent'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Parent Login
                </button>
                <button
                  type="button"
                  onClick={handleToggleLoginType}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    loginType === 'student'
                      ? 'bg-white text-green-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Student Login
                </button>
              </div>
            </div>
          </div>

          {/* Form Container with Flip Animation */}
          <div className={`transition-all duration-500 transform ${isFlipping ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {loginType === 'parent' ? (
                // Parent Login Form
                <>
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Parent Email"
                      required
                      className="h-14 rounded-2xl border-2 border-gray-200 px-6 text-lg focus:border-blue-500 hover:border-gray-300 transition-all duration-200"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2 relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      required
                      className="h-14 rounded-2xl border-2 border-gray-200 px-6 pr-14 text-lg focus:border-blue-500 hover:border-gray-300 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <Link
                      to="/auth/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </>
              ) : (
                // Student Login Form
                <>
                  {/* Student Login Info */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-900 mb-1">Student Login Instructions</h4>
                        <div className="text-xs text-green-700 space-y-1">
                          <p>• Enter your <strong>parent's email address</strong></p>
                          <p>• Enter your <strong>parent's password</strong></p>
                          <p>• Enter your <strong>unique student code</strong> (provided by parent)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Parent Email Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="parentEmail"
                        name="parentEmail"
                        type="email"
                        value={studentFormData.parentEmail}
                        onChange={handleInputChange}
                        placeholder="Parent Email"
                        required
                        className="h-14 rounded-2xl border-2 border-gray-200 pl-12 pr-6 text-lg focus:border-green-500 hover:border-gray-300 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Parent Password Field */}
                  <div className="space-y-2 relative">
                    <Input
                      id="parentPassword"
                      name="parentPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={studentFormData.parentPassword}
                      onChange={handleInputChange}
                      placeholder="Parent Password"
                      required
                      className="h-14 rounded-2xl border-2 border-gray-200 px-6 pr-14 text-lg focus:border-green-500 hover:border-gray-300 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Student Code Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="studentCode"
                        name="studentCode"
                        type="text"
                        value={studentFormData.studentCode}
                        onChange={handleInputChange}
                        placeholder="Student Code (ABC123)"
                        required
                        className="h-14 rounded-2xl border-2 border-green-200 pl-12 pr-6 text-lg focus:border-green-500 hover:border-green-300 transition-all duration-200 font-mono uppercase text-center tracking-wider"
                        style={{ textTransform: 'uppercase' }}
                        maxLength={6}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-xs text-gray-600">
                        Your unique 6-character code provided by your parent
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-white ${
                    loginType === 'parent'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      {loginType === 'parent' ? (
                        <>
                          <Users className="mr-2 h-5 w-5" />
                          Login as Parent
                        </>
                      ) : (
                        <>
                          <GraduationCap className="mr-2 h-5 w-5" />
                          Login as Student
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Not a member?{' '}
              <Link
                to="/auth/signup"
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          {/* Student Image */}
          <div className="mb-8">
            <div className="relative mx-auto">
              <img
                src="/pexels-emily-ranquist-493228-1205651.jpg"
                alt="Student learning with Zoffness Academy"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Text */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Make your work easier and organized with Zoffness Academy
          </h2>
          <p className="text-lg text-gray-600">
            Welcome back! Continue your learning journey with personalized study plans and expert guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
