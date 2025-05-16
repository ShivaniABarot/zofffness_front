
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { CheckCircle2, ArrowRight, Calendar, Clock } from 'lucide-react';

const SummerIntensive = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Summer College Prep Intensive
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Accelerate your college preparation with our comprehensive summer program designed for motivated high school students.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Make This Summer Count
                </h2>
                <p className="text-lg text-gray-700">
                  Our intensive summer program helps you make significant progress on your college applications while developing essential skills that will serve you throughout your academic career.
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
                      <span>Small group workshops and individualized attention</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Complete your Common App and personal statement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Develop a strategic college list tailored to your goals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>SAT/ACT test preparation and strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Interview preparation and practice sessions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    alt="Summer intensive session"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Program Details
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Calendar className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span><strong>Dates:</strong> June 15 - August 7, 2025</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span><strong>Schedule:</strong> Monday-Thursday, 9:00 AM - 2:00 PM</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span><strong>Location:</strong> In-person at our center and virtual options available</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span><strong>Eligibility:</strong> Rising juniors and seniors (Classes of 2026 and 2027)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Weekly Focus Areas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Week 1-2: Foundation Building
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>College search and list development</li>
                      <li>Understanding application timelines</li>
                      <li>Personal narrative development</li>
                      <li>Activity list and resume crafting</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Week 3-4: Essay Workshop
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>Common App essay brainstorming and drafting</li>
                      <li>Supplemental essay strategies</li>
                      <li>Editing and revision techniques</li>
                      <li>Peer review sessions</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Week 5-6: Test Preparation
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>SAT/ACT content review</li>
                      <li>Test-taking strategies</li>
                      <li>Practice tests and analysis</li>
                      <li>Individualized study plans</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Week 7-8: Application Refinement
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>Common App completion</li>
                      <li>Interview preparation</li>
                      <li>Final essay revisions</li>
                      <li>Action plan for fall semester</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600">
                  Enroll in Summer Intensive Program
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

export default SummerIntensive;
