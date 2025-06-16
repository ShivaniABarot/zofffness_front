import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Users,
  Settings,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth, Student } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StudentManagement from '../components/StudentManagement';

const ParentDashboard = () => {
  const { user, getStudents, deleteStudent } = useAuth();
  const [showStudentManagement, setShowStudentManagement] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [managementMode, setManagementMode] = useState<'create' | 'edit'>('create');
  const students = getStudents();

  // Handle student management actions
  const handleAddStudent = () => {
    setManagementMode('create');
    setEditingStudent(null);
    setShowStudentManagement(true);
  };

  const handleEditStudent = (student: Student) => {
    setManagementMode('edit');
    setEditingStudent(student);
    setShowStudentManagement(true);
  };

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (window.confirm(`Are you sure you want to delete ${studentName}'s account? This action cannot be undone.`)) {
      await deleteStudent(studentId);
    }
  };

  const handleCloseManagement = () => {
    setShowStudentManagement(false);
    setEditingStudent(null);
    setManagementMode('create');
  };

  // Mock data for registrations (in real app, this would come from API)
  const mockRegistrations = [
    {
      id: 1,
      service: 'SAT/ACT Diagnostic Test',
      package: 'Initial Assessment',
      status: 'completed',
      date: '2024-01-15',
      amount: 250,
      studentName: 'John Doe'
    },
    {
      id: 2,
      service: 'College Admissions Counseling',
      package: 'Five Session Package',
      status: 'active',
      date: '2024-01-20',
      amount: 1250,
      studentName: 'Jane Doe'
    },
    {
      id: 3,
      service: 'SAT/ACT Practice Test',
      package: 'Practice Test Session',
      status: 'scheduled',
      date: '2024-02-01',
      amount: 150,
      studentName: 'John Doe'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'active':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'scheduled':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
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
                Manage your family's educational journey and track your students' progress.
                Add student accounts and create login credentials for each student to access their personalized dashboard.
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
                          <p className="text-sm text-gray-600">Students</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {students.length}
                          </p>
                        </div>
                        <Users className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active Services</p>
                          <p className="text-2xl font-bold text-green-600">
                            {mockRegistrations.filter(r => r.status === 'active').length}
                          </p>
                        </div>
                        <BookOpen className="w-8 h-8 text-green-600" />
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

                {/* Students Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Your Students
                      </CardTitle>
                      <Button
                        onClick={handleAddStudent}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Student
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {students.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No students yet</h3>
                        <p className="text-gray-600 mb-4">
                          Add your first student to get started with managing their educational journey.
                        </p>
                        <Button
                          onClick={handleAddStudent}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Student
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {students.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {student.firstName} {student.lastName}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Student Code: <span className="font-mono font-bold text-blue-600">{student.studentCode}</span>
                                </p>
                                {student.grade && (
                                  <p className="text-xs text-gray-500">Grade: {student.grade}</p>
                                )}
                                {student.school && (
                                  <p className="text-xs text-gray-500">School: {student.school}</p>
                                )}
                                <p className="text-xs text-green-600 mt-1">
                                  ✓ Student can login with your email/password + their code
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditStudent(student)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteStudent(student.id, `${student.firstName} ${student.lastName}`)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Registrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Recent Registrations
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
                                {registration.package} • {registration.studentName}
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
                          <User className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="text-blue-600 font-medium">Parent</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
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
                      <Button
                        className="w-full justify-start"
                        variant="outline"
                        onClick={handleAddStudent}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Manage Students
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

      {/* Student Management Modal */}
      {showStudentManagement && (
        <StudentManagement
          onClose={handleCloseManagement}
          editingStudent={editingStudent}
          mode={managementMode}
        />
      )}
    </div>
  );
};

export default ParentDashboard;
