import React, { useState, useEffect } from 'react';
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
import SuccessScreen from '../../components/SuccessScreen';
import PaymentModal from '../../components/PaymentModal';
import { mockApiService } from '../../services/mockApiService';
import { updatePaymentStatus } from '../../services/paymentService';

// Define interface for session data
interface Session {
  id: number;
  title: string;
  price_per_slot: string;
  description?: string;
  session_type: string;
  created_at: string;
  updated_at: string;
}

const SatActPracticeTestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingSubmissionData, setPendingSubmissionData] = useState<any>(null);
  const { toast } = useToast();

  // Fetch sessions from API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Try to fetch from real API first
        const response = await axios.get('https://zoffness.academy/api/get_sessions');
        // Log the API response for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log('API Response:', response.data);
        }

        if (response.data.success && Array.isArray(response.data.data)) {
          // Filter sessions to only include practice test-related ones (exclude diagnostic tests)
          const practiceTestSessions = response.data.data.filter((session: Session) =>
            session.title &&
            typeof session.title === 'string' &&
            session.title.toLowerCase().includes('practice') &&
            !session.title.toLowerCase().includes('diagnostic')
          );
          setSessions(practiceTestSessions);
        } else {
          console.error('Failed to fetch sessions or invalid data format');
          // Fall back to mock API
          await useMockSessions();
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);

        // Log more detailed information about the response
        if (axios.isAxiosError(error)) {
          console.error('API Error Response:', error.response?.data);
          console.error('API Error Status:', error.response?.status);
        }

        // Fall back to mock API
        await useMockSessions();
      } finally {
        setIsLoadingSessions(false);
      }
    };

    const useMockSessions = async () => {
      try {
        console.log('Using mock API for practice test sessions');
        const mockResponse = await mockApiService.getSessions('practice');

        if (mockResponse.success && Array.isArray(mockResponse.data)) {
          setSessions(mockResponse.data);
          toast({
            title: 'Demo Mode',
            description: 'Using demo test options. Real API not available.',
          });
        }
      } catch (mockError) {
        console.error('Error with mock API:', mockError);
        toast({
          title: 'Error',
          description: 'Could not load test options. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchSessions();
  }, [toast]);

  // We're now using the API for test types and prices

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
    test_types: [] as string[], // Changed to array for multiple selections
    session_ids: [] as string[], // Changed to array for multiple selections
    test_dates: [] as string[], // Changed to array for multiple selections
    amount: '0',
    payment_status: 'Success',
    course_type: 'SAT/ACT Practice Test'
  });

  // State for selected items with details
  const [selectedTests, setSelectedTests] = useState<Array<{
    sessionId: string;
    testType: string;
    price: number;
    title: string;
  }>>([]);

  const [selectedDates, setSelectedDates] = useState<Array<{
    key: string;
    date: string;
    display: string;
  }>>([]);

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
    if (!value) return; // Don't update if no value is provided

    // Find the selected session from the API
    const selectedSession = sessions.find(session => session.id.toString() === value);

    if (selectedSession) {
      // Check if already selected
      const isAlreadySelected = selectedTests.some(test => test.sessionId === value);

      if (!isAlreadySelected) {
        const newTest = {
          sessionId: selectedSession.id.toString(),
          testType: selectedSession.id.toString(),
          price: parseFloat(selectedSession.price_per_slot),
          title: selectedSession.title
        };

        setSelectedTests(prev => [...prev, newTest]);

        // Update form data
        setFormData(prev => ({
          ...prev,
          test_types: [...prev.test_types, selectedSession.id.toString()],
          session_ids: [...prev.session_ids, selectedSession.id.toString()],
          amount: (parseFloat(prev.amount) + parseFloat(selectedSession.price_per_slot)).toString()
        }));
      }
    }
  };

  const removeTestType = (sessionId: string) => {
    const testToRemove = selectedTests.find(test => test.sessionId === sessionId);
    if (testToRemove) {
      setSelectedTests(prev => prev.filter(test => test.sessionId !== sessionId));

      setFormData(prev => ({
        ...prev,
        test_types: prev.test_types.filter(id => id !== sessionId),
        session_ids: prev.session_ids.filter(id => id !== sessionId),
        amount: (parseFloat(prev.amount) - testToRemove.price).toString()
      }));
    }
  };

  const testDateMap: { [key: string]: string } = {
    april5: '2025-04-05',
    april12: '2025-04-12',
    april19: '2025-04-19',
    april26: '2025-04-26',
    may3: '2025-05-03',
    may10: '2025-05-10',
    may24: '2025-05-24',
    may17: '2025-05-17',
    may31: '2025-05-31',
    june7: '2025-06-07',
    june14: '2025-06-14',
    june21: '2025-06-21',
    june28: '2025-06-28',
  };

  const handleTestDateChange = (value: string) => {
    const dateValue = testDateMap[value];
    if (!dateValue) return;

    // Check if already selected
    const isAlreadySelected = selectedDates.some(date => date.key === value);

    if (!isAlreadySelected) {
      const dateDisplay = getDateDisplay(value);
      const newDate = {
        key: value,
        date: dateValue,
        display: dateDisplay
      };

      setSelectedDates(prev => [...prev, newDate]);

      setFormData(prev => ({
        ...prev,
        test_dates: [...prev.test_dates, dateValue]
      }));
    }
  };

  const removeTestDate = (dateKey: string) => {
    setSelectedDates(prev => prev.filter(date => date.key !== dateKey));

    const dateValue = testDateMap[dateKey];
    setFormData(prev => ({
      ...prev,
      test_dates: prev.test_dates.filter(date => date !== dateValue)
    }));
  };

  const getDateDisplay = (key: string): string => {
    const dateDisplayMap: { [key: string]: string } = {
      april5: 'Saturday, April 5th @ 9am',
      april12: 'Saturday, April 12th @ 9am',
      april19: 'Saturday, April 19th @ 9am',
      april26: 'Saturday, April 26th @ 9am',
      may3: 'Saturday, May 3rd @ 9am',
      may10: 'Saturday, May 10th @ 9am',
      may17: 'Saturday, May 17th @ 9am',
      may24: 'Saturday, May 24th @ 9am',
      may31: 'Saturday, May 31st @ 9am',
      june7: 'Saturday, June 7th @ 9am',
      june14: 'Saturday, June 14th @ 9am',
      june21: 'Saturday, June 21st @ 9am',
      june28: 'Saturday, June 28th @ 9am',
    };
    return dateDisplayMap[key] || '';
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setShowPaymentModal(false);

    if (!pendingSubmissionData) {
      toast({
        title: 'Error',
        description: 'No submission data found. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    // Update the submission data with successful payment status
    const submissionDataWithPayment = {
      ...pendingSubmissionData,
      payment_status: 'Success',
      payment_intent_id: paymentIntentId
    };

    await submitFormData(submissionDataWithPayment);
  };

  const submitFormData = async (submissionData: any) => {
    setIsLoading(true);

    try {
      // Log the data being sent for debugging
      console.log('Submitting data to /new_sat_act API:', submissionData);

      // Use FormData format like the working SatActCourseForm
      const formData = new FormData();
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] !== undefined && submissionData[key] !== null) {
          formData.append(key, submissionData[key].toString());
        }
      });

      console.log('FormData prepared for submission');

      // Try to submit to real API first
      const response = await axios.post('https://zoffness.academy/api/new_sat_act', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      if (response.data.success ||
          (response.data.message && response.data.message.includes('successfully')) ||
          response.data.status === 'success') {
        toast({
          title: 'Registration Successful',
          description: 'Your registration and payment have been processed successfully!',
        });

        // Set form as submitted
        setIsSubmitted(true);

        // Reset form
        setFormData({
          parent_first_name: '',
          parent_last_name: '',
          parent_phone: '',
          parent_email: '',
          student_first_name: '',
          student_last_name: '',
          student_email: '',
          school: '',
          test_types: [],
          session_ids: [],
          test_dates: [],
          amount: '0',
          payment_status: 'Success',
          course_type: 'SAT/ACT Practice Test'
        });

        // Reset selected items
        setSelectedTests([]);
        setSelectedDates([]);

        // Clear pending submission data
        setPendingSubmissionData(null);
      } else {
        toast({
          title: 'Error',
          description: response.data.message || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting to /new_sat_act API:', error);

      // Log the specific error details for Practice Test
      if (axios.isAxiosError(error) && error.response) {
        console.error('new_sat_act API Error Status:', error.response.status);
        console.error('new_sat_act API Error Data:', error.response.data);
        console.error('new_sat_act Validation Errors:', error.response.data.errors);

        // Also log each validation error individually
        if (error.response.data.errors) {
          Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            console.error(`new_sat_act Validation Error for ${field}:`, messages);
          });
        }
      }

      // Fall back to mock API
      try {
        console.log('Using mock API for form submission');
        const mockResponse = await mockApiService.submitForm('practice_tests', submissionData);

        if (mockResponse.success) {
          toast({
            title: 'Registration Successful (Demo)',
            description: 'Your registration has been processed successfully in demo mode!',
          });

          // Set form as submitted
          setIsSubmitted(true);

          // Reset form
          setFormData({
            parent_first_name: '',
            parent_last_name: '',
            parent_phone: '',
            parent_email: '',
            student_first_name: '',
            student_last_name: '',
            student_email: '',
            school: '',
            test_types: [],
            session_ids: [],
            test_dates: [],
            amount: '0',
            payment_status: 'Success',
            course_type: 'SAT/ACT Practice Test'
          });

          // Reset selected items
          setSelectedTests([]);
          setSelectedDates([]);

          // Clear pending submission data
          setPendingSubmissionData(null);
        } else {
          throw new Error('Mock API submission failed');
        }
      } catch (mockError) {
        console.error('Error with mock API submission:', mockError);

        if (axios.isAxiosError(error)) {
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
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Failed to submit registration. Please try again later.',
            });
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
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
      'school'
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
        hasErrors = true;
      }
    });

    // Check test dates and amount
    if (formData.test_dates.length === 0) {
      newErrors.test_dates = true;
      hasErrors = true;
    }

    if (formData.test_types.length === 0 || !formData.amount || parseFloat(formData.amount) <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one test type and test date before proceeding.',
        variant: 'destructive',
      });
      return;
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

    // Create submission data object for multiple selections
    const submissionData = {
      // Fix field names to match /new_sat_act API expectations (like SatActCourseForm)
      parent_firstname: formData.parent_first_name,  // API expects 'parent_firstname'
      parent_lastname: formData.parent_last_name,    // API expects 'parent_lastname'
      parent_phone: formData.parent_phone,
      parent_email: formData.parent_email,
      student_firstname: formData.student_first_name, // API expects 'student_firstname'
      student_lastname: formData.student_last_name,   // API expects 'student_lastname'
      student_email: formData.student_email,
      school: formData.school,
      grade: 'High School', // Add grade field (required by some API endpoints)
      // Required package_name field for /new_sat_act API
      package_name: 'SAT/ACT Practice Test Package', // Required field for API validation
      packages: selectedTests.map(test => test.title).join(', '), // Add packages field as well
      // For practice tests, we need to send test type and date information
      test_type: formData.test_types.join(','), // Send as comma-separated string
      date: formData.test_dates.join(','), // Send dates as comma-separated string
      session_ids: formData.session_ids.join(','), // Send session IDs as comma-separated string
      test_time: '09:00:00',
      location: '510 West Boston Post Road',
      subtotal: parseInt(formData.amount, 10), // API expects 'subtotal' not 'amount'
      payment_status: formData.payment_status,
      course_type: formData.course_type,
      type: 'practice_test'
    };

    // Store submission data for after payment
    setPendingSubmissionData(submissionData);

    // Show payment modal
    setShowPaymentModal(true);
  };



  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-32 bg-gray-52">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              SAT/ACT Practice Test Registration
            </h1>

            {isSubmitted ? (
              <SuccessScreen
                serviceName="SAT/ACT Practice Test"
                onRegisterAnother={() => setIsSubmitted(false)}
                serviceType="sat_act_practice_test"
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section - Left Side */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Test Selection */}
                        <div className="space-y-4">
                          <h2 className="text-xl font-semibold text-college-blue-500">Test Selection</h2>

                          <div className="space-y-2">
                            <Label htmlFor="test_type">Select Test Type *</Label>
                            {isLoadingSessions ? (
                              <div className="flex items-center py-2">
                                <Loader2 className="h-4 w-4 animate-spin text-college-blue-500 mr-2" />
                                <span className="text-sm text-college-blue-500">Loading test options...</span>
                              </div>
                            ) : (
                              <Select
                                onValueChange={handleTestTypeChange}
                              >
                                <SelectTrigger id="test_type">
                                  <SelectValue placeholder="Select test type to add" />
                                </SelectTrigger>
                                <SelectContent>
                                  {sessions.length > 0 ? (
                                    // Render sessions from API
                                    sessions.map((session) => (
                                      <SelectItem key={session.id} value={session.id.toString()}>
                                        {session.title} - ${parseFloat(session.price_per_slot).toFixed(2)}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    // Show message when no sessions are available
                                    <SelectItem value="no-options" disabled>
                                      No test options available. Please try again later.
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                            )}
                          </div>

                          {/* Selected Tests Display */}
                          {selectedTests.length > 0 && (
                            <div className="space-y-2">
                              <Label>Selected Tests:</Label>
                              <div className="space-y-2">
                                {selectedTests.map((test) => (
                                  <div key={test.sessionId} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                                    <div>
                                      <p className="font-medium text-sm">{test.title}</p>
                                      <p className="text-sm text-gray-600">${test.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeTestType(test.sessionId)}
                                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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
                                if (errors.test_dates) {
                                  setErrors(prev => ({
                                    ...prev,
                                    test_dates: false
                                  }));
                                }
                              }}
                              required
                            >
                              <SelectTrigger
                                id="test_date"
                                className={errors.test_dates ? 'border-red-500' : ''}
                              >
                                <SelectValue placeholder="Select test date to add" />
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
                            {errors.test_dates && (
                              <p className="text-red-500 text-xs mt-1">Please select at least one test date</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">All tests are held at 510 West Boston Post Road</p>
                          </div>

                          {/* Selected Dates Display */}
                          {selectedDates.length > 0 && (
                            <div className="space-y-2">
                              <Label>Selected Dates:</Label>
                              <div className="space-y-2">
                                {selectedDates.map((date) => (
                                  <div key={date.key} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border">
                                    <div>
                                      <p className="font-medium text-sm">{date.display}</p>
                                      <p className="text-sm text-gray-600">at Zoffness College Prep</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeTestDate(date.key)}
                                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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
                      'Proceed to Payment'
                    )}
                  </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary Panel - Right Side */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-8">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-college-blue-500 mb-4">Registration Summary</h3>

                      {/* Selected Tests Summary */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Selected Tests</h4>
                          {selectedTests.length > 0 ? (
                            <div className="space-y-2">
                              {selectedTests.map((test) => (
                                <div key={test.sessionId} className="text-sm">
                                  <p className="font-medium">{test.title}</p>
                                  <p className="text-gray-600">${test.price.toFixed(2)}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No tests selected</p>
                          )}
                        </div>

                        {/* Selected Dates Summary */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Selected Dates</h4>
                          {selectedDates.length > 0 ? (
                            <div className="space-y-1">
                              {selectedDates.map((date) => (
                                <p key={date.key} className="text-sm text-gray-600">{date.display}</p>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No dates selected</p>
                          )}
                        </div>

                        {/* Total Summary */}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Total Tests:</span>
                            <span className="font-bold text-college-blue-500">{selectedTests.length}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Total Dates:</span>
                            <span className="font-bold text-college-blue-500">{selectedDates.length}</span>
                          </div>
                          <div className="flex justify-between items-center text-lg">
                            <span className="font-bold">Total Amount:</span>
                            <span className="font-bold text-college-blue-500">${parseFloat(formData.amount || '0').toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Registration Note */}
                        {selectedTests.length > 0 && selectedDates.length > 0 && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Note:</strong> You will be registered for {selectedTests.length} test type(s) across {selectedDates.length} date(s).
                              Each test-date combination will be scheduled separately.
                            </p>
                          </div>
                        )}

                        {/* Related SAT/ACT Services */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 shadow-sm">
                          <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Related SAT/ACT Services
                          </h4>
                          <div className="space-y-3">
                            <a
                              href="/forms/sat-act-diagnostic"
                              className="group flex items-start p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                                <span className="text-lg">🔍</span>
                              </div>
                              <div>
                                <div className="font-medium text-blue-900 group-hover:text-blue-700 transition-colors">
                                  SAT/ACT Diagnostic Test
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  Determine which test is the best fit
                                </div>
                              </div>
                            </a>
                            <a
                              href="/forms/sat-act-course"
                              className="group flex items-start p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                                <span className="text-lg">📚</span>
                              </div>
                              <div>
                                <div className="font-medium text-blue-900 group-hover:text-blue-700 transition-colors">
                                  SAT/ACT Course Registration
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  Comprehensive test preparation
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={parseFloat(formData.amount)}
        description={`SAT/ACT Practice Test - ${selectedTests.length} test(s) selected`}
        metadata={{
          form_type: 'practice_test',
          session_ids: formData.session_ids.join(','),
          student_name: `${formData.student_first_name} ${formData.student_last_name}`,
          parent_email: formData.parent_email,
          test_dates: formData.test_dates.join(','),
          test_count: selectedTests.length,
          date_count: selectedDates.length
        }}
      />
    </div>
  );
};

export default SatActPracticeTestForm;
