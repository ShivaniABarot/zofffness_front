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

                  {/* Package Selection */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Package Selection</h2>
                    
                    <RadioGroup defaultValue="comprehensive">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comprehensive" id="comprehensive" />
                        <Label htmlFor="comprehensive">Comprehensive Package - $5,999
                          <p className="text-sm text-gray-600 mt-1">Full support from 9th/10th grade through college acceptance</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="senior" id="senior" />
                        <Label htmlFor="senior">Senior Year Package - $3,999
                          <p className="text-sm text-gray-600 mt-1">Focused support during application season</p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hourly" id="hourly" />
                        <Label htmlFor="hourly">Hourly Consultation - $199/hour
                          <p className="text-sm text-gray-600 mt-1">Flexible support as needed</p>
                        </Label>
                      </div>
                    </RadioGroup>
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