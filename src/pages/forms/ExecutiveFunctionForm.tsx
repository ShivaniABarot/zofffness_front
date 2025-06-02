import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
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

const ExecutiveFunctionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingSubmissionData, setPendingSubmissionData] = useState<any>(null);
  const { toast } = useToast();

  // Fallback package prices in case API fails
  const fallbackPackagePrices = {
    'five-sessions': 450,
    'individual': 90
  };

  const [formData, setFormData] = useState({
    parent_first_name: '',
    parent_last_name: '',
    parent_phone: '',
    parent_email: '',
    student_first_name: '',
    student_last_name: '',
    student_email: '',
    school: '',
    package_name: '',
    amount: 0,
    payment_status: 'Pending',
    course_type: 'Executive Function Coaching'
  });

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoadingPackages(true);
      try {
        const response = await axios.get('https://zoffness.academy/api/get_ExecutivePackage');

        // Log the API response for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log('API Response:', response.data);
        }

        if (response.data.success && Array.isArray(response.data.data)) {
          setPackages(response.data.data);

          if (response.data.data.length === 0) {
            console.error('No packages returned from API');
            toast({
              title: 'Warning',
              description: 'Could not load package options from server. Using default options.',
              variant: 'destructive',
            });
          }
        } else {
          console.error('Failed to fetch packages or invalid data format');
          // Fall back to mock API
          await useMockPackages();
        }
      } catch (error) {
        console.error('Error fetching packages:', error);

        // Log more detailed information about the response
        if (axios.isAxiosError(error)) {
          console.error('API Error Response:', error.response?.data);
          console.error('API Error Status:', error.response?.status);
        }

        // Fall back to mock API
        await useMockPackages();
      } finally {
        setIsLoadingPackages(false);
      }
    };

    const useMockPackages = async () => {
      try {
        console.log('Using mock packages for Executive Function');
        // Create mock packages for Executive Function
        const mockPackages: Package[] = [
          {
            id: 1,
            name: "Five individual 30-minute sessions package",
            price: 450,
            description: "Comprehensive package of five personalized sessions"
          },
          {
            id: 2,
            name: "Individualized 30 minute sessions",
            price: 90,
            description: "Single personalized session"
          }
        ];

        setPackages(mockPackages);
        toast({
          title: 'Demo Mode',
          description: 'Using demo package options. Real API not available.',
        });
      } catch (mockError) {
        console.error('Error with mock packages:', mockError);
        toast({
          title: 'Error',
          description: 'Could not load package options. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    fetchPackages();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePackageChange = (value: string) => {
    // Find the selected package from the packages array
    const selectedPackage = packages.find(pkg => pkg.id.toString() === value);

    // If package is found, update the form data with its price
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        package_name: value,
        amount: selectedPackage.price
      }));
    } else {
      // Fallback to default if package not found
      console.warn(`Package with ID ${value} not found`);

      // Check if it's one of our fallback packages
      if (value === 'five-sessions' || value === 'individual') {
        setFormData(prev => ({
          ...prev,
          package_name: value,
          amount: fallbackPackagePrices[value as keyof typeof fallbackPackagePrices]
        }));
      } else {
        // Use the first fallback package as default
        setFormData(prev => ({
          ...prev,
          package_name: 'five-sessions',
          amount: fallbackPackagePrices['five-sessions']
        }));
      }
    }
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
    setValidationErrors({});

    try {
      // Log the data being sent for debugging
      console.log('Submitting data to /executive_coaching API:', submissionData);

      // Try form data format like the diagnostic form
      const formData = new FormData();
      Object.keys(submissionData).forEach(key => {
        formData.append(key, submissionData[key].toString());
      });

      // Try to submit to real API first
      const response = await axios.post('https://zoffness.academy/api/executive_coaching', formData, {
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
          package_name: '',
          amount: 0,
          payment_status: 'Pending',
          course_type: 'Executive Function Coaching'
        });

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

      // Fall back to mock API
      try {
        console.log('Using mock API for form submission');
        const mockResponse = await mockApiService.submitForm('executive_coaching', submissionData);

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
            package_name: '',
            amount: 0,
            payment_status: 'Pending',
            course_type: 'Executive Function Coaching'
          });

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
            const apiErrors = error.response.data.errors || {};
            const formattedErrors: Record<string, string> = {};
            const errorMessages = [];

            for (const field in apiErrors) {
              const messages = apiErrors[field];
              const formattedMessage = Array.isArray(messages) ? messages[0] : messages;
              formattedErrors[field] = formattedMessage;
              errorMessages.push(`${field.replace(/_/g, ' ')}: ${formattedMessage}`);
            }

            setValidationErrors(formattedErrors);

            const errorMessage = errorMessages.length > 0
              ? 'Please correct the following errors:\n' + errorMessages.join('\n')
              : 'Please check your form inputs and try again.';

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

    // Validate required fields
    if (!formData.package_name || formData.amount <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select a package before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    // Create a submission object with the field names expected by the API
    const submissionData = {
      parent_first_name: formData.parent_first_name,
      parent_last_name: formData.parent_last_name,
      parent_phone: formData.parent_phone,
      parent_email: formData.parent_email,
      student_first_name: formData.student_first_name,
      student_last_name: formData.student_last_name,
      student_email: formData.student_email,
      school: formData.school,
      package_type: formData.package_name,
      subtotal: formData.amount,
      payment_status: formData.payment_status,
      course_type: formData.course_type,
      type: 'executive_function'
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
              Executive Function Coaching Registration
            </h1>

            {isSubmitted ? (
              <SuccessScreen
                serviceName="Executive Function Coaching"
                onRegisterAnother={() => setIsSubmitted(false)}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section - Left Side */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Validation Errors */}
                    {Object.keys(validationErrors).length > 0 && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Validation Error</strong>
                        <span className="block sm:inline">
                          {Object.entries(validationErrors).map(([field, message]) => (
                            <div key={field}>{field.replace(/_/g, ' ')}: {message}</div>
                          ))}
                        </span>
                      </div>
                    )}
                  {/* Description */}
                  <div className="space-y-4">
                    <div className="prose max-w-none">
                      <p className="text-gray-700">
                        Work with our dedicated Executive Function specialist, Kelsey Berg, to develop lifelong thinking and learning skills - cultivating abilities, attitudes, and knowledge to identify and regulate emotions, pursue positive studying practices, and make responsible decisions through personalized lesson plans.
                      </p>
                    </div>
                  </div>

                  {/* Package Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Executive Function Coaching Packages*</h2>

                    {isLoadingPackages ? (
                      <div className="flex items-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin text-college-blue-500 mr-2" />
                        <span className="text-sm text-college-blue-500">Loading package options...</span>
                      </div>
                    ) : packages.length > 0 ? (
                      <RadioGroup
                        onValueChange={handlePackageChange}
                        value={formData.package_name}
                      >
                        {packages.map(pkg => (
                          <div className="border rounded-lg p-4 mb-4 hover:border-college-blue-300 transition-colors" key={pkg.id}>
                            <div className="flex items-start">
                              <RadioGroupItem value={pkg.id.toString()} id={`package-${pkg.id}`} className="mt-1" />
                              <div className="ml-3">
                                <Label htmlFor={`package-${pkg.id}`} className="font-medium">
                                  {pkg.name} - ${pkg.price}
                                </Label>
                                {pkg.description && (
                                  <p className="text-gray-700 text-sm mt-1">{pkg.description}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      // Fallback to hardcoded packages if API fails
                      <RadioGroup onValueChange={handlePackageChange}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="five-sessions" id="five-sessions" />
                          <Label htmlFor="five-sessions">Five individual 30-minute sessions package - $450</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="individual" id="individual" />
                          <Label htmlFor="individual">Individualized 30 minute sessions - $90</Label>
                        </div>
                      </RadioGroup>
                    )}
                  </div>

                  {/* Critical Skills */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Critical Executive Function Skills</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-2">The critical Executive Function skills we will cover are as follows:</p>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Planning/prioritizing (with an understanding of "important" vs. "urgent")</li>
                        <li>Organization</li>
                        <li>Time Management</li>
                        <li>Task initiation</li>
                        <li>Working memory</li>
                        <li>Self-monitoring (metacognition)</li>
                        <li>Flexibility</li>
                        <li>Impulse Control</li>
                        <li>Emotional Control</li>
                      </ul>
                    </div>
                  </div>

                  {/* Group vs Private */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Group vs Private Sessions</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-2">Brief Overview of Group vs Private Session:</p>
                      <p className="text-gray-700">
                        Group EF classes are a place for students to practice strengthening these essential cognitive skills in an interactive and engaging way - giving a broad overview of their applications and benefits in the student's daily life. Whereas private sessions are an opportunity to delve deeper into how to apply these essential skills to achieve specific goals both in the classroom and beyond - this personalized approach is carefully tailored to the individual student's learning preferences and academic goals.
                      </p>
                      <p className="text-gray-700 mt-2">
                        All lessons, whether they be Group or 1:1, are accompanied by 'take-home tools' to help the student initiate the use of these cognitive functions into their daily routine and continue to practice honing them outside of the classroom.
                      </p>
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
                      <Label htmlFor="school">Current School *</Label>
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
                          {formData.package_name ? (
                            <div className="space-y-2">
                              <div className="text-sm">
                                <p className="font-medium">
                                  {packages.find(p => p.id.toString() === formData.package_name)?.name ||
                                   (formData.package_name === 'five-sessions' ? 'Five individual 30-minute sessions package' :
                                    formData.package_name === 'individual' ? 'Individualized 30 minute sessions' : 'Package')}
                                </p>
                                <p className="text-gray-600">${formData.amount.toLocaleString()}</p>
                                {packages.find(p => p.id.toString() === formData.package_name)?.description && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {packages.find(p => p.id.toString() === formData.package_name)?.description}
                                  </p>
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
                            <span className="font-bold text-college-blue-500">{formData.package_name ? 1 : 0}</span>
                          </div>
                          <div className="flex justify-between items-center text-lg">
                            <span className="font-bold">Total Amount:</span>
                            <span className="font-bold text-college-blue-500">${formData.amount.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Registration Note */}
                        {formData.package_name && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Note:</strong> You will be registered for Executive Function Coaching.
                              Work with our dedicated specialist to develop lifelong thinking and learning skills.
                            </p>
                          </div>
                        )}

                        {/* Package Details */}
                        {formData.package_name && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600">
                              <strong>What's included:</strong> Personalized lesson plans, cognitive skills development,
                              emotional regulation training, and take-home tools for daily practice.
                            </p>
                          </div>
                        )}

                        {/* Other Services */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-3">We Also Provide Other Services</h4>
                          <div className="space-y-2">
                            <a
                              href="/forms/sat-act-diagnostic"
                              className="block text-sm text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                            >
                              🔍 SAT/ACT Diagnostic Test - Determine which test is the best fit
                            </a>
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
        amount={formData.amount}
        description={`Executive Function Coaching - ${packages.find(p => p.id.toString() === formData.package_name)?.name || 'Package'}`}
        metadata={{
          form_type: 'executive_function',
          package_id: formData.package_name,
          student_name: `${formData.student_first_name} ${formData.student_last_name}`,
          parent_email: formData.parent_email
        }}
      />
    </div>
  );
};

export default ExecutiveFunctionForm;