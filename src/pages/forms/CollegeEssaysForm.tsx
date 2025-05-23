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

const CollegeEssaysForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingSubmissionData, setPendingSubmissionData] = useState<any>(null);
  const { toast } = useToast();

  // No fallback packages - we'll rely solely on API data

  const [formData, setFormData] = useState({
    parent_first_name: '',
    parent_last_name: '',
    parent_phone: '',
    parent_email: '',
    student_first_name: '',
    student_last_name: '',
    student_email: '',
    // Removing school field as it's not in the database
    graduation_year: '',
    packages: '',
    // Changed from 'session' to 'sessions' to match database field name
    sessions: 0,
    payment_status: 'Pending',
    course_type: 'College Essays'
  });

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoadingPackages(true);
      try {
        const response = await axios.get('https://zoffness.academy/api/get_CollageEssaysPackage');

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
              description: 'Could not load package options from server. Please try again later.',
              variant: 'destructive',
            });
          }
        } else {
          console.error('Failed to fetch packages or no packages available');
          toast({
            title: 'Warning',
            description: 'Could not load package options from server. Please try again later.',
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
          title: 'Error',
          description: 'Could not load package options from server. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingPackages(false);
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
        packages: value,
        sessions: selectedPackage.price
      }));
    } else {
      // Log warning if package not found
      console.warn(`Package with ID ${value} not found`);

      // If packages are available, use the first one as default
      if (packages.length > 0) {
        const defaultPackage = packages[0];
        setFormData(prev => ({
          ...prev,
          packages: defaultPackage.id.toString(),
          sessions: defaultPackage.price
        }));
      } else {
        // If no packages are available, set empty values
        setFormData(prev => ({
          ...prev,
          packages: '',
          sessions: 0
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
      console.log('Submitting data to /college_essays API:', submissionData);

      // Try form data format like the diagnostic form
      const formData = new FormData();
      Object.keys(submissionData).forEach(key => {
        formData.append(key, submissionData[key].toString());
      });

      // Try to submit to real API first
      const response = await axios.post('https://zoffness.academy/api/college_essays', formData, {
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
          graduation_year: '',
          packages: packages.length > 0 ? packages[0].id.toString() : '',
          sessions: packages.length > 0 ? packages[0].price : 0,
          payment_status: 'Pending',
          course_type: 'College Essays'
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
        const mockResponse = await mockApiService.submitForm('college_essays', submissionData);

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
            graduation_year: '',
            packages: packages.length > 0 ? packages[0].id.toString() : '',
            sessions: packages.length > 0 ? packages[0].price : 0,
            payment_status: 'Pending',
            course_type: 'College Essays'
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
    if (!formData.packages || formData.sessions <= 0) {
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
      graduation_year: formData.graduation_year,
      packages: formData.packages,
      sessions: formData.sessions,
      payment_status: formData.payment_status,
      course_type: formData.course_type
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
              College Essays Service Registration
            </h1>

            {isSubmitted ? (
              <SuccessScreen
                serviceName="College Essays Service"
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
                  {/* Introduction */}
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700">
                      Our College Essay Service provides personalized guidance through the college essay writing process.
                      Each session is designed to help students craft compelling, authentic essays that showcase their unique voice and experiences.
                    </p>
                    <p className="text-gray-700">
                      Select the package that best fits your needs from the options below:
                    </p>
                  </div>

                  {/* Package Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Package Selection</h2>

                    {isLoadingPackages ? (
                      <div className="flex items-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin text-college-blue-500 mr-2" />
                        <span className="text-sm text-college-blue-500">Loading package options...</span>
                      </div>
                    ) : packages.length > 0 ? (
                      <RadioGroup
                        onValueChange={handlePackageChange}
                        value={formData.packages}
                      >
                        {packages.map(pkg => (
                          <div className="border rounded-lg p-6 mb-4 hover:border-college-blue-300 transition-colors" key={pkg.id}>
                            <div className="flex items-start">
                              <RadioGroupItem value={pkg.id.toString()} id={`package-${pkg.id}`} className="mt-1" />
                              <div className="ml-3">
                                <Label htmlFor={`package-${pkg.id}`} className="text-lg font-bold">
                                  {pkg.name.toUpperCase()} - ${pkg.price}
                                </Label>
                                {pkg.description && (
                                  <p className="text-gray-700 mt-2">{pkg.description}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      // No packages available
                      <div className="border rounded-lg p-6 mb-4 bg-red-50 text-red-700">
                        <div className="flex items-start">
                          <div className="ml-3">
                            <h3 className="text-lg font-bold">No Packages Available</h3>
                            <p className="mt-2">
                              We're currently unable to load our package options. Please try again later or contact us directly for assistance.
                            </p>
                            <p className="mt-2">
                              You can reach us at <a href="mailto:info@zoffness.academy" className="underline">info@zoffness.academy</a> or call us at <a href="tel:+1234567890" className="underline">123-456-7890</a>.
                            </p>
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

                    {/* Removed school field as it's not in the database */}

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
                    disabled={isLoading || packages.length === 0}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : packages.length === 0 ? (
                      'No Packages Available'
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
        amount={formData.sessions}
        description={`College Essays Service - ${packages.find(p => p.id.toString() === formData.packages)?.name || 'Package'}`}
        metadata={{
          form_type: 'college_essays',
          package_name: packages.find(p => p.id.toString() === formData.packages)?.name || '',
          student_name: `${formData.student_first_name} ${formData.student_last_name}`,
          parent_email: formData.parent_email,
          graduation_year: formData.graduation_year
        }}
      />
    </div>
  );
};

export default CollegeEssaysForm;