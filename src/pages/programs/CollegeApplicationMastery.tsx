
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const CollegeApplicationMastery = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                College Application Mastery
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                A comprehensive program designed to help your child navigate every step of the college application process with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Master the College Application Journey — Together
                </h2>
                <p className="text-lg text-gray-700">
                  Our College Application Mastery program offers your child personalized guidance, expert strategies, and comprehensive support to create standout applications for the top colleges. Give them the confidence and tools they need to navigate the admissions process successfully.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Program Highlights
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Personalized application strategy tailored to your strengths and goals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Comprehensive Common App and supplemental essay guidance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Activity list and resume development workshops</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Interview preparation and practice sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Detailed application review before submission</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    alt="Students working on college applications"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Program Details
                  </h3>
                  <ul className="space-y-2">
                    <li><strong>Duration:</strong> 12 weeks</li>
                    <li><strong>Format:</strong> Weekly one-on-one sessions</li>
                    <li><strong>Resources:</strong> Exclusive access to our application materials library</li>
                    <li><strong>Support:</strong> Unlimited email support between sessions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4 text-center">
                  Student Success Stories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="italic text-gray-700 mb-4">
                      "The College Application Mastery program was exactly what I needed. My counselor helped me highlight my unique strengths and craft compelling essays that truly represented who I am. I was accepted to 6 of my 8 schools, including my top choice!"
                    </p>
                    <p className="font-semibold">— Jamie S., Stanford University '26</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="italic text-gray-700 mb-4">
                      "I was overwhelmed by the application process until I joined this program. The structured approach and personalized guidance gave me clarity and confidence. My counselor went above and beyond to help me put my best foot forward."
                    </p>
                    <p className="font-semibold">— Alex T., Brown University '25</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600">
                  Enroll in College Application Mastery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollegeApplicationMastery;
