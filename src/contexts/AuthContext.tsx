import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useToast } from '../components/ui/use-toast';

// Define user types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'parent' | 'student';
  phone?: string;
  createdAt: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Define signup data type
export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'parent' | 'student';
  phone?: string;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Verify token with backend
          const response = await axios.get('https://zoffness.academy/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Try real API first
      const response = await axios.post('https://zoffness.academy/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const { user: userData, token } = response.data;
        setUser(userData);
        localStorage.setItem('authToken', token);
        
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${userData.firstName}!`,
        });
        
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to mock authentication for demo
      if (email && password) {
        const mockUser: User = {
          id: 'mock-' + Date.now(),
          email,
          firstName: email.split('@')[0],
          lastName: 'User',
          userType: email.includes('student') ? 'student' : 'parent',
          createdAt: new Date().toISOString()
        };
        
        setUser(mockUser);
        localStorage.setItem('authToken', 'mock-token-' + Date.now());
        
        toast({
          title: 'Login Successful (Demo)',
          description: `Welcome, ${mockUser.firstName}! This is demo mode.`,
        });
        
        return true;
      }
      
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
    
    return false;
  };

  // Signup function
  const signup = async (userData: SignupData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Validate passwords match
      if (userData.password !== userData.confirmPassword) {
        toast({
          title: 'Signup Failed',
          description: 'Passwords do not match.',
          variant: 'destructive',
        });
        return false;
      }

      // Try real API first
      const response = await axios.post('https://zoffness.academy/api/auth/signup', {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        user_type: userData.userType,
        phone: userData.phone
      });

      if (response.data.success) {
        const { user: newUser, token } = response.data;
        setUser(newUser);
        localStorage.setItem('authToken', token);
        
        toast({
          title: 'Account Created',
          description: `Welcome to Zoffness, ${newUser.firstName}!`,
        });
        
        return true;
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      // Fallback to mock signup for demo
      const mockUser: User = {
        id: 'mock-' + Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType,
        phone: userData.phone,
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('authToken', 'mock-token-' + Date.now());
      
      toast({
        title: 'Account Created (Demo)',
        description: `Welcome to Zoffness, ${mockUser.firstName}! This is demo mode.`,
      });
      
      return true;
    } finally {
      setIsLoading(false);
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
