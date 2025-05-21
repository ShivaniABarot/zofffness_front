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
    payment_status: 'Success', // Changed from 'Pending' to 'Success' since we're removing payment
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

        if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
          setPackages(response.data.data);

          // Set the default package to the first one
          const defaultPackage = response.data.data[0];
          setFormData(prev => ({
            ...prev,
            packages: defaultPackage.id.toString(),
            sessions: defaultPackage.price
          }));
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

  // Payment-related functions have been removed

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationErrors({});

    // Create a submission object with the field names expected by the API
    const submissionData = {
      parent_first_name: formData.parent_first_name,
      parent_last_name: formData.parent_last_name,
      parent_phone: formData.parent_phone,
      parent_email: formData.parent_email,
      student_first_name: formData.student_first_name,
      student_last_name: formData.student_last_name,
      student_email: formData.student_email,
      // Removed school field as it's not in the database
      graduation_year: formData.graduation_year,
      packages: formData.packages,
      sessions: formData.sessions, // Changed from 'session' to 'sessions' to match database field name
      payment_status: formData.payment_status,
      course_type: formData.course_type
    };

    // Only log in development environment
    if (process.env.NODE_ENV !== 'production') {
      console.log('Submitting data:', submissionData);
    }

    try {
      // Make the API call to the college_essays endpoint
      const response = await axios.post(
        'https://zoffness.academy/api/college_essays',
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // Check if the response contains a success message or status
      if (response.data.success ||
          (response.data.message && response.data.message.includes('successfully')) ||
          response.data.status === 'success') {

        // Show success toast notification
        toast({
          title: 'Registration Successful',
          description: 'Your registration has been submitted successfully!',
          variant: 'default',
        });

        // Reset form data
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
          payment_status: 'Success',
          course_type: 'College Essays'
        });

        // Set submitted state to show success screen
        setIsSubmitted(true);
      } else {
        // Log the response for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log('API Response:', response.data);
          console.log('API Response status:', response.data.status);
          console.log('API Response success:', response.data.success);
          console.log('API Response message:', response.data.message);
        }

        // Handle case where API returns success: false but has a success message or status
        if ((response.data.message && response.data.message.includes('successfully')) ||
            response.data.status === 'success') {

          // Show success toast notification
          toast({
            title: 'Registration Successful',
            description: 'Your registration has been submitted successfully!',
            variant: 'default',
          });

          // Reset form data
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
            payment_status: 'Success',
            course_type: 'College Essays'
          });

          // Set submitted state to show success screen
          setIsSubmitted(true);
        } else {
          // Handle actual error
          toast({
            title: 'Error',
            description: response.data.message || 'Something went wrong. Please try again.',
            variant: 'destructive',
          });
        }
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
          const apiErrors = error.response.data.errors || {};
          const formattedErrors: Record<string, string> = {};
          const errorMessages = [];

          // Create a formatted error message for display
          for (const field in apiErrors) {
            const messages = apiErrors[field];
            const formattedMessage = Array.isArray(messages) ? messages[0] : messages;

            // Add to formatted errors for state
            formattedErrors[field] = formattedMessage;

            // Add to error messages for toast
            errorMessages.push(`${field.replace(/_/g, ' ')}: ${formattedMessage}`);
          }

          // Set validation errors state
          setValidationErrors(formattedErrors);

          // Create a more user-friendly error message
          const errorMessage = errorMessages.length > 0
            ? 'Please correct the following errors:\n' + errorMessages.join('\n')
            : 'Please check your form inputs and try again.';

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
                        defaultValue={packages[0]?.id.toString()}
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
                      'Submit Registration'
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
    </div>
  );
};

export default CollegeEssaysForm;