import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Loader2 } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';

const SatActPracticeTestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Define test types with their prices
  const testTypePrices = {
    'sat-regular': 95,
    'sat-extended': 95,
    'act-regular': 95,
    'act-extended': 95
  };

  const [formData, setFormData] = useState({
    parent_firstname: '',
    parent_lastname: '',
    parent_phone: '',
    parent_email: '',
    student_firstname: '',
    student_lastname: '',
    student_email: '',
    school: '',
    grade: '',
    test_type: 'sat-regular',
    test_date: '',
    amount: testTypePrices['sat-regular'], // Default price based on default test type
    payment_status: 'Success',
    course_type: 'SAT/ACT Practice Test'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleTestTypeChange = (value: string) => {
    // Get the price for the selected test type
    const price = testTypePrices[value as keyof typeof testTypePrices] || 95;

    setFormData(prev => ({
      ...prev,
      test_type: value,
      amount: price // Update the amount based on the selected test type
    }));
  };

  const handleTestDateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      test_date: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.test_date) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a test date',
      });
      return;
    }

    setIsLoading(true);

    // Simulate form submission with a timeout
    setTimeout(() => {
      // Show success message
      toast({
        title: 'Success',
        description: 'Registration submitted successfully!',
      });

      // Reset form
      setFormData({
        parent_firstname: '',
        parent_lastname: '',
        parent_phone: '',
        parent_email: '',
        student_firstname: '',
        student_lastname: '',
        student_email: '',
        school: '',
        grade: '',
        test_type: 'sat-regular',
        test_date: '',
        amount: testTypePrices['sat-regular'], // Use the price from our price mapping
        payment_status: 'Success',
        course_type: 'SAT/ACT Practice Test'
      });

      setIsLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-32 bg-gray-52">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              SAT/ACT Practice Test Registration
            </h1>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* Test Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Test Selection</h2>

                    <div className="space-y-2">
                      <Label htmlFor="testType">Select Test Type *</Label>
                      <Select onValueChange={handleTestTypeChange} defaultValue="sat-regular">
                        <SelectTrigger id="testType">
                          <SelectValue placeholder="Select test type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sat-regular">Full-Length Proctored Practice SAT Test with Regular Time - $95</SelectItem>
                          <SelectItem value="sat-extended">Full-Length Proctored Practice SAT Test with 50% Extended Time - $95</SelectItem>
                          <SelectItem value="act-regular">Full-Length Proctored Practice ACT Test with Regular Time - $95</SelectItem>
                          <SelectItem value="act-extended">Full-Length Proctored Practice ACT Test with 50% Extended Time - $95</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Practice Test Dates */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Practice Test Dates and Times</h2>
                    <p className="text-sm font-semibold text-college-blue-500 mb-2">ACT/SAT Courses*</p>

                    <div className="space-y-2">
                      <Label htmlFor="testDate">Select Test Date *</Label>
                      <Select onValueChange={handleTestDateChange} required>
                        <SelectTrigger id="testDate">
                          <SelectValue placeholder="Select test date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="april5">Saturday, April 5th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="april12">Saturday, April 12th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="april19">Saturday, April 19th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="april26">Saturday, April 26th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may3">Saturday, May 3rd @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may10">Saturday, May 10th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may17">Saturday, May 17th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may24">Saturday, May 24th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="may31">Saturday, May 31st @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="june7">Saturday, June 7th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="june14">Saturday, June 14th @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="june21">Saturday, June 21st @ 9am at Zoffness College Prep</SelectItem>
                          <SelectItem value="june28">Saturday, June 28th @ 9am at Zoffness College Prep</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">All tests are held at 510 West Boston Post Road</p>
                    </div>
                  </div>

                  {/* Parent Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Parent Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parent_firstname">Parent First Name *</Label>
                        <Input
                          id="parent_firstname"
                          value={formData.parent_firstname}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parent_lastname">Parent Last Name *</Label>
                        <Input
                          id="parent_lastname"
                          value={formData.parent_lastname}
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
                        <Label htmlFor="student_firstname">Student First Name *</Label>
                        <Input
                          id="student_firstname"
                          value={formData.student_firstname}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="student_lastname">Student Last Name *</Label>
                        <Input
                          id="student_lastname"
                          value={formData.student_lastname}
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SatActPracticeTestForm;