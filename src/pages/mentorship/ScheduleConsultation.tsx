
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const ScheduleConsultation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Schedule a Mentorship Consultation
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Take the first step toward personalized guidance for your college journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Book Your Free 30-Minute Consultation
                </h2>
                <p className="text-lg text-gray-700">
                  During this session, we'll discuss your goals, answer your questions, and determine how our mentorship program can best support your college aspirations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    How It Works
                  </h3>
                  <ol className="space-y-6">
                    <li className="flex">
                      <div className="bg-college-blue-500 text-white rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">1</div>
                      <div>
                        <h4 className="font-semibold">Select a Date & Time</h4>
                        <p className="text-gray-700">Choose a consultation slot that fits your schedule.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-college-blue-500 text-white rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">2</div>
                      <div>
                        <h4 className="font-semibold">Complete Brief Questionnaire</h4>
                        <p className="text-gray-700">Share some information about your goals and interests.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-college-blue-500 text-white rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">3</div>
                      <div>
                        <h4 className="font-semibold">Receive Confirmation</h4>
                        <p className="text-gray-700">Get an email with meeting details and preparation tips.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="bg-college-blue-500 text-white rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">4</div>
                      <div>
                        <h4 className="font-semibold">Meet Your Mentor</h4>
                        <p className="text-gray-700">Connect via video call to discuss your college preparation needs.</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Schedule Your Session
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="date"
                          className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="time"
                          className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        >
                          <option value="">Select a time</option>
                          <option value="morning">Morning (9am - 12pm)</option>
                          <option value="afternoon">Afternoon (12pm - 4pm)</option>
                          <option value="evening">Evening (4pm - 7pm)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Grade
                      </label>
                      <select
                        id="grade"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                      >
                        <option value="">Select your grade</option>
                        <option value="9">9th Grade</option>
                        <option value="10">10th Grade</option>
                        <option value="11">11th Grade</option>
                        <option value="12">12th Grade</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                      Book Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 rounded-xl text-center">
                <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                  What to Expect During Your Consultation
                </h3>
                <p className="text-gray-700 mb-6">
                  Our initial consultation is designed to understand your unique situation and goals. We'll discuss your academic background, extracurricular activities, college aspirations, and any specific challenges you're facing. By the end of the session, you'll have a clear understanding of how our mentorship program can help you achieve your goals.
                </p>
                <p className="text-gray-700 italic">
                  "The consultation was incredibly helpful. I came in feeling overwhelmed about college applications, but left with a clear plan and confidence about the next steps." — Sophia K., Yale '24
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScheduleConsultation;
