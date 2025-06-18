import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, User, UserPlus, Check, X, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';

import { useAuth, SignupData } from '../../contexts/AuthContext';

// Validation interfaces
interface ValidationState {
  isValid: boolean;
  message: string;
}

interface FormValidation {
  firstName: ValidationState;
  lastName: ValidationState;
  email: ValidationState;
  phone: ValidationState;
  password: {
    isValid: boolean;
    hasLowercase: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasMinLength: boolean;
    message: string;
  };
  confirmPassword: ValidationState;
}

const SignupPage = () => {
  const [formData, setFormData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'parent', // Only parent signup allowed
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validation, setValidation] = useState<FormValidation>({
    firstName: { isValid: false, message: '' },
    lastName: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    phone: { isValid: true, message: '' }, // Optional field
    password: {
      isValid: false,
      hasLowercase: false,
      hasUppercase: false,
      hasNumber: false,
      hasMinLength: false,
      message: ''
    },
    confirmPassword: { isValid: false, message: '' }
  });

  // Track which fields have been touched (interacted with)
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const { signup } = useAuth();
  const navigate = useNavigate();



  // Validation functions
  const validateName = (name: string, _fieldName: string, isTouched: boolean): ValidationState => {
    if (!name.trim()) {
      return { isValid: false, message: isTouched ? 'This field is required' : '' };
    }
    if (name.trim().length < 2) {
      return { isValid: false, message: 'Must be at least 2 characters' };
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return { isValid: false, message: 'Only letters and spaces allowed' };
    }
    return { isValid: true, message: '' };
  };

  const validateEmail = (email: string, isTouched: boolean): ValidationState => {
    if (!email.trim()) {
      return { isValid: false, message: isTouched ? 'Email is required' : '' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true, message: '' };
  };

  const validatePhone = (phone: string, _isTouched: boolean): ValidationState => {
    if (!phone.trim()) {
      return { isValid: true, message: '' };
    }
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return { isValid: false, message: 'Please enter a valid phone number' };
    }
    return { isValid: true, message: '' };
  };

  const validatePassword = (password: string, _isTouched: boolean) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    const isValid = hasLowercase && hasUppercase && hasNumber && hasMinLength;

    return {
      isValid,
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasMinLength,
      message: ''
    };
  };

  const validateConfirmPassword = (password: string, confirmPassword: string, isTouched: boolean): ValidationState => {
    if (!confirmPassword.trim()) {
      return { isValid: false, message: isTouched ? 'Please confirm your password' : '' };
    }
    if (password !== confirmPassword) {
      return { isValid: false, message: 'Passwords do not match' };
    }
    return { isValid: true, message: '' };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched when user starts typing
    setTouchedFields(prev => new Set(prev).add(name));

    // Real-time validation
    let newValidation = { ...validation };
    const isTouched = touchedFields.has(name) || value.length > 0;

    switch (name) {
      case 'firstName':
        newValidation.firstName = validateName(value, name, isTouched);
        break;
      case 'lastName':
        newValidation.lastName = validateName(value, name, isTouched);
        break;
      case 'email':
        newValidation.email = validateEmail(value, isTouched);
        break;
      case 'phone':
        newValidation.phone = validatePhone(value, isTouched);
        break;
      case 'password':
        newValidation.password = validatePassword(value, isTouched);
        newValidation.confirmPassword = validateConfirmPassword(value, formData.confirmPassword, touchedFields.has('confirmPassword'));
        break;
      case 'confirmPassword':
        newValidation.confirmPassword = validateConfirmPassword(formData.password, value, isTouched);
        break;
    }

    setValidation(newValidation);
  };

  // Handle field blur (when user leaves the field)
  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));

    // Re-validate the field when it loses focus
    let newValidation = { ...validation };
    const isTouched = true;

    switch (fieldName) {
      case 'firstName':
        newValidation.firstName = validateName(formData.firstName, fieldName, isTouched);
        break;
      case 'lastName':
        newValidation.lastName = validateName(formData.lastName, fieldName, isTouched);
        break;
      case 'email':
        newValidation.email = validateEmail(formData.email, isTouched);
        break;
      case 'phone':
        newValidation.phone = validatePhone(formData.phone, isTouched);
        break;
      case 'confirmPassword':
        newValidation.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword, isTouched);
        break;
    }

    setValidation(newValidation);
  };

  // Enhanced validation indicator component with better UI
  const ValidationIndicator = ({ isValid, message, fieldName, fieldValue }: {
    isValid: boolean;
    message: string;
    fieldName: string;
    fieldValue: string;
  }) => {
    // Only show validation messages if field has been touched and has content or error
    const shouldShow = message && (touchedFields.has(fieldName) || fieldValue.length > 0);

    if (!shouldShow) return null;

    return (
      <div className={`flex items-center mt-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
        isValid
          ? 'text-green-700 bg-green-50 border border-green-200'
          : 'text-red-700 bg-red-50 border border-red-200'
      }`}>
        <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
          isValid ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {isValid ? (
            <Check className="w-2.5 h-2.5 text-white" />
          ) : (
            <X className="w-2.5 h-2.5 text-white" />
          )}
        </div>
        <span className="font-medium">{message}</span>
      </div>
    );
  };

  // Enhanced password requirements component
  const PasswordRequirements = ({ password }: { password: typeof validation.password }) => {
    const requirements = [
      { key: 'hasLowercase', text: 'At least one lowercase letter', met: password.hasLowercase },
      { key: 'hasUppercase', text: 'At least one uppercase letter', met: password.hasUppercase },
      { key: 'hasNumber', text: 'At least one number', met: password.hasNumber },
      { key: 'hasMinLength', text: 'Minimum 8 characters', met: password.hasMinLength }
    ];

    const allMet = requirements.every(req => req.met);

    return (
      <div className={`mt-3 p-4 rounded-xl border-2 transition-all duration-300 ${
        allMet
          ? 'bg-green-50 border-green-200'
          : 'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-center mb-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
            allMet ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            {allMet ? (
              <Check className="w-3 h-3 text-white" />
            ) : (
              <AlertCircle className="w-3 h-3 text-white" />
            )}
          </div>
          <p className={`text-sm font-semibold ${
            allMet ? 'text-green-800' : 'text-blue-800'
          }`}>
            {allMet ? 'Password Requirements Met!' : 'Password Requirements'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {requirements.map((req) => (
            <div key={req.key} className={`flex items-center text-xs transition-colors duration-200 ${
              req.met ? 'text-green-700' : 'text-gray-600'
            }`}>
              <div className={`w-3 h-3 rounded-full flex items-center justify-center mr-2 ${
                req.met ? 'bg-green-600' : 'bg-gray-300'
              }`}>
                {req.met ? (
                  <Check className="w-2 h-2 text-white" />
                ) : (
                  <div className="w-1 h-1 bg-white rounded-full" />
                )}
              </div>
              <span className={req.met ? 'font-medium' : ''}>{req.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await signup(formData);
      if (result) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create account. Please try again.');
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
              Welcome to Zoffness!
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Simplify your learning journey and boost your academic success with Zoffness College Prep. Get started for free.
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800 mb-6">
              <Check className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('firstName')}
                  placeholder="First Name"
                  className={`h-14 rounded-2xl border-2 px-6 text-lg transition-all duration-300 ${
                    formData.firstName && touchedFields.has('firstName')
                      ? validation.firstName.isValid
                        ? 'border-green-400 focus:border-green-500 bg-green-50/30 focus:bg-green-50/50 shadow-sm focus:shadow-green-100'
                        : 'border-red-400 focus:border-red-500 bg-red-50/30 focus:bg-red-50/50 shadow-sm focus:shadow-red-100'
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-100/50'
                  }`}
                  required
                />
                <ValidationIndicator
                  isValid={validation.firstName.isValid}
                  message={validation.firstName.message}
                  fieldName="firstName"
                  fieldValue={formData.firstName}
                />
              </div>

              <div className="space-y-2">
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('lastName')}
                  placeholder="Last Name"
                  className={`h-14 rounded-2xl border-2 px-6 text-lg transition-all duration-300 ${
                    formData.lastName && touchedFields.has('lastName')
                      ? validation.lastName.isValid
                        ? 'border-green-400 focus:border-green-500 bg-green-50/30 focus:bg-green-50/50 shadow-sm focus:shadow-green-100'
                        : 'border-red-400 focus:border-red-500 bg-red-50/30 focus:bg-red-50/50 shadow-sm focus:shadow-red-100'
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-100/50'
                  }`}
                  required
                />
                <ValidationIndicator
                  isValid={validation.lastName.isValid}
                  message={validation.lastName.message}
                  fieldName="lastName"
                  fieldValue={formData.lastName}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('email')}
                placeholder="Email Address"
                className={`h-14 rounded-2xl border-2 px-6 text-lg transition-all duration-300 ${
                  formData.email && touchedFields.has('email')
                    ? validation.email.isValid
                      ? 'border-green-400 focus:border-green-500 bg-green-50/30 focus:bg-green-50/50 shadow-sm focus:shadow-green-100'
                      : 'border-red-400 focus:border-red-500 bg-red-50/30 focus:bg-red-50/50 shadow-sm focus:shadow-red-100'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-100/50'
                }`}
                required
              />
              <ValidationIndicator
                isValid={validation.email.isValid}
                message={validation.email.message}
                fieldName="email"
                fieldValue={formData.email}
              />
            </div>

            {/* Phone Field (Optional) */}
            <div className="space-y-2">
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('phone')}
                placeholder="Phone Number (Optional)"
                className={`h-14 rounded-2xl border-2 px-6 text-lg transition-all duration-300 ${
                  formData.phone && touchedFields.has('phone')
                    ? validation.phone.isValid
                      ? 'border-green-400 focus:border-green-500 bg-green-50/30 focus:bg-green-50/50 shadow-sm focus:shadow-green-100'
                      : 'border-red-400 focus:border-red-500 bg-red-50/30 focus:bg-red-50/50 shadow-sm focus:shadow-red-100'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-100/50'
                }`}
              />
              <ValidationIndicator
                isValid={validation.phone.isValid}
                message={validation.phone.message}
                fieldName="phone"
                fieldValue={formData.phone}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('password')}
                  placeholder="Password"
                  required
                  className={`h-14 rounded-2xl border-2 px-6 pr-14 text-lg transition-all duration-300 ${
                    formData.password && touchedFields.has('password')
                      ? validation.password.isValid
                        ? 'border-green-400 focus:border-green-500 bg-green-50/30 focus:bg-green-50/50 shadow-sm focus:shadow-green-100'
                        : 'border-red-400 focus:border-red-500 bg-red-50/30 focus:bg-red-50/50 shadow-sm focus:shadow-red-100'
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-100/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ValidationIndicator
                isValid={validation.password.isValid}
                message={validation.password.message}
                fieldName="password"
                fieldValue={formData.password}
              />
              {formData.password && touchedFields.has('password') && (
                <PasswordRequirements password={validation.password} />
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('confirmPassword')}
                  placeholder="Confirm Password"
                  required
                  className={`h-14 rounded-2xl border-2 px-6 pr-14 text-lg transition-all duration-300 ${
                    formData.confirmPassword && touchedFields.has('confirmPassword')
                      ? validation.confirmPassword.isValid
                        ? 'border-green-400 focus:border-green-500 bg-green-50/30 focus:bg-green-50/50 shadow-sm focus:shadow-green-100'
                        : 'border-red-400 focus:border-red-500 bg-red-50/30 focus:bg-red-50/50 shadow-sm focus:shadow-red-100'
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-100/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ValidationIndicator
                isValid={validation.confirmPassword.isValid}
                message={validation.confirmPassword.message}
                fieldName="confirmPassword"
                fieldValue={formData.confirmPassword}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.firstName.trim() ||
                  !formData.lastName.trim() ||
                  !formData.email.trim() ||
                  !formData.password.trim() ||
                  !formData.confirmPassword.trim() ||
                  !validation.firstName.isValid ||
                  !validation.lastName.isValid ||
                  !validation.email.isValid ||
                  !validation.password.isValid ||
                  !validation.confirmPassword.isValid ||
                  !validation.phone.isValid
                }
                className={`w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isLoading ||
                  !formData.firstName.trim() ||
                  !formData.lastName.trim() ||
                  !formData.email.trim() ||
                  !formData.password.trim() ||
                  !formData.confirmPassword.trim() ||
                  !validation.firstName.isValid ||
                  !validation.lastName.isValid ||
                  !validation.email.isValid ||
                  !validation.password.isValid ||
                  !validation.confirmPassword.isValid ||
                  !validation.phone.isValid
                    ? 'bg-gray-400 cursor-not-allowed shadow-none transform-none'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors"
              >
                Sign in now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          {/* Student Image */}
          <div className="mb-8">
            <div className="relative mx-auto">
              <img
                src="/D430_50_073_1200.jpg"
                alt="Student studying with Zoffness Academy"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover"
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Text */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Make your learning easier and organized with Zoffness Academy
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of students achieving their academic goals with personalized learning paths and expert guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
