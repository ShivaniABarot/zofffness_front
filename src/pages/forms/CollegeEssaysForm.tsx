import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';

const CollegeEssaysForm = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="py-32 bg-gray-52">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-college-blue-500 mb-8 text-center">
              College Essays Service Registration
            </h1>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-8">
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

                    <RadioGroup defaultValue="one-session">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-session" id="one-session" />
                        <Label htmlFor="one-session">One Session - $295</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="two-sessions" id="two-sessions" />
                        <Label htmlFor="two-sessions">Two Sessions - $590</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="three-sessions" id="three-sessions" />
                        <Label htmlFor="three-sessions">Three Sessions - $885</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="four-sessions" id="four-sessions" />
                        <Label htmlFor="four-sessions">Four Sessions - $1,180</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="five-sessions" id="five-sessions" />
                        <Label htmlFor="five-sessions">Five Sessions - $1,475</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Essay Type */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Essay Type</h2>

                    <RadioGroup defaultValue="common-app">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="common-app" id="common-app" />
                        <Label htmlFor="common-app">Common Application Essay</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="supplemental" id="supplemental" />
                        <Label htmlFor="supplemental">Supplemental Essays</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both Common App & Supplemental Essays</Label>
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
                      <Label htmlFor="graduationYear">Expected Graduation Year *</Label>
                      <Input id="graduationYear" required />
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

export default CollegeEssaysForm;