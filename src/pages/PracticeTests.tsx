
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { BookOpen, BarChart, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const PracticeTests = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                SAT & ACT Practice Tests
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Take full-length, authentic practice tests under realistic conditions to prepare for test day success.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Realistic Test Preparation
                </h2>
                <p className="text-lg text-gray-700">
                  Our practice tests simulate the actual testing experience, helping you build confidence and improve your scores.
                </p>
              </div>

              {/* Practice Tests Image */}
              <div className="mb-12">
                <img
                  src="/practice-tests.jpg"
                  alt="Students taking practice tests"
                  className="w-full rounded-xl shadow-md object-cover h-80"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <BookOpen className="h-12 w-12 text-college-accent-purple mb-4" />
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    SAT Practice Tests
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Take official SAT practice tests in a simulated test environment that mirrors the actual test day experience.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                      <span>Full-length, timed practice tests</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                      <span>Detailed score reports</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                      <span>Question-by-question analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                      <span>Personalized study plan</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600" asChild>
                    <Link to="/forms/sat-act-practice-test">
                      Register for SAT Practice
                    </Link>
                  </Button>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <BookOpen className="h-12 w-12 text-college-accent-purple mb-4" />
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    ACT Practice Tests
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Experience authentic ACT practice tests with the same timing, format, and content as the actual exam.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                      <span>Complete 4-section practice tests</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                      <span>Comprehensive scoring</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                      <span>Strength/weakness analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-3 mt-0.5 shrink-0" />
                      <span>Targeted improvement strategies</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600" asChild>
                    <Link to="/forms/sat-act-practice-test">
                      Register for ACT Practice
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <BarChart className="h-16 w-16 text-college-accent-purple" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                      Score Analysis & Improvement
                    </h3>
                    <p className="text-gray-700 mb-4">
                      After each practice test, you'll receive a comprehensive score report with detailed analysis of your performance.
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Section-by-section breakdown</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Question type analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Time management insights</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Targeted study recommendations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <TrendingUp className="h-10 w-10 text-college-accent-purple" />
                  </div>
                  <h4 className="text-lg font-bold text-college-blue-500 mb-2">Average Score Increase</h4>
                  <p className="text-3xl font-bold text-college-blue-500 font-display">+150</p>
                  <p className="text-gray-700">points on the SAT</p>
                </div>
                <div className="text-center">
                  <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <TrendingUp className="h-10 w-10 text-college-accent-purple" />
                  </div>
                  <h4 className="text-lg font-bold text-college-blue-500 mb-2">Average Score Increase</h4>
                  <p className="text-3xl font-bold text-college-blue-500 font-display">+4</p>
                  <p className="text-gray-700">points on the ACT</p>
                </div>
                <div className="text-center">
                  <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <TrendingUp className="h-10 w-10 text-college-accent-purple" />
                  </div>
                  <h4 className="text-lg font-bold text-college-blue-500 mb-2">Practice Tests Taken</h4>
                  <p className="text-3xl font-bold text-college-blue-500 font-display">5,000+</p>
                  <p className="text-gray-700">by our students annually</p>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600" asChild>
                  <Link to="/forms/sat-act-practice-test">
                    View Upcoming Test Dates
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
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

export default PracticeTests;
