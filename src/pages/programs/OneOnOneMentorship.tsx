
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const OneOnOneMentorship = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                One-on-One Mentorship
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Personalized guidance to help you navigate the college admissions process with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Dedicated Support Every Step of the Way
                </h2>
                <p className="text-lg text-gray-700">
                  Our mentorship program pairs you with an experienced college admissions expert who will guide you through every aspect of the college application process.
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
                      <span>Personalized mentorship tailored to your unique goals and needs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Regular one-on-one sessions with your dedicated mentor</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Comprehensive guidance on college selection and applications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Essay brainstorming and review sessions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                      <span>Test preparation strategies and academic advising</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                    alt="Mentor working with student" 
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Our Mentors
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our mentors are experienced admissions professionals, including former admissions officers, college counselors, and education specialists with proven success.
                  </p>
                  <p className="text-gray-700">
                    Each mentor is carefully selected for their expertise, passion for education, and ability to connect with students.
                  </p>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Mentorship Programs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Freshman/Sophomore Package
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Early guidance to build a strong foundation for college success. Focus on academic planning, extracurricular development, and long-term strategy.
                    </p>
                    <p className="font-semibold">6-month program</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Junior Year Intensive
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Comprehensive preparation during this critical year. Includes college list development, test prep strategy, essay planning, and application roadmap.
                    </p>
                    <p className="font-semibold">8-month program</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Senior Year Application Support
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Focused guidance through application season. Includes essay editing, application review, interview prep, and decision support.
                    </p>
                    <p className="font-semibold">4-month program</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600" asChild>
                  <Link to="/mentorship/schedule">
                    Schedule a Mentorship Consultation
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

export default OneOnOneMentorship;
