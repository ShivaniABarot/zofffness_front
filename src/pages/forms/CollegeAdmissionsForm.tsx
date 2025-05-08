import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const CollegeAdmissionsForm = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-32 bg-gray-52">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              College Admissions Counseling Registration
            </h1>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-8">
                  {/* Package Selection */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-college-blue-500">COLLEGE ADMISSIONS COUNSELING PACKAGES</h2>

                    <RadioGroup defaultValue="initial">
                      {/* Initial Intake Package */}
                      <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="initial" id="initial" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="initial" className="font-semibold text-lg">INITIAL INTAKE - $250</Label>
                            <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                              <li>Personal meeting with student and parents to assess college and career goals.</li>
                              <li>Review of the student's academic record, standardized test scores, extra-curricular activities and personal interests.</li>
                              <li>Feedback and recommendations on how to most effectively reach objectives.</li>
                              <li>Create a timeline of when each task should be completed.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Five Session Package */}
                      <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="five" id="five" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="five" className="font-semibold text-lg">FIVE SESSION PACKAGE - $1,250</Label>
                            <p className="text-sm text-gray-700 italic mt-1">* Includes the services above plus:</p>
                            <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                              <li>Advising which standardized tests best showcase student's academic strengths.</li>
                              <li>Exploring and developing a preliminary list of colleges and creating a schedule to tour various schools of interest.</li>
                              <li>Finalizing college list of reach, target and safety schools.</li>
                              <li>Assisting family to complete the required admissions documents.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Ten Session Package */}
                      <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="ten" id="ten" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="ten" className="font-semibold text-lg">TEN SESSION PACKAGE - $2,500</Label>
                            <p className="text-sm text-gray-700 italic mt-1">* Includes the services above plus:</p>
                            <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                              <li>Recommending high school courses that parallel students interests and goals.</li>
                              <li>Integrating extra-curricular activities to demonstrate strong character.</li>
                              <li>Helping students to choose internships or volunteer work</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Fifteen Session Package */}
                      <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="fifteen" id="fifteen" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="fifteen" className="font-semibold text-lg">FIFTEEN SESSION PACKAGE - $3,750</Label>
                            <p className="text-sm text-gray-700 italic mt-1">* Includes the services above plus:</p>
                            <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                              <li>Discussing and choosing effective essay topics and themes.</li>
                              <li>This package includes five college essay sessions (outline preparation, drafts, edits, and finalization).</li>
                              <li>Guidance on Early Action vs. Early Decision.</li>
                              <li>Overseeing communication with colleges.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Twenty Session Package */}
                      <div className="mb-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="twenty" id="twenty" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="twenty" className="font-semibold text-lg">TWENTY SESSION PACKAGE - $5,000</Label>
                            <p className="text-sm text-gray-700 italic mt-1">* Includes the services above plus:</p>
                            <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
                              <li>Preparing for college and scholarship interviews.</li>
                              <li>Writing assistance with supplemental essays.</li>
                              <li>Provide guidance to maximize merit based financial aid and apply for scholarships.</li>
                              <li>Ensuring completed applications are ready to submit.</li>
                            </ul>
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
                      <Label htmlFor="school">Current School *</Label>
                      <Input id="school" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">Current Grade *</Label>
                      <Input id="grade" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Expected Graduation Year *</Label>
                      <Input id="graduationYear" required />
                    </div>
                  </div>

                  {/* Areas of Interest */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Areas of Interest</h2>

                    <div className="space-y-2">
                      <Label htmlFor="majorInterest">Intended Major/Area of Study</Label>
                      <Input id="majorInterest" placeholder="e.g., Engineering, Business, Liberal Arts" />
                    </div>

                    <div className="space-y-2">
                      <Label>College Type Preference</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Private Universities</SelectItem>
                          <SelectItem value="public">Public Universities</SelectItem>
                          <SelectItem value="both">Both Private and Public</SelectItem>
                          <SelectItem value="undecided">Undecided</SelectItem>
                        </SelectContent>
                      </Select>
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

export default CollegeAdmissionsForm;