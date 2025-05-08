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

const ExecutiveFunctionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Define package prices
  const packagePrices = {
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
    package_name: 'five-sessions',
    amount: packagePrices['five-sessions'],
    payment_status: 'Success',
    course_type: 'Executive Function Coaching'
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
    const price = packagePrices[value as keyof typeof packagePrices] || 450;

    setFormData(prev => ({
      ...prev,
      package_name: value,
      amount: price
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a submission object with the field names expected by the API
    const submissionData = {
      parent_firstname: formData.parent_first_name,
      parent_lastname: formData.parent_last_name,
      parent_phone: formData.parent_phone,
      parent_email: formData.parent_email,
      student_firstname: formData.student_first_name,
      student_lastname: formData.student_last_name,
      student_email: formData.student_email,
      school: formData.school,
      grade: formData.grade,
      package_name: formData.package_name,
      amount: formData.amount,
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
      const response = await axios.post('https://zoffness.academy/api/executive_coaching', submissionData);

      if (response.data.success) {
        toast({
          title: 'Success',
          description: 'Registration submitted successfully!',
        });
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
          package_name: 'five-sessions',
          amount: packagePrices['five-sessions'],
          payment_status: 'Success',
          course_type: 'Executive Function Coaching'
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Only log errors in development environment
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
          const validationErrors = error.response.data.errors || {};

          // Create a more readable error message
          const errorMessages = [];
          for (const field in validationErrors) {
            const messages = validationErrors[field];
            if (Array.isArray(messages)) {
              errorMessages.push(`${field}: ${messages.join(', ')}`);
            }
          }

          toast({
            variant: 'destructive',
            title: 'Validation Error',
            description: errorMessages.join('\n') || 'Please check your form inputs.',
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

            <Card>
              <CardContent className="p-6">
                <form className="space-y-8" onSubmit={handleSubmit}>
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExecutiveFunctionForm;