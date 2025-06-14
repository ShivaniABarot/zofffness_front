import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Brain,
  GraduationCap,
} from "lucide-react";

const SATACTPreparation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-8">
                SAT/ACT Course
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10">
                Expert coaching and proven strategies to help your child
                maximize their standardized test scores.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Comprehensive Test Preparation
                </h2>
                <p className="text-lg text-gray-700">
                  Our specialized SAT/ACT preparation programs combine content
                  mastery, strategic test-taking techniques, and extensive
                  practice to help your child achieve their highest potential
                  score.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-college-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-7 w-7 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Content Mastery
                  </h3>
                  <p className="text-gray-700">
                    Targeted review of essential concepts, formulas, and
                    vocabulary to build a strong foundation for success.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-college-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-7 w-7 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Test Strategies
                  </h3>
                  <p className="text-gray-700">
                    Proven techniques for approaching different question types,
                    managing time effectively, and making strategic guesses.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-college-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-7 w-7 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Progress Tracking
                  </h3>
                  <p className="text-gray-700">
                    Regular practice tests and detailed performance analysis to
                    monitor improvement and target weak areas.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <img
                    src="/programssat-act-preparation.jpg"
                    alt="SAT Preparation"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />

                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-3">
                    SAT Preparation
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Reading comprehension and analysis strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>
                        Evidence-based writing and language techniques
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Mathematics problem-solving approaches</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Official practice test analysis and review</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <img
                    src="/programssat-act-preparation (2).jpg"
                    alt="ACT Preparation"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />

                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-3">
                    ACT Preparation
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>English grammar and rhetorical skills mastery</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Mathematics concept review and shortcuts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Reading speed and comprehension techniques</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Science data interpretation strategies</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-8 text-center">
                  Program Options
                </h3>
                <div className="max-w-2xl mx-auto">
                  <Card className="overflow-hidden card-shadow card-hover border-2 border-college-blue-100">
                    <div className="bg-college-blue-50 p-4 flex items-center justify-center">
                      <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center shadow-sm">
                        <GraduationCap className="h-8 w-8 text-college-accent-purple" />
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <h4 className="text-2xl font-bold font-display text-college-blue-500 mb-4 text-center">
                        One-on-one Instructions for Your Child's Success
                      </h4>
                      <p className="text-gray-700 mb-6 text-center">
                        We provide one-on-one instruction tailored to your
                        child's unique learning style, pace, and academic needs.
                      </p>
                      <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-6 w-6 text-college-accent-purple mr-3 mt-0.5 shrink-0" />

                            <span className="text-gray-800">
                              Customized study plans based on diagnostic
                              assessments
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-6 w-6 text-college-accent-purple mr-3 mt-0.5 shrink-0" />

                            <span className="text-gray-800">
                              Flexible scheduling to fit your family's busy
                              calendar
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-6 w-6 text-college-accent-purple mr-3 mt-0.5 shrink-0" />

                            <span className="text-gray-800">
                              Focused attention on your child's specific
                              challenges and strengths
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-6 w-6 text-college-accent-purple mr-3 mt-0.5 shrink-0" />

                            <span className="text-gray-800">
                              Give your child the individualized support they
                              need to thrive — and the confidence to succeed
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-college-blue-500">
                          Starting at $120/hour
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-college-blue-500 hover:bg-college-blue-600"
                  asChild
                >
                  <Link to="/consultation/schedule">
                    Schedule a Consultation
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

export default SATACTPreparation;
