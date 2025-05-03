
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowRight, CheckCircle2, Target, Users, BookOpen, Star } from 'lucide-react';

const OurApproach = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Our Approach to College Prep
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                A personalized, comprehensive methodology that guides students through every step of the college preparation journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                    Our Philosophy
                  </h2>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <p className="text-lg text-gray-700 mb-6">
                    At Zoffness College Prep, we believe that successful college preparation goes beyond simply getting into a prestigious university. Our approach focuses on helping students discover their authentic selves, develop their unique strengths, and find the colleges where they will truly thrive.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    We emphasize personal growth, academic excellence, and strategic planning throughout the college preparation process. By taking a holistic view of each student's journey, we ensure they not only gain admission to their dream schools but also develop the skills and confidence they need to succeed once they get there.
                  </p>
                  <div className="flex justify-center">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-college-blue-500 text-white">
                        <Target className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-college-blue-500 mb-1 text-center sm:text-left">
                          Student-Centered Approach
                        </h3>
                        <p className="text-gray-700">
                          Every aspect of our program is tailored to each student's unique needs and goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                    Our Methodology
                  </h2>
                  <p className="text-lg text-gray-700">
                    We've developed a comprehensive, four-phase approach to college preparation that has proven successful for thousands of students.
                  </p>
                </div>
                
                <div className="space-y-12">
                  <div className="bg-college-blue-50 p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4 flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-college-blue-500 text-white flex items-center justify-center text-3xl font-bold">1</div>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                          Discovery & Assessment
                        </h3>
                        <p className="text-gray-700 mb-4">
                          We begin by getting to know each student—their academic profile, extracurricular interests, personal values, and college aspirations.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Comprehensive academic assessment</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Interest and values exploration</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>College preference analysis</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-college-blue-50 p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4 flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-college-blue-500 text-white flex items-center justify-center text-3xl font-bold">2</div>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                          Strategic Planning
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Based on our assessment, we develop a personalized roadmap that outlines the specific steps and timeline for the student's college preparation journey.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Customized college preparation timeline</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Test preparation strategy</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Extracurricular development plan</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-college-blue-50 p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4 flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-college-blue-500 text-white flex items-center justify-center text-3xl font-bold">3</div>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                          Implementation & Guidance
                        </h3>
                        <p className="text-gray-700 mb-4">
                          We provide hands-on support and expert guidance as students execute their college preparation plan.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>One-on-one counseling sessions</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Test preparation tutoring</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Essay writing support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-college-blue-50 p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4 flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-college-blue-500 text-white flex items-center justify-center text-3xl font-bold">4</div>
                      </div>
                      <div className="md:w-3/4">
                        <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                          Application Finalization & Decision Support
                        </h3>
                        <p className="text-gray-700 mb-4">
                          We help students finalize their applications and support them through the decision-making process once acceptances arrive.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Application review and polishing</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>Interview preparation</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                            <span>College decision guidance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                    What We Offer
                  </h2>
                  <p className="text-lg text-gray-700">
                    Comprehensive services designed to maximize your college preparation success.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-college-blue-50 p-8 rounded-xl">
                    <div className="flex items-center mb-6">
                      <BookOpen className="h-10 w-10 text-college-accent-purple mr-4" />
                      <h3 className="text-2xl font-bold font-display text-college-blue-500">
                        Full-Length Practice Tests
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-6">
                      Comprehensive SAT and ACT practice tests designed to simulate the actual exam experience.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                        <span>Focus on time-management strategies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                        <span>Personalized attention to address individual weaknesses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                        <span>Comprehensive performance analysis</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-college-blue-50 p-8 rounded-xl">
                    <div className="flex items-center mb-6">
                      <Star className="h-10 w-10 text-college-accent-purple mr-4" />
                      <h3 className="text-2xl font-bold font-display text-college-blue-500">
                        College Admissions Counseling
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-6">
                      Expert guidance through every step of the college admissions process.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                        <span>Strategic college selection and application planning</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                        <span>College essay development and refinement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                        <span>Application review and submission support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                    Core Principles
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <Users className="h-8 w-8 text-college-accent-purple" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-college-blue-500 mb-2">
                          Personalized Attention
                        </h3>
                        <p className="text-gray-700">
                          We maintain small student-to-counselor ratios to ensure each student receives the individual attention they deserve.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <BookOpen className="h-8 w-8 text-college-accent-purple" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-college-blue-500 mb-2">
                          Educational Excellence
                        </h3>
                        <p className="text-gray-700">
                          We emphasize academic growth and intellectual development, not just application strategy.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <Target className="h-8 w-8 text-college-accent-purple" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-college-blue-500 mb-2">
                          Strategic Fit
                        </h3>
                        <p className="text-gray-700">
                          We help students find colleges where they will thrive academically, socially, and personally.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <Star className="h-8 w-8 text-college-accent-purple" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-college-blue-500 mb-2">
                          Authentic Presentation
                        </h3>
                        <p className="text-gray-700">
                          We guide students to present their genuine selves in applications, not manufactured versions they think colleges want to see.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600">
                  Learn About Our Programs
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

export default OurApproach;
