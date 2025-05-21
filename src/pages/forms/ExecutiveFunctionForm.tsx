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

const ExecutiveFunctionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
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
    grade: '',
    package_name: '',
    amount: 0,
    payment_status: 'Success', // Changed from 'Pending' to 'Success' since we're removing payment
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

          // If packages are available, set the default package to the first one
          if (response.data.data.length > 0) {
            const defaultPackage = response.data.data[0];
            setFormData(prev => ({
              ...prev,
              package_name: defaultPackage.id.toString(),
              amount: defaultPackage.price
            }));
          } else {
            // If no packages are returned, use fallback
            setFormData(prev => ({
              ...prev,
              package_name: 'five-sessions',
              amount: fallbackPackagePrices['five-sessions']
            }));
          }
        } else {
          console.error('Failed to fetch packages or invalid data format');
          toast({
            title: 'Warning',
            description: 'Could not load package options from server. Using default options.',
            variant: 'destructive',
          });

          // Use fallback packages
          setFormData(prev => ({
            ...prev,
            package_name: 'five-sessions',
            amount: fallbackPackagePrices['five-sessions']
          }));
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

        // Use fallback packages
        setFormData(prev => ({
          ...prev,
          package_name: 'five-sessions',
          amount: fallbackPackagePrices['five-sessions']
        }));
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
      school: formData.school,
      grade: formData.grade,
      package_type: formData.package_name,
      subtotal: formData.amount,
      payment_status: formData.payment_status,
      course_type: formData.course_type,
      type: 'executive_function'
    };

    // Only log in development environment
    if (process.env.NODE_ENV !== 'production') {
      console.log('Submitting data:', submissionData);
    }

    try {
      // Make the API call to the executive_coaching endpoint
      const response = await axios.post(
        'https://zoffness.academy/api/executive_coaching',
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
          school: '',
          grade: '',
          package_name: packages.length > 0 ? packages[0].id.toString() : 'five-sessions',
          amount: packages.length > 0 ? packages[0].price : fallbackPackagePrices['five-sessions'],
          payment_status: 'Success',
          course_type: 'Executive Function Coaching'
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
            school: '',
            grade: '',
            package_name: packages.length > 0 ? packages[0].id.toString() : 'five-sessions',
            amount: packages.length > 0 ? packages[0].price : fallbackPackagePrices['five-sessions'],
            payment_status: 'Success',
            course_type: 'Executive Function Coaching'
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
              Executive Function Coaching Registration
            </h1>

            {isSubmitted ? (
              <Card className="border-green-500">
                <CardContent className="p-6">
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-600">Registration Successful!</h2>
                    <p className="text-gray-600 font-medium">
                      Registration successful!
                    </p>
                    <p className="text-gray-600">
                      Thank you for registering for Executive Function Coaching. We have received your information.
                    </p>
                    <p className="text-gray-600">
                      You will receive a confirmation email shortly with additional details.
                    </p>
                    <Button
                      className="mt-4 bg-college-blue-500 hover:bg-college-blue-600"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Register Another Student
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
                        defaultValue={packages[0]?.id.toString()}
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
                      <RadioGroup defaultValue="five-sessions" onValueChange={handlePackageChange}>
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

                    <div className="space-y-2">
                      <Label htmlFor="grade">Current Grade *</Label>
                      <Input
                        id="grade"
                        value={formData.grade}
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

export default ExecutiveFunctionForm;