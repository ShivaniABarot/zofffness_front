import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
import axios from 'axios';
import SuccessScreen from '../../components/SuccessScreen';
import PaymentModal from '../../components/PaymentModal';
import { mockApiService } from '../../services/mockApiService';

// Define interface for package data
interface Package {
  id: number;
  name: string;
  price: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
  pivot?: {
    form_id: number;
    package_id: number;
  };
}

const SatActCourseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingSubmissionData, setPendingSubmissionData] = useState<any>(null);
  const { toast } = useToast();

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoadingPackages(true);
      try {
        const response = await axios.get('https://zoffness.academy/api/get_sat_act_packages');

        // Log the API response for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log('API Response:', response.data);
        }

        if (response.data.success && Array.isArray(response.data.data)) {
          // Convert price strings to numbers to ensure proper calculation
          const packagesWithNumericPrices = response.data.data.map((pkg: any) => ({
            ...pkg,
            price: typeof pkg.price === 'string' ? parseFloat(pkg.price) : pkg.price
          }));
          setPackages(packagesWithNumericPrices);

          // No longer setting a default package
          // We want users to explicitly select a package
        } else {
          console.error('Failed to fetch packages or invalid data format');
          toast({
            title: 'Warning',
            description: 'Could not load package options from server. Using default options.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching packages:', error);

        // Log more detailed information about the response
        if (axios.isAxiosError(error)) {
          console.error('API Error Response:', error.response?.data);
          console.error('API Error Status:', error.response?.status);
        }

        toast({
          title: 'Warning',
          description: 'Could not load package options from server. Using default options.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingPackages(false);
      }
    };

    fetchPackages();
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
    grade: '',
    packages: [] as string[],
    total_amount: 0,
    payment_status: 'Pending',
    course_type: 'SAT/ACT Course'
  });

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
    const packageToSelect = packages.find(pkg => pkg.id.toString() === packageId);
    if (!packageToSelect) return;

    // Set the selected package
    setSelectedPackage(packageToSelect);

    setFormData(prev => ({
      ...prev,
      packages: [packageToSelect.name],
      total_amount: packageToSelect.price
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
      console.log('Submitting data to /new_sat_act API:', submissionData);

      // Try form data format like the diagnostic form
      const formData = new FormData();
      Object.keys(submissionData).forEach(key => {
        formData.append(key, submissionData[key].toString());
      });

      const response = await axios.post('https://zoffness.academy/api/new_sat_act', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      if (response.data.success ||
          (response.data.message && response.data.message.includes('successfully')) ||
          response.data.status === 'success') {
        // Show success message
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
          grade: '',
          packages: [],
          total_amount: 0,
          payment_status: 'Pending',
          course_type: 'SAT/ACT Course'
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

      // Log the specific error details for SAT/ACT Course
      if (axios.isAxiosError(error) && error.response) {
        console.error('SAT/ACT Course API Error Status:', error.response.status);
        console.error('SAT/ACT Course API Error Data:', error.response.data);
        console.error('SAT/ACT Course Validation Errors:', error.response.data.errors);

        // Also log each validation error individually
        if (error.response.data.errors) {
          Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            console.error(`SAT/ACT Course Validation Error for ${field}:`, messages);
          });
        }
      }

      // Fall back to mock API
      try {
        console.log('Using mock API for form submission');
        const mockResponse = await mockApiService.submitForm('sat_act_course', submissionData);

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
            grade: '',
            packages: [],
            total_amount: 0,
            payment_status: 'Pending',
            course_type: 'SAT/ACT Course'
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
      }

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          // Handle validation errors
          const validationErrors = error.response.data.errors || {};

          // Create a more readable error message
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

    // Get amount and package name from selected package
    const amount = formData.total_amount;
    const packageName = selectedPackage.name;

    // Create a new submission object with the field names expected by the API
    const submissionData = {
      // Fix field names based on validation errors
      parent_firstname: formData.parent_first_name,  // API expects 'parent_firstname'
      parent_lastname: formData.parent_last_name,    // API expects 'parent_lastname'
      parent_phone: formData.parent_phone,
      parent_email: formData.parent_email,
      student_firstname: formData.student_first_name, // API expects 'student_firstname'
      student_lastname: formData.student_last_name,   // API expects 'student_lastname'
      student_email: formData.student_email,
      school: formData.school,
      grade: formData.grade,
      package_name: packageName || 'SAT/ACT Course Package',  // Ensure package_name is never empty
      packages: formData.packages.join(', '), // Add packages field as well
      subtotal: amount,
      payment_status: formData.payment_status,
      course_type: formData.course_type,
      type: 'sat_act_course'
    };

    // Store submission data for after payment
    setPendingSubmissionData(submissionData);

    // Show payment modal
    setShowPaymentModal(true);
  };

  // Payment-related functions have been removed

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-32 bg-gray-52">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              SAT/ACT Course Registration
            </h1>

            {isSubmitted ? (
              <SuccessScreen
                serviceName="SAT/ACT Course"
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

                    <div className="mb-4">
                      <p className="text-gray-700">Individualized SAT/ACT Instruction (In Person or Remote)</p>
                      <p className="text-sm text-gray-600 mt-2">We believe that all students have the ability to reach their full academic potential, as success is found where preparation meets opportunity. A student's motivation is fueled by defined goals, a structured approach, noticeable progress, and a high level of achievement. The individualized attention that we provide to our clients fosters trust, strong relationships, and a collaborative effort.</p>
                      <p className="text-sm text-gray-600 mt-2">$295/hour per session - Work with a highly qualified and dedicated SAT/ACT instructor who can provide a personalized approach to each student's specific needs. Please choose from the following packages:</p>
                      <p className="text-sm font-semibold text-college-blue-500 mt-2">ACT/SAT Courses</p>
                    </div>

                        {isLoadingPackages ? (
                          <div className="flex items-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin text-college-blue-500 mr-2" />
                            <span className="text-sm text-college-blue-500">Loading package options...</span>
                          </div>
                        ) : packages.length > 0 ? (
                          <div className="space-y-4">
                            <Label>Select Course Package *</Label>
                            <div className="space-y-3">
                              {packages.map(pkg => (
                                <div key={pkg.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:border-college-blue-300 transition-colors">
                                  <input
                                    type="radio"
                                    id={pkg.id.toString()}
                                    name="course_package"
                                    checked={selectedPackage?.id === pkg.id}
                                    onChange={() => handlePackageChange(pkg.id.toString())}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor={pkg.id.toString()} className="text-base font-medium cursor-pointer">
                                      {pkg.name} - ${pkg.price.toLocaleString()}
                                    </Label>
                                    {pkg.description && (
                                      <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          // Fallback to hardcoded packages if API fails
                          <div className="space-y-4">
                            <Label>Select Course Package(s) *</Label>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-college-blue-300 transition-colors">
                                <Checkbox id="20sessions" />
                                <Label htmlFor="20sessions" className="text-base font-medium cursor-pointer">
                                  20 session package - $5,900
                                </Label>
                              </div>
                              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-college-blue-300 transition-colors">
                                <Checkbox id="15sessions" />
                                <Label htmlFor="15sessions" className="text-base font-medium cursor-pointer">
                                  15 session package - $4,425
                                </Label>
                              </div>
                              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-college-blue-300 transition-colors">
                                <Checkbox id="10sessions" />
                                <Label htmlFor="10sessions" className="text-base font-medium cursor-pointer">
                                  10 session package - $2,950
                                </Label>
                              </div>
                              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-college-blue-300 transition-colors">
                                <Checkbox id="5sessions" />
                                <Label htmlFor="5sessions" className="text-base font-medium cursor-pointer">
                                  5 session package - $1,475
                                </Label>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Selected Package Display */}
                        {selectedPackage && (
                          <div className="space-y-2 mt-4">
                            <Label>Selected Package:</Label>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                                <div>
                                  <p className="font-medium text-sm">{selectedPackage.name}</p>
                                  <p className="text-sm text-gray-600">${selectedPackage.price.toLocaleString()}</p>
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
                        <Label htmlFor="parent_first_name">Parent First Name *</Label>
                        <Input
                          id="parent_first_name"
                          value={formData.parent_first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parent_last_name">Parent Last Name *</Label>
                        <Input
                          id="parent_last_name"
                          value={formData.parent_last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parent_phone">Parent Phone *</Label>
                      <Input
                        id="parent_phone"
                        type="tel"
                        value={formData.parent_phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parent_email">Parent Email *</Label>
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
                        <Label htmlFor="student_first_name">Student First Name *</Label>
                        <Input
                          id="student_first_name"
                          value={formData.student_first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student_last_name">Student Last Name *</Label>
                        <Input
                          id="student_last_name"
                          value={formData.student_last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student_email">Student Email *</Label>
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

                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade *</Label>
                      <Input
                        id="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        placeholder="e.g., 9th, 10th, 11th, 12th"
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
                                <p className="text-gray-600">${selectedPackage.price.toLocaleString()}</p>
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
                            <span className="font-bold text-college-blue-500">${formData.total_amount.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Registration Note */}
                        {selectedPackage && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Note:</strong> You will be registered for 1 course package.
                              Each session is $295/hour with a highly qualified SAT/ACT instructor.
                            </p>
                          </div>
                        )}

                        {/* Course Details */}
                        {selectedPackage && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600">
                              <strong>What's included:</strong> Individualized SAT/ACT instruction (in-person or remote),
                              personalized approach to each student's specific needs, structured learning plan, and progress tracking.
                            </p>
                          </div>
                        )}
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
        description={`SAT/ACT Course - ${selectedPackage ? '1 package' : '0 packages'} selected`}
        metadata={{
          form_type: 'sat_act_course',
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

export default SatActCourseForm;