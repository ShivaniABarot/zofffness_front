import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  User,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StudentDashboard = () => {
  const { user } = useAuth();

  // Mock data for student progress and activities
  const mockProgress = {
    satScore: 1450,
    targetScore: 1550,
    completedSessions: 8,
    totalSessions: 12,
    upcomingSessions: 2
  };

  const mockActivities = [
    {
      id: 1,
      type: 'practice_test',
      title: 'SAT Practice Test #3',
      status: 'completed',
      date: '2024-01-15',
      score: 1420
    },
    {
      id: 2,
      type: 'session',
      title: 'Math Tutoring Session',
      status: 'scheduled',
      date: '2024-02-01',
      time: '3:00 PM'
    },
    {
      id: 3,
      type: 'assignment',
      title: 'College Essay Draft',
      status: 'pending',
      date: '2024-02-05',
      dueDate: '2024-02-10'
    }
  ];

  const mockGoals = [
    {
      id: 1,
      title: 'Improve SAT Math Score',
      target: 800,
      current: 720,
      progress: 90
    },
    {
      id: 2,
      title: 'Complete College Applications',
      target: 8,
      current: 5,
      progress: 62.5
    },
    {
      id: 3,
      title: 'Finish Personal Statement',
      target: 1,
      current: 0.7,
      progress: 70
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'practice_test':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'session':
        return <Calendar className="w-5 h-5 text-green-600" />;
      case 'assignment':
        return <BookOpen className="w-5 h-5 text-orange-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'scheduled':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600">
                Track your progress and stay on top of your college preparation journey.
                Your parent can view your progress and help manage your educational goals.
              </p>
              {user?.parentId && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    📚 Your account is managed by your parent. They can help track your progress and schedule sessions.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Current SAT Score</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {mockProgress.satScore}
                          </p>
                          <p className="text-xs text-gray-500">Target: {mockProgress.targetScore}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Sessions Completed</p>
                          <p className="text-2xl font-bold text-green-600">
                            {mockProgress.completedSessions}/{mockProgress.totalSessions}
                          </p>
                          <p className="text-xs text-gray-500">
                            {Math.round((mockProgress.completedSessions / mockProgress.totalSessions) * 100)}% Complete
                          </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Upcoming Sessions</p>
                          <p className="text-2xl font-bold text-orange-600">
                            {mockProgress.upcomingSessions}
                          </p>
                          <p className="text-xs text-gray-500">This week</p>
                        </div>
                        <Calendar className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Goals Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Your Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockGoals.map((goal) => (
                        <div key={goal.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-gray-900">{goal.title}</h4>
                            <span className="text-sm text-gray-600">
                              {goal.current}/{goal.target}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">{goal.progress}% complete</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockActivities.map((activity) => (
                        <div 
                          key={activity.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-4">
                            {getActivityIcon(activity.type)}
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {activity.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {new Date(activity.date).toLocaleDateString()}
                                {activity.time && ` at ${activity.time}`}
                                {activity.score && ` • Score: ${activity.score}`}
                                {activity.dueDate && ` • Due: ${new Date(activity.dueDate).toLocaleDateString()}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(activity.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Account Type</p>
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                          <span className="text-green-600 font-medium">Student</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Parent Connection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Family Connection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-1">Parent Dashboard Access</h4>
                        <p className="text-sm text-blue-700">
                          Your parent can view your progress, schedule sessions, and manage your educational services from their dashboard.
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-1">Shared Progress</h4>
                        <p className="text-sm text-green-700">
                          Your achievements and goals are automatically shared with your parent to help coordinate your educational journey.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Practice Tests
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Session
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Assignments
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Award className="w-4 h-4 mr-2" />
                        View Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Score Improvement</p>
                          <p className="text-xs text-gray-600">+50 points on SAT</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Session Streak</p>
                          <p className="text-xs text-gray-600">5 sessions completed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentDashboard;
