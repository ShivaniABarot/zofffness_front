import React, { useState } from 'react';
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

const CollegeEssaysForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Define package prices
  const packagePrices = {
    'one-session': 295,
    'two-sessions': 590,
    'three-sessions': 885,
    'four-sessions': 1180,
    'five-sessions': 1475
  };

  // Package name mapping for display
  const packageNames = {
    'one-session': 'One Session',
    'two-sessions': 'Two Sessions',
    'three-sessions': 'Three Sessions',
    'four-sessions': 'Four Sessions',
    'five-sessions': 'Five Sessions'
  };

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
    packages: 'one-session',
    // Changed from 'session' to 'sessions' to match database field name
    sessions: packagePrices['one-session'],
    payment_status: 'Success',
    course_type: 'College Essays'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePackageChange = (value: string) => {
    // Get the price for the selected package
    const price = packagePrices[value as keyof typeof packagePrices] || 295;

    setFormData(prev => ({
      ...prev,
      packages: value,
      sessions: price // Changed from 'session' to 'sessions' to match database field name
    }));
  };

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
        // Show success toast
        toast({
          title: 'Success',
          description: 'Registration submitted successfully!',
          variant: 'default',
        });

        // Set form as submitted
        setIsSubmitted(true);

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
          packages: 'one-session',
          sessions: packagePrices['one-session'], // Changed from 'session' to 'sessions' to match database field name
          payment_status: 'Success',
          course_type: 'College Essays'
        });
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
          toast({
            title: 'Success',
            description: 'Registration submitted successfully!',
            variant: 'default',
          });

          // Set form as submitted
          setIsSubmitted(true);

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
            packages: 'one-session',
            sessions: packagePrices['one-session'], // Changed from 'session' to 'sessions' to match database field name
            payment_status: 'Success',
            course_type: 'College Essays'
          });
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

                    <RadioGroup defaultValue="one-session" onValueChange={handlePackageChange}>
                      <div className="border rounded-lg p-6 mb-4 hover:border-college-blue-300 transition-colors">
                        <div className="flex items-start">
                          <RadioGroupItem value="one-session" id="one-session" className="mt-1" />
                          <div className="ml-3">
                            <Label htmlFor="one-session" className="text-lg font-bold">ONE SESSION - ${packagePrices['one-session']}</Label>
                            <p className="text-gray-700 mt-2">
                              Brainstorm ideas and focal points for possible responses. Identify the most appropriate questions to address. Begin drafting the main portions of essays using a series of tailored prompts.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6 mb-4 hover:border-college-blue-300 transition-colors">
                        <div className="flex items-start">
                          <RadioGroupItem value="two-sessions" id="two-sessions" className="mt-1" />
                          <div className="ml-3">
                            <Label htmlFor="two-sessions" className="text-lg font-bold">TWO SESSIONS - ${packagePrices['two-sessions']}</Label>
                            <p className="text-gray-700 mt-2">
                              Session 1: Brainstorm ideas and begin drafting.<br/>
                              Session 2: Evaluate drafts and create a complete framework for the final essay.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6 mb-4 hover:border-college-blue-300 transition-colors">
                        <div className="flex items-start">
                          <RadioGroupItem value="three-sessions" id="three-sessions" className="mt-1" />
                          <div className="ml-3">
                            <Label htmlFor="three-sessions" className="text-lg font-bold">THREE SESSIONS - ${packagePrices['three-sessions']}</Label>
                            <p className="text-gray-700 mt-2">
                              Sessions 1-2: Brainstorm ideas, begin drafting, and create a framework.<br/>
                              Session 3: Hone the draft for contextual, rhetorical, and analytical completeness.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6 mb-4 hover:border-college-blue-300 transition-colors">
                        <div className="flex items-start">
                          <RadioGroupItem value="four-sessions" id="four-sessions" className="mt-1" />
                          <div className="ml-3">
                            <Label htmlFor="four-sessions" className="text-lg font-bold">FOUR SESSIONS - ${packagePrices['four-sessions']}</Label>
                            <p className="text-gray-700 mt-2">
                              Sessions 1-3: Brainstorm ideas, create framework, and hone the draft.<br/>
                              Session 4: Fine-tune exposition and linkages, word-by-word, and line-by-line.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6 mb-4 hover:border-college-blue-300 transition-colors">
                        <div className="flex items-start">
                          <RadioGroupItem value="five-sessions" id="five-sessions" className="mt-1" />
                          <div className="ml-3">
                            <Label htmlFor="five-sessions" className="text-lg font-bold">FIVE SESSIONS - ${packagePrices['five-sessions']}</Label>
                            <p className="text-gray-700 mt-2">
                              Sessions 1-4: Complete brainstorming, drafting, and fine-tuning process.<br/>
                              Session 5: Review and polish the final draft. Proofread for concision and flawlessness.
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
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

export default CollegeEssaysForm;