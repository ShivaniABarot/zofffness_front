
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { CheckCircle2, ArrowRight, Monitor } from 'lucide-react';

const VirtualTutoring = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Virtual Tutoring Program
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Expert academic support from anywhere in the world, tailored to your unique learning needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Personalized Learning, Boundless Possibilities
                </h2>
                <p className="text-lg text-gray-700">
                  Our virtual tutoring program delivers the same high-quality, personalized instruction as our in-person sessions, with the added convenience of learning from anywhere.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Program Benefits
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Flexible scheduling to accommodate your busy life</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>One-on-one sessions with expert tutors in your subject areas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Interactive digital whiteboard and collaborative tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Recorded sessions for later review and study</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Regular progress reports and customized study materials</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                    alt="Student in virtual tutoring session" 
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Our Virtual Platform
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our secure, user-friendly virtual learning environment is designed specifically for educational success. Features include:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Monitor className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>HD video conferencing with screen sharing</span>
                    </li>
                    <li className="flex items-start">
                      <Monitor className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Interactive digital whiteboard with math symbols</span>
                    </li>
                    <li className="flex items-start">
                      <Monitor className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Document sharing and collaborative editing</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Subjects We Offer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Mathematics
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>Pre-Algebra</li>
                      <li>Algebra I & II</li>
                      <li>Geometry</li>
                      <li>Trigonometry</li>
                      <li>Pre-Calculus</li>
                      <li>AP Calculus AB/BC</li>
                      <li>AP Statistics</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Sciences
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>Biology</li>
                      <li>Chemistry</li>
                      <li>Physics</li>
                      <li>Earth Science</li>
                      <li>AP Biology</li>
                      <li>AP Chemistry</li>
                      <li>AP Physics</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Humanities & Test Prep
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>English Language Arts</li>
                      <li>Essay Writing & Composition</li>
                      <li>History & Social Studies</li>
                      <li>SAT Preparation</li>
                      <li>ACT Preparation</li>
                      <li>AP Exam Preparation</li>
                      <li>Study Skills & Organization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600">
                  Schedule Your Virtual Tutoring Session
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

export default VirtualTutoring;
