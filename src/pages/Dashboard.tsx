import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ParentDashboard from './ParentDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on user type
  if (!user) {
    return null; // This should be handled by ProtectedRoute
  }

  if (user.userType === 'parent') {
    return <ParentDashboard />;
  } else {
    return <StudentDashboard />;
  }
};

export default Dashboard;
