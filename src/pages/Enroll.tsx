
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle2, ArrowRight, Award, Clock, Calendar } from 'lucide-react';

const Enroll = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/service-selection');
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Enroll Now
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Begin your journey to college success by enrolling in our comprehensive college preparation programs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                      Enrollment Form
                    </h2>
                    <p className="text-gray-700">
                      Complete the form below to enroll in one of our programs. After submission, a counselor will contact you to finalize your enrollment and discuss next steps.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                        <Input id="firstName" placeholder="Enter your first name" required />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                        <Input id="lastName" placeholder="Enter your last name" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                        <Input id="email" type="email" placeholder="Enter your email address" required />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                        <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="school" className="text-sm font-medium text-gray-700">Current School</label>
                      <Input id="school" placeholder="Enter your current school" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="program" className="text-sm font-medium text-gray-700">Program of Interest</label>
                      <select id="program" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500">
                        <option value="">Select a program</option>
                        <option value="college-applications">College Application Mastery</option>
                        <option value="test-prep">SAT/ACT Test Preparation</option>
                        <option value="mentorship">One-on-One Mentorship</option>
                        <option value="summer">Summer College Prep Intensive</option>
                        <option value="essay">College Essay Coaching</option>
                        <option value="executive">Executive Function Coaching</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="goals" className="text-sm font-medium text-gray-700">Academic and College Goals</label>
                      <Textarea id="goals" placeholder="Briefly describe your academic and college goals" rows={4} />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="questions" className="text-sm font-medium text-gray-700">Questions or Comments</label>
                      <Textarea id="questions" placeholder="Do you have any questions or additional information to share?" rows={3} />
                    </div>

                    <div className="pt-4">
                      <Button type="submit" size="lg" className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                        Submit Enrollment Form
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <Card className="card-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                        Enrollment Process
                      </h3>

                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="bg-college-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-college-blue-500 font-bold text-sm mr-3 mt-0.5 shrink-0">1</div>
                          <div>
                            <p className="font-medium text-gray-900">Complete Enrollment Form</p>
                            <p className="text-sm text-gray-700">Submit this form with your basic information.</p>
                          </div>
                        </li>

                        <li className="flex items-start">
                          <div className="bg-college-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-college-blue-500 font-bold text-sm mr-3 mt-0.5 shrink-0">2</div>
                          <div>
                            <p className="font-medium text-gray-900">Initial Consultation</p>
                            <p className="text-sm text-gray-700">Schedule a meeting with a program counselor.</p>
                          </div>
                        </li>

                        <li className="flex items-start">
                          <div className="bg-college-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-college-blue-500 font-bold text-sm mr-3 mt-0.5 shrink-0">3</div>
                          <div>
                            <p className="font-medium text-gray-900">Program Selection</p>
                            <p className="text-sm text-gray-700">Finalize your program choice and enrollment details.</p>
                          </div>
                        </li>

                        <li className="flex items-start">
                          <div className="bg-college-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-college-blue-500 font-bold text-sm mr-3 mt-0.5 shrink-0">4</div>
                          <div>
                            <p className="font-medium text-gray-900">Payment</p>
                            <p className="text-sm text-gray-700">Complete the payment process to secure your spot.</p>
                          </div>
                        </li>

                        <li className="flex items-start">
                          <div className="bg-college-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-college-blue-500 font-bold text-sm mr-3 mt-0.5 shrink-0">5</div>
                          <div>
                            <p className="font-medium text-gray-900">Begin Your Journey</p>
                            <p className="text-sm text-gray-700">Start working with your dedicated counselor or tutor.</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="card-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                        Questions?
                      </h3>
                      <p className="text-gray-700 mb-4">
                        If you have any questions about our programs or the enrollment process, please don't hesitate to contact us.
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Email:</strong> info@zoffnesscollageprep.com
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Phone:</strong> (914) 462-7797
                      </p>
                      <Button variant="outline" className="w-full border-college-blue-500 text-college-blue-500 hover:bg-college-blue-50">
                        Contact Us
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Enroll;
