import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import {
  FileText,
  Lightbulb,
  Edit,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const EssayTips = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Essay Writing Tips
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Expert strategies and guidance to help you craft compelling
                college application essays.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Master the Art of College Essay Writing
                </h2>
                <p className="text-lg text-gray-700">
                  Your essays are a vital component of your college application,
                  providing a unique opportunity to share your voice,
                  perspective, and experiences with admissions officers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-college-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-7 w-7 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Brainstorming
                  </h3>
                  <p className="text-gray-700">
                    Discover effective techniques for generating authentic,
                    compelling essay topics that highlight your unique
                    qualities.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-college-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-7 w-7 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Structuring
                  </h3>
                  <p className="text-gray-700">
                    Learn how to organize your thoughts into a cohesive
                    narrative with a strong beginning, middle, and end.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-college-blue-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit className="h-7 w-7 text-college-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Revising
                  </h3>
                  <p className="text-gray-700">
                    Master the art of editing and polishing your essays to
                    create a powerful, error-free final draft.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Essential Essay Writing Tips
                </h3>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        1
                      </span>
                      Start Early
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Give yourself plenty of time for brainstorming, drafting,
                      revising, and getting feedback. Strong essays rarely
                      emerge from last-minute efforts. Begin at least two months
                      before your application deadlines.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        2
                      </span>
                      Be Authentic
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Admissions officers want to get to know the real you, not
                      who you think they want you to be. Write in your natural
                      voice about topics that genuinely matter to you, and let
                      your personality shine through.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        3
                      </span>
                      Show, Don't Tell
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Use specific details, sensory descriptions, and concrete
                      examples to bring your story to life. Instead of saying
                      "I'm passionate about science," describe the moment that
                      sparked that passion and how you've pursued it.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        4
                      </span>
                      Focus on Growth
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Colleges want to see how you've grown, learned, and
                      overcome challenges. Even seemingly ordinary experiences
                      can make compelling essays when you reflect on what they
                      taught you about yourself and the world.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        5
                      </span>
                      Revise Thoroughly
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Great writing is rewriting. Read your essay aloud to catch
                      awkward phrasing, check for grammar and spelling errors,
                      and ensure every word serves a purpose. Ask trusted
                      mentors or teachers for feedback.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Common Essay Mistakes to Avoid
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 text-red-500">
                          ✕
                        </div>
                        <p className="ml-2 text-gray-700">
                          <strong>Generic statements</strong> that could apply
                          to any student
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 text-red-500">
                          ✕
                        </div>
                        <p className="ml-2 text-gray-700">
                          <strong>Trying to impress</strong> with sophisticated
                          vocabulary or complex sentences
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 text-red-500">
                          ✕
                        </div>
                        <p className="ml-2 text-gray-700">
                          <strong>Repeating information</strong> found elsewhere
                          in your application
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 text-red-500">
                          ✕
                        </div>
                        <p className="ml-2 text-gray-700">
                          <strong>Writing what you think</strong> admissions
                          officers want to hear
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 text-red-500">
                          ✕
                        </div>
                        <p className="ml-2 text-gray-700">
                          <strong>Focusing only on achievements</strong> without
                          personal reflection
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 text-red-500">
                          ✕
                        </div>
                        <p className="ml-2 text-gray-700">
                          <strong>Overlooking proofreading</strong> for grammar
                          and spelling errors
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                  Need More Help With Your Essays?
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Our expert essay coaches can provide personalized guidance to
                  help you craft compelling, authentic essays that stand out to
                  admissions officers.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-college-blue-500 text-college-blue-500 hover:bg-college-blue-50"
                    asChild
                  >
                    <Link to="/essays/services">View Essay Services</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                  Free Essay Resources
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                    <a
                      href="#"
                      className="text-college-blue-500 hover:underline"
                    >
                      Essay Topic Brainstorming Worksheet
                    </a>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                    <a
                      href="#"
                      className="text-college-blue-500 hover:underline"
                    >
                      Personal Statement Structure Guide
                    </a>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                    <a
                      href="#"
                      className="text-college-blue-500 hover:underline"
                    >
                      Supplemental Essay Examples
                    </a>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                    <a
                      href="#"
                      className="text-college-blue-500 hover:underline"
                    >
                      Essay Revision Checklist
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EssayTips;
