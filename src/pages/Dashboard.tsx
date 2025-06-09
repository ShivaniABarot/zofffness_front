import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for registrations (in real app, this would come from API)
  const mockRegistrations = [
    {
      id: 1,
      service: 'SAT/ACT Diagnostic Test',
      package: 'Initial Assessment',
      status: 'completed',
      date: '2024-01-15',
      amount: 250
    },
    {
      id: 2,
      service: 'College Admissions Counseling',
      package: 'Five Session Package',
      status: 'active',
      date: '2024-01-20',
      amount: 1250
    },
    {
      id: 3,
      service: 'SAT/ACT Practice Test',
      package: 'Practice Test Session',
      status: 'scheduled',
      date: '2024-02-01',
      amount: 150
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'active':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'scheduled':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'active':
        return 'text-blue-600 bg-blue-50';
      case 'scheduled':
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
                {user?.userType === 'parent' 
                  ? 'Manage your family\'s educational journey' 
                  : 'Track your academic progress and upcoming sessions'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active Services</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {mockRegistrations.filter(r => r.status === 'active').length}
                          </p>
                        </div>
                        <BookOpen className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Completed</p>
                          <p className="text-2xl font-bold text-green-600">
                            {mockRegistrations.filter(r => r.status === 'completed').length}
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
                          <p className="text-sm text-gray-600">Upcoming</p>
                          <p className="text-2xl font-bold text-orange-600">
                            {mockRegistrations.filter(r => r.status === 'scheduled').length}
                          </p>
                        </div>
                        <Calendar className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Registrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Your Registrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRegistrations.map((registration) => (
                        <div 
                          key={registration.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(registration.status)}
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {registration.service}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {registration.package}
                              </p>
                              <p className="text-xs text-gray-500">
                                Registered: {new Date(registration.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                              {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                            </span>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              ${registration.amount}
                            </p>
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
                          {user?.userType === 'parent' ? (
                            <User className="w-4 h-4 mr-2 text-blue-600" />
                          ) : (
                            <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                          )}
                          <span className="font-medium capitalize">{user?.userType}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Edit Profile
                      </Button>
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
                      <Link to="/service-selection">
                        <Button className="w-full justify-start" variant="outline">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Register for Services
                        </Button>
                      </Link>
                      <Link to="/consultation/schedule">
                        <Button className="w-full justify-start" variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Consultation
                        </Button>
                      </Link>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Documents
                      </Button>
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

export default Dashboard;
