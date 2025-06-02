import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

import { Loader2 } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import axios from 'axios';
import SuccessScreen from '../../components/SuccessScreen';
import PaymentModal from '../../components/PaymentModal';
import { mockApiService } from '../../services/mockApiService';

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

// Define interface for package data
interface Package {
  id: string;
  name: string;
  price: number;
  description?: string;
}

const SatActDiagnosticForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
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
          // Filter sessions to only include diagnostic-related ones
          const diagnosticSessions = response.data.data.filter((session: Session) =>
            session.title &&
            typeof session.title === 'string' &&
            session.title.toLowerCase().includes('diagnostic')
          );
          setSessions(diagnosticSessions);
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
      }
    };

    const useMockSessions = async () => {
      try {
        console.log('Using mock API for sessions');
        const mockResponse = await mockApiService.getSessions('diagnostic');

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

  const [formData, setFormData] = useState({
    parent_first_name: '',
    parent_last_name: '',
    parent_phone: '',
    parent_email: '',
    student_first_name: '',
    student_last_name: '',
    student_email: '',
    school: '',
    packages: [] as string[],
    session_id: '',
    total_amount: 0,
    payment_status: 'Pending'
  });

  // Available packages for diagnostic tests
  const availablePackages: Package[] = [
    {
      id: 'sat_diagnostic',
      name: 'SAT Diagnostic Test',
      price: 150,
      description: 'Complete SAT diagnostic test with detailed analysis'
    },
    {
      id: 'act_diagnostic',
      name: 'ACT Diagnostic Test',
      price: 150,
      description: 'Complete ACT diagnostic test with detailed analysis'
    }
  ];

  // State for selected package (single selection)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle package selection (single selection)
  const handlePackageChange = (packageId: string) => {
    const packageToSelect = availablePackages.find(pkg => pkg.id === packageId);
    if (!packageToSelect) return;

    // Set the selected package
    setSelectedPackage(packageToSelect);

    setFormData(prev => ({
      ...prev,
      packages: [packageToSelect.name],
      total_amount: packageToSelect.price + (formData.session_id ? parseFloat(sessions.find(s => s.id.toString() === formData.session_id)?.price_per_slot || '0') : 0)
    }));
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
      console.log('Submitting data to /enroll API:', submissionData);

      // Try to submit to real API first - try form data format
      const formData = new FormData();
      Object.keys(submissionData).forEach(key => {
        formData.append(key, submissionData[key].toString());
      });

      const response = await axios.post('https://zoffness.academy/api/enroll', formData, {
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
          packages: [],
          session_id: '',
          total_amount: 0,
          payment_status: 'Pending'
        });

        // Reset selected package
        setSelectedPackage(null);

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
      console.error('Error submitting to real API:', error);

      // Log the specific error details
      if (axios.isAxiosError(error) && error.response) {
        console.error('API Error Status:', error.response.status);
        console.error('API Error Data:', error.response.data);
        console.error('Validation Errors:', error.response.data.errors);
        console.error('API Error Headers:', error.response.headers);

        // Also log each validation error individually
        if (error.response.data.errors) {
          Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            console.error(`Validation Error for ${field}:`, messages);
          });
        }
      }

      // Fall back to mock API
      try {
        console.log('Using mock API for form submission');
        const mockResponse = await mockApiService.submitForm('diagnostic_tests', submissionData);

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
            packages: [],
            session_id: '',
            total_amount: 0,
            payment_status: 'Pending'
          });

          // Reset selected package
          setSelectedPackage(null);

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

            console.log('Validation errors from API:', validationErrors);

            for (const field in validationErrors) {
              const messages = validationErrors[field];
              if (Array.isArray(messages)) {
                errorMessages.push(`${field}: ${messages.join(', ')}`);
              } else {
                errorMessages.push(`${field}: ${messages}`);
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
            console.log('API Error Response:', error.response?.data);
            toast({
              variant: 'destructive',
              title: `Error (${error.response?.status || 'Unknown'})`,
              description: error.response?.data?.message || 'Failed to submit registration. Please try again later.',
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

    // Validate required fields
    if (!selectedPackage || formData.total_amount <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select a package before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    // Create submission data object for /enroll API
    const submissionData = {
      // Fix field names to match API expectations
      parent_firstname: formData.parent_first_name,  // API expects 'parent_firstname'
      parent_lastname: formData.parent_last_name,    // API expects 'parent_lastname'
      parent_phone: formData.parent_phone,
      parent_email: formData.parent_email,
      student_firstname: formData.student_first_name, // API expects 'student_firstname'
      student_lastname: formData.student_last_name,   // API expects 'student_lastname'
      student_email: formData.student_email,
      school: formData.school,
      session_id: formData.session_id || '',
      // Fix the field names based on validation errors
      total_amount: parseInt(formData.total_amount.toString(), 10), // API expects 'total_amount' not 'amount'
      packages: formData.packages.join(', '), // API expects 'packages' field
      payment_status: formData.payment_status,
      course_type: 'SAT/ACT Diagnostic Test'
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
              SAT/ACT Diagnostic Test Registration
            </h1>

            {isSubmitted ? (
              <SuccessScreen
                serviceName="SAT/ACT Diagnostic Test"
                onRegisterAnother={() => setIsSubmitted(false)}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section - Left Side */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Package Selection */}
                        <div className="space-y-4">
                          <h2 className="text-xl font-semibold text-college-blue-500">Package Selection</h2>

                          <div className="mb-6">
                            <p className="text-gray-700">Complete two full-length proctored diagnostic tests to determine which test is the best fit. Our software provides comprehensive online analysis with statistical data and insights into strengths and weaknesses.</p>
                            <p className="text-sm text-gray-600 mt-2">Scores will be scaled and results analyzed to assess which test may be the better fit for each student. This essential first step allows students to become familiar with both tests and gain a decisive advantage before test prep begins.</p>
                          </div>

                          <div className="space-y-4">
                            <Label>Select Diagnostic Test Package *</Label>
                            <div className="space-y-3">
                              {availablePackages.map((pkg) => (
                                <div key={pkg.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:border-college-blue-300 transition-colors">
                                  <input
                                    type="radio"
                                    id={pkg.id}
                                    name="diagnostic_package"
                                    checked={selectedPackage?.id === pkg.id}
                                    onChange={() => handlePackageChange(pkg.id)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor={pkg.id} className="text-base font-medium cursor-pointer">
                                      {pkg.name} - ${pkg.price.toFixed(2)}
                                    </Label>
                                    {pkg.description && (
                                      <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Selected Package Display */}
                          {selectedPackage && (
                            <div className="space-y-2">
                              <Label>Selected Package:</Label>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                                  <div>
                                    <p className="font-medium text-sm">{selectedPackage.name}</p>
                                    <p className="text-sm text-gray-600">${selectedPackage.price.toFixed(2)}</p>
                                    {selectedPackage.description && (
                                      <p className="text-xs text-gray-500 mt-1">{selectedPackage.description}</p>
                                    )}
                                  </div>
                                  <span className="text-green-600 text-sm font-medium">Selected</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                  {/* Parent Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Parent Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentFirstName">Parent First Name *</Label>
                        <Input
                          id="parent_first_name"
                          value={formData.parent_first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parentLastName">Parent Last Name *</Label>
                        <Input
                          id="parent_last_name"
                          value={formData.parent_last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Parent Phone *</Label>
                      <Input
                        id="parent_phone"
                        type="tel"
                        value={formData.parent_phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">Parent Email *</Label>
                      <Input
                        id="parent_email"
                        type="email"
                        value={formData.parent_email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Student Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Student Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentFirstName">Student First Name *</Label>
                        <Input
                          id="student_first_name"
                          value={formData.student_first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studentLastName">Student Last Name *</Label>
                        <Input
                          id="student_last_name"
                          value={formData.student_last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentEmail">Student Email *</Label>
                      <Input
                        id="student_email"
                        type="email"
                        value={formData.student_email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school">School *</Label>
                      <Input
                        id="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        required
                      />
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

                      {/* Selected Package Summary */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Selected Package</h4>
                          {selectedPackage ? (
                            <div className="space-y-2">
                              <div className="text-sm">
                                <p className="font-medium">{selectedPackage.name}</p>
                                <p className="text-gray-600">${selectedPackage.price.toFixed(2)}</p>
                                {selectedPackage.description && (
                                  <p className="text-xs text-gray-500 mt-1">{selectedPackage.description}</p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No package selected</p>
                          )}
                        </div>

                        {/* Total Summary */}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Total Packages:</span>
                            <span className="font-bold text-college-blue-500">{selectedPackage ? 1 : 0}</span>
                          </div>
                          <div className="flex justify-between items-center text-lg">
                            <span className="font-bold">Total Amount:</span>
                            <span className="font-bold text-college-blue-500">${formData.total_amount.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Registration Note */}
                        {selectedPackage && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Note:</strong> You will be registered for 1 diagnostic package.
                              Each provides comprehensive analysis to help determine the best test fit.
                            </p>
                          </div>
                        )}

                        {/* Package Details */}
                        {selectedPackage && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600">
                              <strong>What's included:</strong> Full-length proctored diagnostic tests, comprehensive online analysis,
                              statistical data insights, strengths and weaknesses assessment, and scaled score results.
                            </p>
                          </div>
                        )}

                        {/* Other Services */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-3">We Also Provide Other Services</h4>
                          <div className="space-y-2">
                            <a
                              href="/forms/sat-act-course"
                              className="block text-sm text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                            >
                              📚 SAT/ACT Course Registration - Comprehensive test preparation
                            </a>
                            <a
                              href="/forms/sat-act-practice-test"
                              className="block text-sm text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                            >
                              📝 SAT/ACT Practice Test Registration - Practice with real test conditions
                            </a>
                            <a
                              href="/forms/executive-function"
                              className="block text-sm text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                            >
                              🧠 Executive Function Coaching - Develop thinking and learning skills
                            </a>
                            <a
                              href="/forms/college-admissions"
                              className="block text-sm text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                            >
                              🎓 College Admissions Counseling - Professional guidance for college applications
                            </a>
                            <a
                              href="/forms/college-essays"
                              className="block text-sm text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                            >
                              ✍️ College Essays Service - Personalized essay writing guidance
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
        amount={formData.total_amount}
        description={`SAT/ACT Diagnostic Test - ${selectedPackage ? '1 package' : '0 packages'} selected`}
        metadata={{
          form_type: 'diagnostic_test',
          package_names: selectedPackage ? selectedPackage.name : '',
          student_name: `${formData.student_first_name} ${formData.student_last_name}`,
          parent_email: formData.parent_email,
          package_count: selectedPackage ? 1 : 0,
          total_packages: selectedPackage ? 1 : 0
        }}
      />
    </div>
  );
};

export default SatActDiagnosticForm;