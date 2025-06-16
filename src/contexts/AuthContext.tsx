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

      // Fallback to mock parent authentication for demo
      if (email && password) {
        const mockUser: User = {
          id: 'mock-' + Date.now(),
          email,
          firstName: email.split('@')[0],
          lastName: 'User',
          userType: 'parent',
          createdAt: new Date().toISOString(),
          students: [] // Initialize empty students array for parents
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
        const response = await axios.post('https://zoffness.academy/api/auth/login', {
          email: parentEmail,
          password: parentPassword
        });

        if (response.data.success) {
          parentUser = response.data.user;
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
