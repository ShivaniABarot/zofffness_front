import React from 'react';
import { toast } from '@/hooks/use-toast';
import { Info, AlertCircle, CheckCircle, X } from 'lucide-react';

interface CustomToastProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const showCustomToast = ({ type, title, description, action }: CustomToastProps) => {
  const getIcon = () => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-900';
      case 'warning':
        return 'border-orange-200 bg-orange-50 text-orange-900';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-900';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-900';
      default:
        return 'border-blue-200 bg-blue-50 text-blue-900';
    }
  };

  toast({
    title: (
      <div className="flex items-center gap-2">
        {getIcon()}
        <span className="font-semibold">{title}</span>
      </div>
    ),
    description: (
      <div className="mt-1">
        <p className="text-sm leading-relaxed">{description}</p>
        {action && (
          <div className="mt-3">
            {action}
          </div>
        )}
      </div>
    ),
    variant: 'default',
    className: `${getStyles()} border-2 shadow-lg`,
    duration: type === 'error' ? 6000 : 4000, // Longer duration for errors
  });
};

// Specific toast functions for common use cases
export const showEmailAlreadyRegisteredToast = () => {
  showCustomToast({
    type: 'info',
    title: 'Account Found!',
    description: 'This email is already registered. Would you like to sign in instead?',
    action: (
      <button 
        onClick={() => window.location.href = '/auth/login'}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
      >
        Sign In Instead
      </button>
    )
  });
};

export const showUsernameUnavailableToast = () => {
  showCustomToast({
    type: 'warning',
    title: 'Username Unavailable',
    description: 'This username is already taken. Please choose a different one.',
  });
};

export const showPasswordRequirementsToast = (message: string) => {
  showCustomToast({
    type: 'warning',
    title: 'Password Requirements',
    description: message,
  });
};

export const showValidationErrorToast = (field: string, message: string) => {
  showCustomToast({
    type: 'error',
    title: `${field.charAt(0).toUpperCase() + field.slice(1)} Error`,
    description: message,
  });
};
