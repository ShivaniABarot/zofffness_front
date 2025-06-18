import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface ValidationMessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
  className?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ 
  type, 
  message, 
  className = '' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  if (!message) return null;

  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg border text-sm ${getStyles()} ${className}`}>
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};

// Field validation component
interface FieldValidationProps {
  value: string;
  type: 'email' | 'password' | 'name' | 'phone';
  showValidation?: boolean;
}

export const FieldValidation: React.FC<FieldValidationProps> = ({ 
  value, 
  type, 
  showValidation = false 
}) => {
  if (!showValidation || !value) return null;

  const validateField = () => {
    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { type: 'error' as const, message: 'Please enter a valid email address' };
        }
        return { type: 'success' as const, message: 'Email format is valid' };

      case 'password':
        if (value.length < 8) {
          return { type: 'error' as const, message: 'Password must be at least 8 characters long' };
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return { type: 'info' as const, message: 'For better security, include uppercase, lowercase, and numbers' };
        }
        return { type: 'success' as const, message: 'Password strength is good' };

      case 'name':
        if (value.length < 2) {
          return { type: 'error' as const, message: 'Name must be at least 2 characters long' };
        }
        return { type: 'success' as const, message: 'Name looks good' };

      case 'phone':
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
          return { type: 'error' as const, message: 'Please enter a valid phone number' };
        }
        return { type: 'success' as const, message: 'Phone number format is valid' };

      default:
        return null;
    }
  };

  const validation = validateField();
  if (!validation) return null;

  return (
    <ValidationMessage 
      type={validation.type} 
      message={validation.message} 
      className="mt-1 text-xs"
    />
  );
};
