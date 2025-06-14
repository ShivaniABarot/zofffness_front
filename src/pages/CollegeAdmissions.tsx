import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Award,
  Target,
  Clock,
  Users,
  Trophy,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const CollegeAdmissions = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                College Admissions Counseling
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Expert guidance throughout the entire college application
                process to help you gain admission to your dream schools.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Comprehensive Admissions Support
                </h2>
                <p className="text-lg text-gray-700">
                  Our experienced counselors provide personalized guidance to
                  navigate the complex college admissions landscape.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="card-shadow card-hover">
                  <CardContent className="p-6 text-center">
                    <Target className="h-12 w-12 text-college-blue-500 mx-auto mb-4" />

                    <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                      Strategic College Selection
                    </h3>
                    <p className="text-gray-700">
                      Create a balanced list of reach, target, and safety
                      schools that align with your academic profile and personal
                      goals.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-shadow card-hover">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-12 w-12 text-college-blue-500 mx-auto mb-4" />

                    <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                      Application Management
                    </h3>
                    <p className="text-gray-700">
                      Stay organized with customized timelines and regular
                      check-ins to ensure you meet all deadlines and
                      requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-shadow card-hover">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-college-blue-500 mx-auto mb-4" />

                    <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                      Interview Preparation
                    </h3>
                    <p className="text-gray-700">
                      Build confidence through mock interviews and personalized
                      feedback to help you make a strong impression.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-xl mb-12 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <img
                      src="/Rob-Adams-1.jpg"
                      alt="College Counselor"
                      className="w-64 h-96 object-cover shadow-lg rounded-lg"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                      Meet Rob Adams - Your College Admissions Expert
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Rob Adams is a New York State certified school counselor
                      with over 20 years of experience helping students and
                      families navigate the college process. He provides
                      personalized direction based on extensive data and
                      countless interactions with college admissions
                      representatives. Currently managing a caseload of over 200
                      students, Rob specializes in all aspects of counseling,
                      including working with students with IEPs and special
                      needs.
                    </p>
                    <p className="text-gray-700 mb-4">
                      A proud member of NACAC, ASCA, and WPRCA, Rob regularly
                      attends conferences to stay current with the latest
                      trends. His comprehensive knowledge comes from visiting
                      hundreds of schools and maintaining deep insights beyond
                      published information. Rob holds degrees from New Paltz,
                      Long Island University, and Stony Brook, bringing a wealth
                      of education and experience to help take the stress out of
                      the college admissions process.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-college-blue-500 mr-2" />

                        <span>NY State Certified</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-college-blue-500 mr-2" />

                        <span>200+ Active Students</span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 text-college-blue-500 mr-2" />

                        <span>20+ Years Experience</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-college-blue-500 mr-2" />

                        <span>NACAC & ASCA Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Our Counseling Programs
                </h3>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <GraduationCap className="h-10 w-10 text-college-blue-500" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">
                          Comprehensive Package
                        </h4>
                        <p className="text-gray-700 mb-4">
                          End-to-end support from 9th grade through college
                          acceptance, including academic planning,
                          extracurricular strategy, and application guidance.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-blue-500 mr-2 mt-0.5 shrink-0" />

                            <span>Unlimited counselor access</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-blue-500 mr-2 mt-0.5 shrink-0" />

                            <span>College list development</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-blue-500 mr-2 mt-0.5 shrink-0" />

                            <span>Essay review & feedback</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-blue-500 mr-2 mt-0.5 shrink-0" />

                            <span>Application review</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <Clock className="h-10 w-10 text-college-blue-500" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">
                          Senior Year Package
                        </h4>
                        <p className="text-gray-700 mb-4">
                          Focused support during the application season, ideal
                          for students who need guidance during the critical
                          senior year.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                            <span>Regular counselor meetings</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                            <span>Application strategy</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                            <span>Essay brainstorming</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                            <span>Decision guidance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-college-blue-500 hover:bg-college-blue-600"
                  asChild
                >
                  <Link to="/forms/college-admissions">
                    Schedule a Consultation (914) 462-7797
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

export default CollegeAdmissions;
