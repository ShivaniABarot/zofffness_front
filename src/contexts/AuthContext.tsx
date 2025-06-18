import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useToast } from '../components/ui/use-toast';

// API Configuration
const API_ENDPOINTS = {
  SIGNUP: 'https://zoffness.academy/api/register',
  SIGNIN: 'http://localhost:8000/api/login',
  VERIFY: 'http://localhost:8000/api/verify'
};

// Define user types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'parent' | 'student';
  phone?: string;
  createdAt: string;
  parentId?: string; // For students, reference to parent
  students?: Student[]; // For parents, list of their students
}

// Define student creation data type
export interface StudentCreationData {
  firstName: string;
  lastName: string;
  grade?: string;
  school?: string;
  // Note: No email/password - students use parent credentials + student code
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
  // Student management functions
  createStudent: (studentData: StudentCreationData) => Promise<Student | null>;
  getStudents: () => Student[];
  updateStudent: (studentId: string, studentData: Partial<Student>) => Promise<boolean>;
  deleteStudent: (studentId: string) => Promise<boolean>;
  // Student login function
  studentLogin: (parentEmail: string, parentPassword: string, studentCode: string) => Promise<boolean>;
}

// Define signup data type (only parents can sign up directly)
export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'parent'; // Only parents can sign up directly - students are created by parents
  phone?: string;
  username?: string; // Optional - will be auto-generated from email if not provided
}

