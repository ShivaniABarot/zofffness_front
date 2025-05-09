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

// Define interface for session data
interface Session {
  id: number;
  name: string;
  price: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

const SatActDiagnosticForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const { toast } = useToast();

  // Fetch sessions from API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('https://zoffness.academy/api/get_sessions');
        // Log the API response for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log('API Response:', response.data);
        }

        if (response.data.success && Array.isArray(response.data.data)) {
          // Filter sessions to only include diagnostic-related ones
          const diagnosticSessions = response.data.data.filter((session: Session) =>
            session.name &&
            typeof session.name === 'string' &&
            session.name.toLowerCase().includes('diagnostic')
          );
          setSessions(diagnosticSessions);
        } else {
          console.error('Failed to fetch sessions or invalid data format');
          toast({
            title: 'Warning',
            description: 'Could not load test options from server. Using default options.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);

        // Log more detailed information about the response
        if (axios.isAxiosError(error)) {
          console.error('API Error Response:', error.response?.data);
          console.error('API Error Status:', error.response?.status);
        }

        toast({
          title: 'Warning',
          description: 'Could not load test options from server. Using default options.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingSessions(false);
      }
    };

    fetchSessions();
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
    packages: '',
    session_id: '',
    total_amount: 180,
    payment_status: 'Success'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRadioChange = (value: string) => {
    // Check if the value is a session ID from the API
    const selectedSession = sessions.find(session => session.id.toString() === value);

    if (selectedSession) {
      // If it's a session from the API
      setFormData(prev => ({
        ...prev,
        session_id: selectedSession.id.toString(),
        packages: selectedSession.name,
        total_amount: parseFloat(selectedSession.price)
      }));
    } else {
      // Fallback to hardcoded values if API sessions aren't available
      setFormData(prev => ({
        ...prev,
        session_id: '',
        packages: value,
        total_amount: 180 // Default price for diagnostic tests
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Create submission data object
    const submissionData = {
      ...formData,
      session_id: formData.session_id, // Include session_id from API
    };

    try {
      const response = await axios.post('https://zoffness.academy/api/enroll', submissionData);

      if (response.data.success) {
        toast({
          title: 'Success',
          description: 'Registration submitted successfully!',
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
          packages: '',
          session_id: '',
          total_amount: 180,
          payment_status: 'Success'
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        // Handle validation errors
        const validationErrors = error.response.data.errors;
        const errorMessage = Object.values(validationErrors).flat().join('\n');
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: errorMessage || 'Please check your form inputs.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to submit registration. Please try again.',
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
              SAT/ACT Diagnostic Test Registration
            </h1>

            {isSubmitted ? (
              <SuccessScreen
                serviceName="SAT/ACT Diagnostic Test"
                onRegisterAnother={() => setIsSubmitted(false)}
              />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Test Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Test Selection</h2>

                    <div className="mb-6">
                      <p className="text-gray-700">Complete two full-length proctored diagnostic tests to determine which test is the best fit. Our software provides comprehensive online analysis with statistical data and insights into strengths and weaknesses.</p>
                      <p className="text-sm text-gray-600 mt-2">Scores will be scaled and results analyzed to assess which test may be the better fit for each student. This essential first step allows students to become familiar with both tests and gain a decisive advantage before test prep begins.</p>
                    </div>

                    {isLoadingSessions ? (
                      <div className="flex justify-center items-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-college-blue-500" />
                        <span className="ml-2 text-college-blue-500">Loading test options...</span>
                      </div>
                    ) : (
                      <RadioGroup
                        defaultValue={sessions.length > 0 ? sessions[0].id.toString() : "both-standard"}
                        onValueChange={handleRadioChange}
                      >
                        {sessions.length > 0 ? (
                          // Render sessions from API
                          sessions.map((session) => (
                            <div key={session.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={session.id.toString()} id={`session-${session.id}`} />
                              <Label htmlFor={`session-${session.id}`}>
                                {session.name} - ${parseFloat(session.price).toFixed(2)}
                              </Label>
                            </div>
                          ))
                        ) : (
                          // Fallback to hardcoded options if API fails
                          <>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="both-standard" id="both-standard" />
                              <Label htmlFor="both-standard">Full-Length Proctored Diagnostic SAT/ACT Assessment - $180</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="both-extended" id="both-extended" />
                              <Label htmlFor="both-extended">Full-Length Proctored Diagnostic SAT/ACT Assessment with 50% Extended Time - $180</Label>
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
                        <Label htmlFor="parentFirstName">Parent First Name *</Label>
                        <Input
                          id="parent_first_name"
                          value={formData.parent_first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parentLastName">Parent Last Name *</Label>
                        <Input
                          id="parent_last_name"
                          value={formData.parent_last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Parent Phone *</Label>
                      <Input
                        id="parent_phone"
                        type="tel"
                        value={formData.parent_phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">Parent Email *</Label>
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
                        <Label htmlFor="studentFirstName">Student First Name *</Label>
                        <Input
                          id="student_first_name"
                          value={formData.student_first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studentLastName">Student Last Name *</Label>
                        <Input
                          id="student_last_name"
                          value={formData.student_last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentEmail">Student Email *</Label>
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
    </div>
  );
};

export default SatActDiagnosticForm;