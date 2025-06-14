import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CollegeEssays = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                College Essay Writing
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Craft compelling essays that showcase your unique voice and help
                you stand out in the competitive college admissions process.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Our Essay Writing Program
                </h2>
                <p className="text-lg text-gray-700">
                  Work one-on-one with our experienced essay coaches to develop
                  authentic, impactful essays that truly represent who you are.
                </p>
              </div>

              {/* College Essays Image */}
              <div className="mb-12">
                <div
                  className="w-full h-[400px] rounded-xl shadow-md bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: "url(/college-essays.jpg)",
                    backgroundPosition: "center 30%",
                  }}
                  aria-label="Students working on college essays with a teacher"
                ></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <FileText className="h-12 w-12 text-college-accent-purple mb-4" />

                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Personal Statement Development
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Develop a powerful personal statement that tells your unique
                    story and makes a lasting impression on admissions officers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Brainstorming and topic selection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Structure and outline guidance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Multiple revision rounds</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <FileText className="h-12 w-12 text-college-accent-purple mb-4" />

                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-2">
                    Supplemental Essays
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Craft tailored supplemental essays for each college,
                    addressing their specific prompts while maintaining your
                    authentic voice.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>School-specific research</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>"Why us" essay strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />

                      <span>Activity and achievement highlights</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4 text-center">
                  Our Essay Writing Process
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span className="text-2xl font-bold text-college-blue-500">
                        1
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Discovery</h4>
                    <p className="text-gray-700">
                      Explore your experiences, values, and goals to identify
                      compelling essay topics.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span className="text-2xl font-bold text-college-blue-500">
                        2
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Development
                    </h4>
                    <p className="text-gray-700">
                      Create outlines, draft your essays, and refine your
                      writing with expert guidance.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span className="text-2xl font-bold text-college-blue-500">
                        3
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Refinement</h4>
                    <p className="text-gray-700">
                      Receive detailed feedback and polish your essays until
                      they're submission-ready.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-xl mb-12 border border-gray-200 shadow-sm">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Five-Session Essay Writing Package
                </h3>
                <p className="text-gray-700 mb-8 text-center">
                  Work with our essay expert through a structured program
                  designed to help you create compelling and personal responses
                  for your college applications.
                </p>
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide relative">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        1
                      </span>
                      Session One
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Brainstorm ideas and focal points for possible responses.
                      Identify the most appropriate questions to address. Begin
                      drafting the main portions of essays using a series of
                      tailored prompts.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        2
                      </span>
                      Session Two
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Evaluate drafts or written exercises generated during the
                      previous session. Identify and collate the strongest
                      responses into a complete framework for the final essay.
                      Assess the writing for descriptive and analytical depth.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        3
                      </span>
                      Session Three
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Begin to hone the draft for contextual, rhetorical, and
                      analytical completeness. Identify where vividness, logic,
                      and/or transitions need to be strengthened. Scan the
                      completed draft for possible alternative connections or
                      conclusions.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        4
                      </span>
                      Session Four
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Fine-tune exposition and linkages, word-by-word, and
                      line-by-line. Consider word limits, cut all superfluous
                      information, and ensure all "best fit" information and
                      explanation is thoroughly and appropriately expressed.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3 flex items-center">
                      <span className="bg-college-blue-500 text-white h-7 w-7 rounded-full flex items-center justify-center mr-3">
                        5
                      </span>
                      Session Five
                    </h4>
                    <p className="text-gray-700 ml-10">
                      Review and polish the final draft. Check one final time to
                      ensure vocabulary and sentence structure has been achieved
                      for maximum effectiveness. Proofread for concision and
                      flawlessness.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="animate-bounce">
                    <ArrowRight className="h-6 w-6 text-college-blue-500 transform rotate-90" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-college-blue-500 hover:bg-college-blue-600"
                  asChild
                >
                  <Link to="/forms/college-essays">
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

export default CollegeEssays;
