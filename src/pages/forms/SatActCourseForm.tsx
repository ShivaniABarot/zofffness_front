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
import PaymentModal from '../../components/PaymentModal';
import { updatePaymentStatus } from '../../services/paymentService';
import SuccessScreen from '../../components/SuccessScreen';

const SatActCourseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formSubmissionId, setFormSubmissionId] = useState<string | null>(null);
  const { toast } = useToast();

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
    packages: '20sessions',
    total_amount: 5900,
    payment_status: 'Success',
    course_type: 'SAT/ACT Course'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRadioChange = (value: string) => {
    let amount = 5900; // Default for 20 sessions

    switch (value) {
      case '20sessions':
        amount = 5900;
        break;
      case '15sessions':
        amount = 4425;
        break;
      case '10sessions':
        amount = 2950;
        break;
      case '5sessions':
        amount = 1475;
        break;
      default:
        amount = 5900;
    }

    setFormData(prev => ({
      ...prev,
      packages: value,
      total_amount: amount
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Ensure the correct amount is set based on the selected package
    let amount = 5900;
    switch (formData.packages) {
      case '20sessions':
        amount = 5900;
        break;
      case '15sessions':
        amount = 4425;
        break;
      case '10sessions':
        amount = 2950;
        break;
      case '5sessions':
        amount = 1475;
        break;
      default:
        amount = 5900;
    }

    // Create a new submission object with the field names expected by the API
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
      package_name: formData.packages,
      amount: amount,
      payment_status: 'Pending', // Set as pending until payment is completed
      course_type: formData.course_type,
      type: 'sat_act_course',
      courses: [1] // Adding the courses field as required by the API
    };

    // Only log in development environment
    if (process.env.NODE_ENV !== 'production') {
      console.log('Submitting data:', submissionData);
    }

    try {
      const response = await axios.post('https://zoffness.academy/api/new_sat_act', submissionData);

      if (response.data.success) {
        // Store the form submission ID for payment processing
        if (response.data.id) {
          setFormSubmissionId(response.data.id.toString());
        } else if (response.data.form_id) {
          setFormSubmissionId(response.data.form_id.toString());
        } else {
          // If no ID is provided, generate a temporary one
          setFormSubmissionId(`temp_${Date.now()}`);
        }

        // Show payment modal
        setShowPaymentModal(true);

        toast({
          title: 'Form Submitted',
          description: 'Please complete the payment to finalize your registration.',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Only log errors in development environment
        if (process.env.NODE_ENV !== 'production') {
          console.error('API Error Response:', error.response?.data);
        }

        if (error.response?.status === 422) {
          // Handle validation errors
          const validationErrors = error.response.data.errors || {};

          // Log detailed validation errors for debugging
          if (process.env.NODE_ENV !== 'production') {
            console.error('Validation errors:', validationErrors);

            // Log more details about each validation error
            for (const field in validationErrors) {
              console.error(`Field: ${field}, Messages:`, validationErrors[field]);
            }
          }

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

  // Handle payment success
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      // Update payment status in your backend
      if (formSubmissionId) {
        await updatePaymentStatus(formSubmissionId, paymentIntentId);
      }

      // Close payment modal
      setShowPaymentModal(false);

      // Show success message
      toast({
        title: 'Payment Successful',
        description: 'Your registration and payment have been completed successfully!',
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
        packages: '20sessions',
        total_amount: 5900,
        payment_status: 'Success',
        course_type: 'SAT/ACT Course'
      });

      // Set form as submitted
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Your payment was successful, but we encountered an error updating your registration. Please contact support.',
      });
    }
  };

  // Handle payment modal close
  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-32 bg-gray-52">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              SAT/ACT Course Registration
            </h1>

            {isSubmitted ? (
              <SuccessScreen
                serviceName="SAT/ACT Course"
                onRegisterAnother={() => setIsSubmitted(false)}
              />
            ) : (
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

                    <RadioGroup defaultValue="20sessions" onValueChange={handleRadioChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="20sessions" id="20sessions" />
                        <Label htmlFor="20sessions">20 session package - $5,900</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="15sessions" id="15sessions" />
                        <Label htmlFor="15sessions">15 session package - $4,425</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10sessions" id="10sessions" />
                        <Label htmlFor="10sessions">10 session package - $2,950</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5sessions" id="5sessions" />
                        <Label htmlFor="5sessions">5 session package - $1,475</Label>
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
                      <Label htmlFor="school">School *</Label>
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

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentModalClose}
        onSuccess={handlePaymentSuccess}
        amount={formData.total_amount}
        description={`SAT/ACT Course - ${formData.packages}`}
        metadata={{
          form_id: formSubmissionId,
          course_type: 'SAT/ACT Course',
          package: formData.packages,
          student_name: `${formData.student_first_name} ${formData.student_last_name}`
        }}
      />
    </div>
  );
};

export default SatActCourseForm;