// Define student data type (created by parents)
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentCode: string; // Unique code for student login
  parentId: string;
  createdAt: string;
  grade?: string;
  school?: string;
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
          const response = await axios.get(API_ENDPOINTS.VERIFY, {
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
      const signinPayload = {
        email,
        password
      };

      console.log('Sending signin data:', signinPayload);
      const response = await axios.post(API_ENDPOINTS.SIGNIN, signinPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Login API Response:', response.data);
      console.log('Login API Status:', response.status);

      // Check for successful response
      if (response.status === 200 || response.status === 201 || response.data.success === true) {
        const userData = response.data.user || response.data.data || response.data;
        const token = response.data.token || response.data.access_token || response.data.auth_token || 'api-token-' + Date.now();

        // Ensure we have user data
        if (userData && (userData.email || userData.id)) {
          setUser({
            id: userData.id || 'api-user-' + Date.now(),
            email: userData.email || email,
            firstName: userData.firstName || userData.first_name || email.split('@')[0],
            lastName: userData.lastName || userData.last_name || 'User',
            userType: userData.userType || userData.user_type || 'parent',
            phone: userData.phone,
            createdAt: userData.createdAt || userData.created_at || new Date().toISOString(),
            students: userData.students || []
          });
          localStorage.setItem('authToken', token);

          toast({
            title: 'Login Successful',
            description: `Welcome back, ${userData.firstName || userData.first_name || email.split('@')[0]}!`,
          });

          return true;
        } else {
          console.log('API response missing user data:', response.data);
        }
      } else {
        console.log('API response not successful:', response.status, response.data);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);

      // Show specific error message if available
      let errorMessage = error.response?.data?.message ||
                        error.response?.data?.error ||
                        'Invalid email or password. Please try again.';

      // Handle validation errors for signin
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const errorFields = Object.keys(validationErrors);
        if (errorFields.length > 0) {
          const allErrors = errorFields.map(field => {
            const fieldErrors = validationErrors[field];
            const errorText = Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors;
            return `${field}: ${errorText}`;
          }).join(', ');
          errorMessage = allErrors;
        }
      }

      // Only fallback to demo mode for network errors
      if (error.code === 'ERR_NETWORK') {
        console.log('Network error, using demo mode');

        const mockUser: User = {
          id: 'mock-' + Date.now(),
          email,
          firstName: email.split('@')[0],
          lastName: 'User',
          userType: 'parent',
          createdAt: new Date().toISOString(),
          students: []
        };

        setUser(mockUser);
        localStorage.setItem('authToken', 'mock-token-' + Date.now());

        toast({
          title: 'Login Successful (Demo)',
          description: `Welcome, ${mockUser.firstName}! API unavailable, using demo mode.`,
        });

        return true;
      }

      toast({
        title: 'Login Failed',
        description: errorMessage,
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
      
      // Validate required fields
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        toast({
          title: 'Signup Failed',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        return false;
      }

      // Validate passwords match
      if (userData.password !== userData.confirmPassword) {
        toast({
          title: 'Signup Failed',
          description: 'Passwords do not match.',
          variant: 'destructive',
        });
        return false;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        toast({
          title: 'Signup Failed',
          description: 'Please enter a valid email address.',
          variant: 'destructive',
        });
        return false;
      }

      // Validate password strength
      if (userData.password.length < 6) {
        toast({
          title: 'Signup Failed',
          description: 'Password must be at least 6 characters long.',
          variant: 'destructive',
        });
        return false;
      }

      // Try real API first
      // Use provided username or generate from email (before @ symbol)
      const username = userData.username || userData.email.split('@')[0];

      const signupPayload = {
        username: username, // Required field
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.confirmPassword,
        user_type: userData.userType,
        phone: userData.phone || null
      };

      console.log('Sending signup data:', signupPayload);

      const response = await axios.post(API_ENDPOINTS.SIGNUP, signupPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Signup API Response:', response.data);

      if (response.data.success || response.status === 200 || response.status === 201) {
        const newUser = response.data.user || response.data.data || response.data;
        const token = response.data.token || response.data.access_token || 'api-token-' + Date.now();

        setUser({
          ...newUser,
          userType: newUser.userType || newUser.user_type || 'parent'
        });
        localStorage.setItem('authToken', token);

        toast({
          title: 'Account Created',
          description: `Welcome to Zoffness, ${newUser.firstName || newUser.first_name}!`,
        });

        return true;
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Validation errors:', error.response?.data?.errors);

      // Log specific email error if present
      if (error.response?.data?.errors?.email) {
        console.error('Email error:', error.response.data.errors.email);
      }

      // Show specific error message if available
      let errorMessage = error.response?.data?.message ||
                        error.response?.data?.error ||
                        'Failed to create account. Please try again.';

      // If there are validation errors, show them
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const errorFields = Object.keys(validationErrors);
        if (errorFields.length > 0) {
          // Handle specific validation errors with user-friendly messages
          const allErrors = errorFields.map(field => {
            const fieldErrors = validationErrors[field];
            const errorText = Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors;

            // Convert API error codes to user-friendly messages
            if (field === 'email' && errorText === 'validation.unique') {
              return 'This email address is already registered. Please use a different email or try signing in.';
            } else if (field === 'username' && errorText === 'validation.unique') {
              return 'This username is already taken. Please choose a different one.';
            } else {
              return `${field}: ${errorText}`;
            }
          }).join(' ');
          errorMessage = allErrors;
        }
      }

      // Only use demo mode if it's a network error
      if (error.code === 'ERR_NETWORK') {
        console.log('Network error, using demo mode for signup');

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
          description: `Welcome to Zoffness, ${mockUser.firstName}! API unavailable, using demo mode.`,
        });

        return true;
      }

      // Show API error message
      toast({
        title: 'Signup Failed',
        description: errorMessage,
        variant: 'destructive',
      });
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

  // Student management functions
  const createStudent = async (studentData: StudentCreationData): Promise<Student | null> => {
    if (!user || user.userType !== 'parent') {
      toast({
        title: 'Access Denied',
        description: 'Only parents can create student accounts.',
        variant: 'destructive',
      });
      return null;
    }

    try {
      // Generate unique student code
      const generateStudentCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };

      // For now, create a mock student (in real app, this would call API)
      const newStudent: Student = {
        id: 'student-' + Date.now(),
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        studentCode: generateStudentCode(),
        parentId: user.id,
        createdAt: new Date().toISOString(),
        grade: studentData.grade,
        school: studentData.school
      };

      // Update parent's students list
      const updatedStudents = [...(user.students || []), newStudent];
      setUser({ ...user, students: updatedStudents });

      // Store student data for login (in real app, this would be handled by backend)
      const studentData_storage = {
        studentCode: newStudent.studentCode,
        parentId: user.id,
        parentEmail: user.email, // Store parent email for demo mode matching
        student: newStudent
      };

      // Store in localStorage for demo (in real app, this would be in database)
      const existingStudents = JSON.parse(localStorage.getItem('studentAccounts') || '[]');
      existingStudents.push(studentData_storage);
      localStorage.setItem('studentAccounts', JSON.stringify(existingStudents));

      toast({
        title: 'Student Account Created',
        description: `${newStudent.firstName}'s account created! Student code: ${newStudent.studentCode}`,
      });

      return newStudent;
    } catch (error) {
      console.error('Error creating student:', error);
      toast({
        title: 'Error',
        description: 'Failed to create student account. Please try again.',
        variant: 'destructive',
      });
      return null;
    }
  };

  const getStudents = (): Student[] => {
    return user?.students || [];
  };

  const updateStudent = async (studentId: string, studentData: Partial<Student>): Promise<boolean> => {
    if (!user || user.userType !== 'parent') {
      return false;
    }

    try {
      const updatedStudents = (user.students || []).map(student =>
        student.id === studentId ? { ...student, ...studentData } : student
      );
      setUser({ ...user, students: updatedStudents });

      toast({
        title: 'Student Updated',
        description: 'Student information has been updated successfully.',
      });

      return true;
    } catch (error) {
      console.error('Error updating student:', error);
      return false;
    }
  };

  const deleteStudent = async (studentId: string): Promise<boolean> => {
    if (!user || user.userType !== 'parent') {
      return false;
    }

    try {
      const updatedStudents = (user.students || []).filter(student => student.id !== studentId);
      setUser({ ...user, students: updatedStudents });

      // Remove student from localStorage
      const existingStudents = JSON.parse(localStorage.getItem('studentAccounts') || '[]');
      const updatedStorageStudents = existingStudents.filter((student: any) => student.student.id !== studentId);
      localStorage.setItem('studentAccounts', JSON.stringify(updatedStorageStudents));

      toast({
        title: 'Student Removed',
        description: 'Student account has been removed successfully.',
      });

      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      return false;
    }
  };

  // Student login function
  const studentLogin = async (parentEmail: string, parentPassword: string, studentCode: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      let parentUser = null;

      // Try to verify parent credentials with API first
      try {
        const response = await axios.post(API_ENDPOINTS.SIGNIN, {
          email: parentEmail,
          password: parentPassword
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (response.data.success || response.status === 200 || response.status === 201) {
          parentUser = response.data.user || response.data.data || response.data;
        }
      } catch (apiError) {
        console.log('API not available, using demo mode');
        // API not available, continue with demo mode
      }

      // If API didn't work, use demo/mock authentication
      if (!parentUser && parentEmail && parentPassword) {
        // For demo purposes, we'll create a mock parent user
        parentUser = {
          id: 'mock-' + Date.now(),
          email: parentEmail,
          firstName: parentEmail.split('@')[0],
          lastName: 'User',
          userType: 'parent',
          createdAt: new Date().toISOString(),
          students: []
        };
      }

      if (!parentUser) {
        toast({
          title: 'Login Failed',
          description: 'Invalid parent credentials.',
          variant: 'destructive',
        });
        return false;
      }

      // Now check for student with matching code and parent
      const studentAccounts = JSON.parse(localStorage.getItem('studentAccounts') || '[]');

      // Match by parent email (works for both real and demo accounts)
      const studentAccount = studentAccounts.find((account: any) => {
        // Check if student code matches and parent email matches
        return account.studentCode === studentCode &&
               (account.parentEmail === parentEmail || account.student.email === parentEmail);
      });

      if (!studentAccount) {
        toast({
          title: 'Login Failed',
          description: 'Invalid student code or student not found. Make sure the parent has created a student account first.',
          variant: 'destructive',
        });
        return false;
      }

      // Create student user object
      const studentUser: User = {
        ...studentAccount.student,
        userType: 'student' as const,
        email: parentEmail // Students use parent's email for reference
      };

      setUser(studentUser);
      localStorage.setItem('authToken', 'student-token-' + Date.now());

      toast({
        title: 'Student Login Successful',
        description: `Welcome, ${studentUser.firstName}!`,
      });

      return true;
    } catch (error) {
      console.error('Student login error:', error);
      toast({
        title: 'Login Failed',
        description: 'Unable to verify credentials. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser,
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    studentLogin
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
