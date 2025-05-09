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
    school: '',
    graduation_year: '',
    packages: 'one-session',
    session: packagePrices['one-session'],
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
      session: price
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
      school: formData.school,
      graduation_year: formData.graduation_year,
      packages: formData.packages,
      session: formData.session,
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
          school: '',
          graduation_year: '',
          packages: 'one-session',
          session: packagePrices['one-session'],
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
            school: '',
            graduation_year: '',
            packages: 'one-session',
            session: packagePrices['one-session'],
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
                      Thank you for registering for College Essays Service. We have received your information.
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
                  {/* Session Descriptions */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-college-blue-500">Session Descriptions</h2>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold text-college-blue-500">Session One:</h3>
                        <p className="text-sm text-gray-700 mt-1">
                          Brainstorm ideas and focal points for possible responses. Identify the most appropriate questions to address. Begin drafting the main portions of essays using a series of tailored prompts.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold text-college-blue-500">Session Two:</h3>
                        <p className="text-sm text-gray-700 mt-1">
                          Evaluate drafts or written exercises generated during the previous session. Identify and collate the strongest responses into a complete framework for the final essay. Assess the writing for descriptive and analytical depth.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold text-college-blue-500">Session Three:</h3>
                        <p className="text-sm text-gray-700 mt-1">
                          Begin to hone the draft for contextual, rhetorical, and analytical completeness. Identify where vividness, logic, and/or transitions need to be strengthened. Scan the completed draft for possible alternative connections or conclusions.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold text-college-blue-500">Session Four:</h3>
                        <p className="text-sm text-gray-700 mt-1">
                          Fine-tune exposition and linkages, word-by-word, and line-by-line. Consider word limits, and cut all superfluous information, and making sure all "best fit" information and explanation is thoroughly and appropriately expressed.
                        </p>
                      </div>

                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold text-college-blue-500">Session Five:</h3>
                        <p className="text-sm text-gray-700 mt-1">
                          Review and polish the final draft. Check one final time to be sure vocabulary and sentence structure has been achieved for maximum effectiveness. Proofread for concision and flawlessness.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Package Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Package Selection</h2>

                    <RadioGroup defaultValue="one-session" onValueChange={handlePackageChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-session" id="one-session" />
                        <Label htmlFor="one-session">One Session - ${packagePrices['one-session']}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="two-sessions" id="two-sessions" />
                        <Label htmlFor="two-sessions">Two Sessions - ${packagePrices['two-sessions']}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="three-sessions" id="three-sessions" />
                        <Label htmlFor="three-sessions">Three Sessions - ${packagePrices['three-sessions']}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="four-sessions" id="four-sessions" />
                        <Label htmlFor="four-sessions">Four Sessions - ${packagePrices['four-sessions']}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="five-sessions" id="five-sessions" />
                        <Label htmlFor="five-sessions">Five Sessions - ${packagePrices['five-sessions']}</Label>
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