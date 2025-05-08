import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';

const SatActCourseForm = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-32 bg-gray-52">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              SAT/ACT Course Registration
            </h1>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-8">
                  {/* Package Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Package Selection</h2>

                    <div className="mb-4">
                      <p className="text-gray-700">Individualized SAT/ACT Instruction (In Person or Remote)</p>
                      <p className="text-sm text-gray-600 mt-2">We believe that all students have the ability to reach their full academic potential, as success is found where preparation meets opportunity. A student's motivation is fueled by defined goals, a structured approach, noticeable progress, and a high level of achievement. The individualized attention that we provide to our clients fosters trust, strong relationships, and a collaborative effort.</p>
                      <p className="text-sm text-gray-600 mt-2">$295/hour per session - Work with a highly qualified and dedicated SAT/ACT instructor who can provide a personalized approach to each student's specific needs. Please choose from the following packages:</p>
                      <p className="text-sm font-semibold text-college-blue-500 mt-2">ACT/SAT Courses</p>
                    </div>

                    <RadioGroup defaultValue="20sessions">
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
                        <Label htmlFor="parentFirstName">Parent First Name *</Label>
                        <Input id="parentFirstName" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parentLastName">Parent Last Name *</Label>
                        <Input id="parentLastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Parent Phone *</Label>
                      <Input id="parentPhone" type="tel" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">Parent Email *</Label>
                      <Input id="parentEmail" type="email" required />
                    </div>
                  </div>

                  {/* Student Information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Student Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentFirstName">Student First Name *</Label>
                        <Input id="studentFirstName" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studentLastName">Student Last Name *</Label>
                        <Input id="studentLastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentEmail">Student Email *</Label>
                      <Input id="studentEmail" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school">School *</Label>
                      <Input id="school" required />
                    </div>
                  </div>



                  {/* Submit Button */}
                  <Button type="submit" className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                    Submit Registration
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

export default SatActCourseForm;