
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { CheckCircle2, ArrowRight, FileText, Clock, Users } from 'lucide-react';

const EssayServices = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Essay Services
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Expert guidance to help you craft compelling, authentic college application essays.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Our Essay Services
                </h2>
                <p className="text-lg text-gray-700">
                  From brainstorming to final polish, we offer comprehensive support for all aspects of your college application essays.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center flex flex-col">
                  <div className="bg-college-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Essay Brainstorming
                  </h3>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Discover unique topics that highlight your strengths, experiences, and personal qualities through guided brainstorming sessions.
                  </p>
                  <p className="font-bold text-college-blue-500">Starting at $150</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center flex flex-col">
                  <div className="bg-college-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Essay Coaching
                  </h3>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Work one-on-one with an experienced essay coach who will guide you through the entire writing process, from outline to final draft.
                  </p>
                  <p className="font-bold text-college-blue-500">Starting at $500</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center flex flex-col">
                  <div className="bg-college-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Essay Review
                  </h3>
                  <p className="text-gray-700 mb-4 flex-grow">
                    Get detailed feedback on your essays, with suggestions for improvement in content, structure, style, and grammar.
                  </p>
                  <p className="font-bold text-college-blue-500">Starting at $200</p>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Comprehensive Essay Packages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-4">Common App Essay Package</h4>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Two brainstorming sessions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Outline and structure development</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Three rounds of detailed feedback</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Final proofreading and polish</span>
                      </li>
                    </ul>
                    <p className="font-bold text-college-blue-500 text-center mb-4">$750</p>
                    <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                      Select Package
                    </Button>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-4">Complete Essay Package</h4>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Common App Essay Package (everything above)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Support for up to 5 supplemental essays</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Activity list and additional writing review</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Strategy for each specific university</span>
                      </li>
                    </ul>
                    <p className="font-bold text-college-blue-500 text-center mb-4">$1,750</p>
                    <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                      Select Package
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Our Essay Coaching Process
                </h3>
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-college-blue-200 hidden md:block"></div>
                  <div className="space-y-12">
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="md:text-right">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">Discovery & Brainstorming</h4>
                        <p className="text-gray-700">
                          We begin by getting to know you—your experiences, values, goals, and what makes you unique. Through targeted exercises and conversations, we'll identify compelling topics that showcase your authentic self.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-college-blue-500 z-10"></div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4 md:mt-0">
                          <p className="italic text-gray-700">
                            "My coach asked me questions no one had ever asked before, which led to an essay topic I never would have considered but that truly represented who I am."
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="order-2 md:order-1">
                        <div className="relative">
                          <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-college-blue-500 z-10"></div>
                          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4 md:mt-0">
                            <p className="italic text-gray-700">
                              "The structure and outline phase was where everything clicked for me. I finally understood how to organize my thoughts in a way that would captivate readers."
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="order-1 md:order-2 md:text-left">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">Structure & Drafting</h4>
                        <p className="text-gray-700">
                          We'll develop a clear outline and structure for your essay, ensuring it has a compelling beginning, meaningful middle, and powerful conclusion. Then we'll work with you as you develop your initial drafts.
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="md:text-right">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">Feedback & Revision</h4>
                        <p className="text-gray-700">
                          Your coach will provide detailed, constructive feedback on multiple drafts of your essay. We focus on content, structure, voice, and impact, helping you refine your writing to make it more engaging and authentic.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-college-blue-500 z-10"></div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4 md:mt-0">
                          <p className="italic text-gray-700">
                            "The feedback process was invaluable. My coach helped me see where I could dig deeper and where I could be more concise, all while keeping my authentic voice."
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="order-2 md:order-1">
                        <div className="relative">
                          <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-college-blue-500 z-10"></div>
                          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4 md:mt-0">
                            <p className="italic text-gray-700">
                              "When we finalized my essay, I felt so proud of what I'd created. It was polished but still sounded like me—just the best version of my writing self."
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="order-1 md:order-2 md:text-left">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">Finalization & Polish</h4>
                        <p className="text-gray-700">
                          In the final stage, we'll help you polish your essay to perfection, ensuring it's clear, error-free, adheres to word limits, and most importantly, powerfully communicates who you are to admissions officers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600">
                  Schedule a Free Essay Consultation
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

export default EssayServices;
