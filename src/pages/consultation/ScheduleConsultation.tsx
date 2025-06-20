import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Calendar, Clock, User, ArrowRight, HelpCircle } from "lucide-react";

const ScheduleConsultation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Schedule Your 60-Minute Consultation
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Discover how we can help your child achieve their college
                admissions goals.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Schedule Your 60-Minute Consultation
                </h2>
                <p className="text-lg text-gray-700">
                  Our consultation is designed to understand your child's unique
                  needs and show how our expert programs can guide them toward
                  top college admissions — while giving you peace of mind. Fill
                  out the form below or call us at (914) 462-7797 to get
                  started.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    What to Expect During Your Consultation
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-college-blue-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <HelpCircle className="h-5 w-5 text-college-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Understand Your Child's Goals
                        </h4>
                        <p className="text-gray-700">
                          We'll discuss your child's academic background,
                          extracurricular involvement, and college aspirations
                          to understand their unique journey.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-college-blue-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <HelpCircle className="h-5 w-5 text-college-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Identify Where Support is Needed Most
                        </h4>
                        <p className="text-gray-700">
                          Together, we'll pinpoint the areas where personalized
                          guidance can make the greatest impact.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-college-blue-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <HelpCircle className="h-5 w-5 text-college-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Discover the Right Program Fit
                        </h4>
                        <p className="text-gray-700">
                          Explore how our tailored services align with your
                          child's needs and long-term goals.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-college-blue-100 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <HelpCircle className="h-5 w-5 text-college-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Get Peace of Mind</h4>
                        <p className="text-gray-700">
                          Ask us anything about the admissions process — we're
                          here to provide clarity and confidence every step of
                          the way.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Get Started Today
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                          placeholder="Parent/Guardian name"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="date"
                          className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Time
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="time"
                          className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        >
                          <option value="">Select a time</option>
                          <option value="morning">Morning (9am - 12pm)</option>
                          <option value="afternoon">
                            Afternoon (12pm - 4pm)
                          </option>
                          <option value="evening">Evening (4pm - 7pm)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="interest"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Primary Interest for Your Child
                      </label>
                      <select
                        id="interest"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                      >
                        <option value="">
                          Select your child's primary interest
                        </option>
                        <option value="application">
                          College Application Support
                        </option>
                        <option value="essays">Essay Coaching</option>
                        <option value="test">SAT/ACT Test Preparation</option>
                        <option value="mentorship">
                          One-on-One Mentorship
                        </option>
                        <option value="summer">Summer Programs</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                      Schedule Your Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 rounded-xl text-center">
                <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                  Our Consultations Are Always:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Ready when you are</p>
                    <p className="text-sm text-gray-700">
                      No obligation or pressure
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Personalized</p>
                    <p className="text-sm text-gray-700">
                      Focused on your specific needs
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold">Informative</p>
                    <p className="text-sm text-gray-700">
                      You'll gain valuable insights
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Our initial consultation gave us clarity about what our son
                  needed to focus on for his applications. It was the first step
                  in a journey that led to his acceptance at his dream school."
                  — Jennifer T., Parent of Stanford '25 Student
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ScheduleConsultation;
