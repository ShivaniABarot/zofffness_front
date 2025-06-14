import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Sitemap = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Sitemap
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Find your way around our website with this comprehensive guide
                to all our pages.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h2 className="text-xl font-bold font-display text-college-blue-500 mb-4 border-b border-gray-200 pb-2">
                    Main Pages
                  </h2>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/college-essays"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        College Essays
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/college-admissions"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        College Admissions Counseling
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/practice-tests"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Practice Tests
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/executive-coaching"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Executive Function Coaching
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/our-team"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Our Team
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/our-approach"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Our Approach
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold font-display text-college-blue-500 mb-4 border-b border-gray-200 pb-2">
                    Programs
                  </h2>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/programs/college-application-mastery"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        College Application Mastery
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/programs/sat-act-preparation"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        SAT/ACT Test Preparation
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/programs/one-on-one-mentorship"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        One-on-One Mentorship
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/programs/summer-intensive"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Summer College Prep Intensive
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/programs/virtual-tutoring"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Virtual Tutoring
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold font-display text-college-blue-500 mb-4 border-b border-gray-200 pb-2">
                    Resources
                  </h2>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/resources/blog"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        College Admissions Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/resources/test-resources"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        SAT/ACT Test Resources
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/resources/essay-tips"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Essay Writing Tips
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/resources/scholarships"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Scholarship Information
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/resources/financial-aid"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Financial Aid Guide
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold font-display text-college-blue-500 mb-4 border-b border-gray-200 pb-2">
                    Utility Pages
                  </h2>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/enroll"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Enroll
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/online-payment"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Online Payment
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/community-feedback"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Community Feedback
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/legal/privacy-policy"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/legal/terms-of-service"
                        className="text-gray-700 hover:text-college-blue-500 transition-colors"
                      >
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-xl font-bold font-display text-college-blue-500 mb-4 border-b border-gray-200 pb-2">
                  Account Pages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/account/dashboard"
                          className="text-gray-700 hover:text-college-blue-500 transition-colors"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/settings"
                          className="text-gray-700 hover:text-college-blue-500 transition-colors"
                        >
                          Account Settings
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/account/earnings"
                          className="text-gray-700 hover:text-college-blue-500 transition-colors"
                        >
                          Payments & Billing
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/sign-out"
                          className="text-gray-700 hover:text-college-blue-500 transition-colors"
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-16 p-8 bg-college-blue-50 rounded-xl">
                <h2 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                  External Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="https://collegeboard.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-college-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>College Board</span>
                  </a>
                  <a
                    href="https://act.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-college-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>ACT</span>
                  </a>
                  <a
                    href="https://studentaid.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-college-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Federal Student Aid</span>
                  </a>
                  <a
                    href="https://commonapp.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-college-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Common Application</span>
                  </a>
                  <a
                    href="https://coalitionforcollegeaccess.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-college-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Coalition Application</span>
                  </a>
                  <a
                    href="https://nacacnet.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-college-blue-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>
                      National Association for College Admission Counseling
                    </span>
                  </a>
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

export default Sitemap;
