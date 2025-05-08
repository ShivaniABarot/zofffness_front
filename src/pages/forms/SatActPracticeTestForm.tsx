import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
// Removed unused imports

const SatActPracticeTestForm = () => {
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
                <form className="space-y-8">
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

                    <div className="space-y-2">
                      <Label htmlFor="grade">Current Grade *</Label>
                      <Input id="grade" required />
                    </div>
                  </div>

                  {/* Test Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Test Selection</h2>

                    <RadioGroup defaultValue="sat-regular">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sat-regular" id="sat-regular" />
                        <Label htmlFor="sat-regular">Full-Length Proctored Practice SAT Test with Regular Time - $95</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sat-extended" id="sat-extended" />
                        <Label htmlFor="sat-extended">Full-Length Proctored Practice SAT Test with 50% Extended Time - $95</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="act-regular" id="act-regular" />
                        <Label htmlFor="act-regular">Full-Length Proctored Practice ACT Test with Regular Time - $95</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="act-extended" id="act-extended" />
                        <Label htmlFor="act-extended">Full-Length Proctored Practice ACT Test with 50% Extended Time - $95</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Practice Test Dates */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Practice Test Dates and Times</h2>
                    <p className="text-sm font-semibold text-college-blue-500 mb-2">ACT/SAT Courses*</p>

                    <RadioGroup defaultValue="april5">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="april5" id="april5" />
                        <Label htmlFor="april5">Saturday, April 5th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="april12" id="april12" />
                        <Label htmlFor="april12">Saturday, April 12th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="april19" id="april19" />
                        <Label htmlFor="april19">Saturday, April 19th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="april26" id="april26" />
                        <Label htmlFor="april26">Saturday, April 26th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="may3" id="may3" />
                        <Label htmlFor="may3">Saturday, May 3rd @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="may10" id="may10" />
                        <Label htmlFor="may10">Saturday, May 10th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="may17" id="may17" />
                        <Label htmlFor="may17">Saturday, May 17th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="may24" id="may24" />
                        <Label htmlFor="may24">Saturday, May 24th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="may31" id="may31" />
                        <Label htmlFor="may31">Saturday, May 31st @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="june7" id="june7" />
                        <Label htmlFor="june7">Saturday, June 7th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="june14" id="june14" />
                        <Label htmlFor="june14">Saturday, June 14th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="june21" id="june21" />
                        <Label htmlFor="june21">Saturday, June 21st @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="june28" id="june28" />
                        <Label htmlFor="june28">Saturday, June 28th @ 9am at Zoffness College Prep (510 West Boston Post Road)</Label>
                      </div>
                    </RadioGroup>
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

export default SatActPracticeTestForm;