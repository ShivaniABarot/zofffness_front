import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const ExecutiveFunctionForm = () => {
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
                <form className="space-y-8">
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

                    <RadioGroup defaultValue="five-sessions">
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
                  </div>

                  {/* Schedule Preference */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-college-blue-500">Schedule Preference</h2>

                    <div className="space-y-2">
                      <Label>Preferred Days</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekday">Weekdays Only</SelectItem>
                          <SelectItem value="weekend">Weekends Only</SelectItem>
                          <SelectItem value="both">Both Weekdays and Weekends</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                          <SelectItem value="evening">Evening (4:00 PM - 8:00 PM)</SelectItem>
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

export default ExecutiveFunctionForm;