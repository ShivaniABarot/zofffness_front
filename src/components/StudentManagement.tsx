import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, GraduationCap, School, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth, StudentCreationData, Student } from '../contexts/AuthContext';

interface StudentManagementProps {
  onClose: () => void;
  editingStudent?: Student | null; // For editing existing students
  mode?: 'create' | 'edit';
}

const StudentManagement: React.FC<StudentManagementProps> = ({
  onClose,
  editingStudent = null,
  mode = 'create'
}) => {
  const { createStudent, updateStudent } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<StudentCreationData>({
    firstName: '',
    lastName: '',
    grade: '',
    school: ''
  });

  // Initialize form data when editing
  useEffect(() => {
    if (mode === 'edit' && editingStudent) {
      setFormData({
        firstName: editingStudent.firstName,
        lastName: editingStudent.lastName,
        grade: editingStudent.grade || '',
        school: editingStudent.school || ''
      });
    } else {
      // Reset form for create mode
      setFormData({
        firstName: '',
        lastName: '',
        grade: '',
        school: ''
      });
    }
  }, [mode, editingStudent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName) {
        alert('Please fill in all required fields.');
        return;
      }

      if (mode === 'edit' && editingStudent) {
        // Update existing student
        const success = await updateStudent(editingStudent.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          grade: formData.grade,
          school: formData.school
        });
        if (success) {
          onClose();
        }
      } else {
        // Create new student
        const student = await createStudent(formData);
        if (student) {
          // Reset form
          setFormData({
            firstName: '',
            lastName: '',
            grade: '',
            school: ''
          });
          onClose();
        }
      }
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {mode === 'edit' ? 'Edit Student' : 'Add New Student'}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {mode === 'edit'
              ? 'Update student information. The student code will remain the same.'
              : 'Create a student account. A unique student code will be generated for login access using your parent credentials.'
            }
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Student Code Display - Only show for edit mode */}
            {mode === 'edit' && editingStudent && (
              <div className="space-y-2">
                <Label>Student Code</Label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-blue-900">
                      {editingStudent.studentCode}
                    </span>
                    <span className="text-sm text-blue-600">
                      Used for student login
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Grade */}
            <div className="space-y-2">
              <Label htmlFor="grade">Grade (Optional)</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="grade"
                  name="grade"
                  type="text"
                  value={formData.grade}
                  onChange={handleInputChange}
                  placeholder="e.g., 11th, 12th"
                  className="pl-10"
                />
              </div>
            </div>

            {/* School */}
            <div className="space-y-2">
              <Label htmlFor="school">School (Optional)</Label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="school"
                  name="school"
                  type="text"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder="Enter school name"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Info Box */}
            {mode === 'create' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> After creating the student account, a unique student code will be generated.
                  The student will login using your parent email/password + their student code.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  mode === 'edit' ? 'Update Student' : 'Create Student'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
