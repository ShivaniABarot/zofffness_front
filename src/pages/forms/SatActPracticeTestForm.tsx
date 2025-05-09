import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Loader2 } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import axios from 'axios';

const SatActPracticeTestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Define test types with their prices and IDs
  const testTypePrices = {
    '1': 95,  // SAT Regular Time (ID: 1)
    '2': 95,  // SAT Extended Time (ID: 2)
    '3': 95,  // ACT Regular Time (ID: 3)
    '4': 95   // ACT Extended Time (ID: 4)
  };

  // Map display names to test type IDs
  const testTypeMap = {
    'sat': '1',
    'sat-extended': '2',
    'act': '3',
    'act-extended': '4'
  };

  // Define validation state
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});

  const [formData, setFormData] = useState({
    parent_first_name: '',
    parent_last_name: '',
    parent_phone: '',
    parent_email: '',
    student_first_name: '',
    student_last_name: '',
    student_email: '',
    school: '',
    grade: '',
    test_type: '1', // Using ID 1 for SAT Regular Time
    test_date: '',
    amount: testTypePrices['1'].toString(),
    payment_status: 'Success',
    course_type: 'SAT/ACT Practice Test'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error for this field when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: false
      }));
    }
  };

  const handleTestTypeChange = (value: string) => {
    // Convert display value to test type ID
    const testTypeId = testTypeMap[value as keyof typeof testTypeMap] || '1';
    const price = testTypePrices[testTypeId] || 95;

    setFormData(prev => ({
      ...prev,
      test_type: testTypeId,
      amount: price.toString()
    }));
  };

  const testDateMap: { [key: string]: string } = {
    april5: '2025-04-05',
    april12: '2025-04-12',
    april19: '2025-04-19',
    april26: '2025-04-26',
    may3: '2025-05-03',
    may10: '2025-05-10',
    may17: '2025-05-17',
    may24: '2025-05-24',
    may31: '2025-05-31',
    june7: '2025-06-07',
    june14: '2025-06-14',
    june21: '2025-06-21',
    june28: '2025-06-28',
  };

  const handleTestDateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      test_date: testDateMap[value] || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: {[key: string]: boolean} = {};
    let hasErrors = false;

    // Check required fields
    const requiredFields = [
      'parent_first_name',
      'parent_last_name',
      'parent_phone',
      'parent_email',
      'student_first_name',
      'student_last_name',
      'student_email',
      'school',
      'grade'
      // test_type is not included as it has a default value
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
        hasErrors = true;
      }
    });

    // Check test date
    if (!formData.test_date) {
      newErrors.test_date = true;
      hasErrors = true;
    }

    // Update error state
    setErrors(newErrors);

    if (hasErrors) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill in all required fields',
      });
      return;
    }

    setIsLoading(true);

    // Create a new submission object with the field names expected by the API
    const submissionData = {
      parent_first_name: formData.parent_first_name,
      parent_last_name: formData.parent_last_name,
      parent_phone: formData.parent_phone,
      parent_email: formData.parent_email,
      student_first_name: formData.student_first_name,
      student_last_name: formData.student_last_name,
      student_email: formData.student_email,
      school: formData.school,
      grade: parseInt(formData.grade, 10) || 0,
      test_type: [formData.test_type], // Send as array with the ID
      date: formData.test_date, // Use 'date' as the API expects
      test_time: '09:00:00',
      location: '510 West Boston Post Road',
      amount: parseInt(formData.amount, 10),
      payment_status: formData.payment_status,
      course_type: formData.course_type,
      type: 'practice_test'
    };

    // Log the submission data in development environment
    if (process.env.NODE_ENV !== 'production') {
      console.log('Submitting data:', submissionData);
    }

    try {
      // Log the submission data in development environment
      if (process.env.NODE_ENV !== 'production') {
        console.log('Final submission data:', submissionData);
        console.log('test_type type:', typeof submissionData.test_type);
        console.log('test_type value:', submissionData.test_type);
      }

      const response = await axios.post('https://zoffness.academy/api/practice_tests', submissionData);

      if (response.data.success) {
        toast({
          title: 'Success',
          description: 'Registration submitted successfully!',
        });

        setFormData({
          parent_first_name: '',
          parent_last_name: '',
          parent_phone: '',
          parent_email: '',
          student_first_name: '',
          student_last_name: '',
          student_email: '',
          school: '',
          grade: '',
          test_type: '1',
          test_date: '',
          amount: testTypePrices['1'].toString(),
          payment_status: 'Success',
          course_type: 'SAT/ACT Practice Test'
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Log detailed error information in development environment
        if (process.env.NODE_ENV !== 'production') {
          console.error('API Error Response:', error.response?.data);
          console.error('Full error object:', error);

          // Log more details about the validation errors
          if (error.response?.data?.errors) {
            console.error('Detailed validation errors:');
            for (const [field, messages] of Object.entries(error.response.data.errors)) {
              console.error(`Field: ${field}, Messages:`, messages);
            }
          }
        }

        if (error.response?.status === 422) {
          // Handle validation errors
          const validationErrors = error.response.data.errors || {};
          const errorMessages = [];

          for (const field in validationErrors) {
            const messages = validationErrors[field];
            if (Array.isArray(messages)) {
              errorMessages.push(`${field}: ${messages.join(', ')}`);
            }
          }

          const errorMessage = errorMessages.length > 0
            ? errorMessages.join('\n')
            : 'Please check your form inputs.';

          toast({
            variant: 'destructive',
            title: 'Validation Error',
            description: errorMessage,
          });
        } else {
          // Handle other HTTP errors
          toast({
            variant: 'destructive',
            title: `Error (${error.response?.status || 'Unknown'})`,
            description: error.response?.data?.message || 'Failed to submit registration. Please try again.',
          });
        }
      } else {
        // Handle non-Axios errors
        if (process.env.NODE_ENV !== 'production') {
          console.error('Non-Axios Error:', error);
        }

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-32 bg-gray-52">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              SAT/ACT Practice Test Registration
            </h1>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Test Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Test Selection</h2>

                    <div className="space-y-2">
                      <Label htmlFor="test_type">Select Test Type *</Label>
                      <Select
                        onValueChange={handleTestTypeChange}
                        defaultValue="sat"
                      >
                        <SelectTrigger id="test_type">
                          <SelectValue placeholder="Select test type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat">Full-Length Proctored Practice SAT Test with Regular Time - $95</SelectItem>
                          <SelectItem value="sat-extended">Full-Length Proctored Practice SAT Test with 50% Extended Time - $95</SelectItem>
                          <SelectItem value="act">Full-Length Proctored Practice ACT Test with Regular Time - $95</SelectItem>
                          <SelectItem value="act-extended">Full-Length Proctored Practice ACT Test with 50% Extended Time - $95</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Practice Test Dates */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Practice Test Dates and Times</h2>
                    <p className="text-sm font-semibold text-college-blue-500 mb-2">ACT/SAT Courses*</p>

                    <div className="space-y-2">
                      <Label htmlFor="test_date">Select Test Date *</Label>
                      <Select
                        onValueChange={(value) => {
                          handleTestDateChange(value);
                          // Clear error when user selects a date
                          if (errors.test_date) {
                            setErrors(prev => ({
                              ...prev,
                              test_date: false
                            }));
                          }
                        }}
                        required
                      >
                        <SelectTrigger
                          id="test_date"
                          className={errors.test_date ? 'border-red-500' : ''}
                        >
                          <SelectValue placeholder="Select test date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="april5">Saturday, April 5th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="april12">Saturday, April 12th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="april19">Saturday, April 19th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="april26">Saturday, April 26th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may3">Saturday, May 3rd @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may10">Saturday, May 10th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may17">Saturday, May 17th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may24">Saturday, May 24th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may31">Saturday, May 31st @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="june7">Saturday, June 7th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="june14">Saturday, June 14th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="june21">Saturday, June 21st @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="june28">Saturday, June 28th @ 9am at Zoffness College Prep</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.test_date && (
                        <p className="text-red-500 text-xs mt-1">Please select a test date</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">All tests are held at 510 West Boston Post Road</p>
                    </div>
                  </div>

                  {/* Parent Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Parent Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parent_first_name">Parent First Name *</Label>
                        <Input
                          id="parent_first_name"
                          value={formData.parent_first_name}
                          onChange={handleInputChange}
                          className={errors.parent_first_name ? 'border-red-500' : ''}
                          required
                        />
                        {errors.parent_first_name && (
                          <p className="text-red-500 text-xs mt-1">This field is required</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parent_last_name">Parent Last Name *</Label>
                        <Input
                          id="parent_last_name"
                          value={formData.parent_last_name}
                          onChange={handleInputChange}
                          className={errors.parent_last_name ? 'border-red-500' : ''}
                          required
                        />
                        {errors.parent_last_name && (
                          <p className="text-red-500 text-xs mt-1">This field is required</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parent_phone">Parent Phone *</Label>
                      <Input
                        id="parent_phone"
                        type="tel"
                        value={formData.parent_phone}
                        onChange={handleInputChange}
                        className={errors.parent_phone ? 'border-red-500' : ''}
                        required
                      />
                      {errors.parent_phone && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parent_email">Parent Email *</Label>
                      <Input
                        id="parent_email"
                        type="email"
                        value={formData.parent_email}
                        onChange={handleInputChange}
                        className={errors.parent_email ? 'border-red-500' : ''}
                        required
                      />
                      {errors.parent_email && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                    </div>
                  </div>

                  {/* Student Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Student Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="student_first_name">Student First Name *</Label>
                        <Input
                          id="student_first_name"
                          value={formData.student_first_name}
                          onChange={handleInputChange}
                          className={errors.student_first_name ? 'border-red-500' : ''}
                          required
                        />
                        {errors.student_first_name && (
                          <p className="text-red-500 text-xs mt-1">This field is required</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student_last_name">Student Last Name *</Label>
                        <Input
                          id="student_last_name"
                          value={formData.student_last_name}
                          onChange={handleInputChange}
                          className={errors.student_last_name ? 'border-red-500' : ''}
                          required
                        />
                        {errors.student_last_name && (
                          <p className="text-red-500 text-xs mt-1">This field is required</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student_email">Student Email *</Label>
                      <Input
                        id="student_email"
                        type="email"
                        value={formData.student_email}
                        onChange={handleInputChange}
                        className={errors.student_email ? 'border-red-500' : ''}
                        required
                      />
                      {errors.student_email && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school">School *</Label>
                      <Input
                        id="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        className={errors.school ? 'border-red-500' : ''}
                        required
                      />
                      {errors.school && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">Current Grade *</Label>
                      <Input
                        id="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        className={errors.grade ? 'border-red-500' : ''}
                        required
                      />
                      {errors.grade && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-college-blue-500 hover:bg-college-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SatActPracticeTestForm;