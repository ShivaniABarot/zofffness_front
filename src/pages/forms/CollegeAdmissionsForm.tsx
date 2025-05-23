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
  price: string;
  number_of_sessions: number;
  description: string;
  created_at: string;
  updated_at: string;
}

const CollegeAdmissionsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingSubmissionData, setPendingSubmissionData] = useState<any>(null);
  const { toast } = useToast();

  // Fallback package prices (used if API fails)
  const packagePrices = {
    'initial': 250,
    'five': 1250,
    'ten': 2500,
    'fifteen': 3750,
    'twenty': 5000
  };

  // Fallback package name mapping (used if API fails)
  const packageNames = {
    'initial': 'Initial Intake',
    'five': 'Five Session Package',
    'ten': 'Ten Session Package',
    'fifteen': 'Fifteen Session Package',
    'twenty': 'Twenty Session Package'
  };

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://zoffness.academy/api/get_packages');
        if (response.data.success && Array.isArray(response.data.data)) {
          setPackages(response.data.data);
        } else {
          console.error('Failed to fetch packages or invalid data format');
          toast({
            title: 'Warning',
            description: 'Could not load packages from server. Using default packages.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast({
          title: 'Warning',
          description: 'Could not load packages from server. Using default packages.',
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
    graduation_year: '',
    package_id: '',
    package_name: 'initial',
    amount: packagePrices['initial'],
    payment_status: 'Pending',
    course_type: 'College Admissions Counseling'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePackageChange = (value: string) => {
    // Check if the value is a package ID from the API
    const selectedPackage = packages.find(pkg => pkg.id.toString() === value);

    if (selectedPackage) {
      // If it's a package from the API
      setFormData(prev => ({
        ...prev,
        package_id: selectedPackage.id.toString(),
        package_name: selectedPackage.name,
        amount: parseFloat(selectedPackage.price)
      }));
    } else {
      // Fallback to hardcoded packages if API packages aren't available
      const price = packagePrices[value as keyof typeof packagePrices] || 250;
      const name = packageNames[value as keyof typeof packageNames] || 'Initial Intake';

      setFormData(prev => ({
        ...prev,
        package_id: '',
        package_name: value,
        amount: price
      }));
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
      console.log('Submitting data to /college_admission API:', submissionData);

      // Try form data format like the diagnostic form
      const formData = new FormData();
      Object.keys(submissionData).forEach(key => {
        formData.append(key, submissionData[key].toString());
      });

      // Try to submit to real API first
      const response = await axios.post('https://zoffness.academy/api/college_admission', formData, {
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
          graduation_year: '',
          package_id: '',
          package_name: 'initial',
          amount: packagePrices['initial'],
          payment_status: 'Pending',
          course_type: 'College Admissions Counseling'
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

      // Log the specific error details for College Admissions
      if (axios.isAxiosError(error) && error.response) {
        console.error('College Admissions API Error Status:', error.response.status);
        console.error('College Admissions API Error Data:', error.response.data);
        console.error('College Admissions Validation Errors:', error.response.data.errors);

        // Also log each validation error individually
        if (error.response.data.errors) {
          Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            console.error(`College Admissions Validation Error for ${field}:`, messages);
          });
        }
      }

      // Fall back to mock API
      try {
        console.log('Using mock API for form submission');
        const mockResponse = await mockApiService.submitForm('college_admission', submissionData);

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
            graduation_year: '',
            package_id: '',
            package_name: 'initial',
            amount: packagePrices['initial'],
            payment_status: 'Pending',
            course_type: 'College Admissions Counseling'
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
      // College Admissions API expects original field names (like Practice Test API)
      parent_first_name: formData.parent_first_name,
      parent_last_name: formData.parent_last_name,
      parent_phone: formData.parent_phone,
      parent_email: formData.parent_email,
      student_first_name: formData.student_first_name,
      student_last_name: formData.student_last_name,
      student_email: formData.student_email,
      school: formData.school,
      graduation_year: formData.graduation_year,
      package_id: formData.package_id,
      package_type: formData.package_name,
      subtotal: formData.amount,
      payment_status: formData.payment_status,
      course_type: formData.course_type,
      type: 'college_admission'
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
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              College Admissions Counseling Registration
            </h1>

            {isSubmitted ? (
              <SuccessScreen
                serviceName="College Admissions Counseling"
                onRegisterAnother={() => setIsSubmitted(false)}
              />
            ) : (
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
                  {/* Package Selection */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-college-blue-500">COLLEGE ADMISSIONS COUNSELING PACKAGES</h2>

                    {isLoadingPackages ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-college-blue-500" />
                        <span className="ml-2 text-college-blue-500">Loading packages...</span>
                      </div>
                    ) : (
                      <RadioGroup
                        onValueChange={handlePackageChange}
                      >
                        {packages.length > 0 ? (
                          // Render packages from API
                          packages.map((pkg) => (
                            <div key={pkg.id} className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value={pkg.id.toString()} id={`package-${pkg.id}`} className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor={`package-${pkg.id}`} className="font-semibold text-lg">
                                    {pkg.name} - ${parseFloat(pkg.price).toFixed(2)}
                                  </Label>
                                  {pkg.number_of_sessions > 0 && (
                                    <p className="text-sm text-gray-700 mt-1">
                                      {pkg.number_of_sessions} {pkg.number_of_sessions === 1 ? 'session' : 'sessions'}
                                    </p>
                                  )}
                                  {pkg.description && (
                                    <div className="mt-2">
                                      <div className="text-sm text-gray-700 mt-2 space-y-1"
                                        dangerouslySetInnerHTML={{ __html: pkg.description }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          // Fallback to hardcoded packages if API fails
                          <>
                            {/* Initial Intake Package */}
                            <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="initial" id="initial" className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor="initial" className="font-semibold text-lg">INITIAL INTAKE - ${packagePrices.initial}</Label>
                                  <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                                    <li>Personal meeting with student and parents to assess college and career goals.</li>
                                    <li>Review of the student's academic record, standardized test scores, extra-curricular activities and personal interests.</li>
                                    <li>Feedback and recommendations on how to most effectively reach objectives.</li>
                                    <li>Create a timeline of when each task should be completed.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Five Session Package */}
                            <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="five" id="five" className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor="five" className="font-semibold text-lg">FIVE SESSION PACKAGE - ${packagePrices.five}</Label>
                                  <p className="text-sm text-gray-700 italic mt-1">* Includes the services above plus:</p>
                                  <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                                    <li>Advising which standardized tests best showcase student's academic strengths.</li>
                                    <li>Exploring and developing a preliminary list of colleges and creating a schedule to tour various schools of interest.</li>
                                    <li>Finalizing college list of reach, target and safety schools.</li>
                                    <li>Assisting family to complete the required admissions documents.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Ten Session Package */}
                            <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="ten" id="ten" className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor="ten" className="font-semibold text-lg">TEN SESSION PACKAGE - ${packagePrices.ten}</Label>
                                  <p className="text-sm text-gray-700 italic mt-1">* Includes the services above plus:</p>
                                  <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                                    <li>Recommending high school courses that parallel students interests and goals.</li>
                                    <li>Integrating extra-curricular activities to demonstrate strong character.</li>
                                    <li>Helping students to choose internships or volunteer work</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Fifteen Session Package */}
                            <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="fifteen" id="fifteen" className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor="fifteen" className="font-semibold text-lg">FIFTEEN SESSION PACKAGE - ${packagePrices.fifteen}</Label>
                                  <p className="text-sm text-gray-700 italic mt-1">* Includes the services above plus:</p>
                                  <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                                    <li>Discussing and choosing effective essay topics and themes.</li>
                                    <li>This package includes five college essay sessions (outline preparation, drafts, edits, and finalization).</li>
                                    <li>Guidance on Early Action vs. Early Decision.</li>
                                    <li>Overseeing communication with colleges.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Twenty Session Package */}
                            <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="twenty" id="twenty" className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor="twenty" className="font-semibold text-lg">TWENTY SESSION PACKAGE - ${packagePrices.twenty}</Label>
                                  <p className="text-sm text-gray-700 italic mt-1">* Includes the services above plus:</p>
                                  <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                                    <li>Preparing for college and scholarship interviews.</li>
                                    <li>Writing assistance with supplemental essays.</li>
                                    <li>Provide guidance to maximize merit based financial aid and apply for scholarships.</li>
                                    <li>Ensuring completed applications are ready to submit.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup>
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
                      <Label htmlFor="school">Current School *</Label>
                      <Input
                        id="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        required
                      />
                    </div>



                    <div className="space-y-2">
                      <Label htmlFor="graduation_year">Expected Graduation Year *</Label>
                      <Input
                        id="graduation_year"
                        value={formData.graduation_year}
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
        description={`College Admissions Counseling - ${formData.package_name}`}
        metadata={{
          form_type: 'college_admission',
          package_name: formData.package_name,
          student_name: `${formData.student_first_name} ${formData.student_last_name}`,
          parent_email: formData.parent_email,
          graduation_year: formData.graduation_year
        }}
      />
    </div>
  );
};

export default CollegeAdmissionsForm;