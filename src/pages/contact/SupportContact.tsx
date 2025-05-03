
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Mail, Phone, ArrowRight } from 'lucide-react';

const SupportContact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Contact Support
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Our team is here to help with any questions or issues you may have.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Get in Touch
                  </h3>
                  <p className="text-gray-700 mb-6">
                    If you're experiencing any issues with your account or need assistance with our services, our support team is ready to help.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-college-accent-purple mr-3 mt-1" />
                      <div>
                        <p className="font-semibold">Call Us</p>
                        <p className="text-gray-700">(914) 462-7797</p>
                        <p className="text-sm text-gray-500">Monday - Friday: 9am - 6pm ET</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-college-accent-purple mr-3 mt-1" />
                      <div>
                        <p className="font-semibold">Email Support</p>
                        <p className="text-gray-700">info@zoffnesscollageprep.com</p>
                        <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                    Send a Message
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        placeholder="Support request subject"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-college-blue-500 focus:border-college-blue-500"
                        placeholder="Describe your issue or question"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4 text-center">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-college-blue-500">How do I reset my password?</h4>
                    <p className="text-gray-700">You can reset your password by clicking the "Forgot Password" link on the login page. We'll send you an email with instructions to create a new password.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-college-blue-500">How do I update my billing information?</h4>
                    <p className="text-gray-700">You can update your billing information in your account settings under the "Billing" tab. Any changes will apply to your next billing cycle.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-college-blue-500">Can I reschedule a session?</h4>
                    <p className="text-gray-700">Yes, you can reschedule a session up to 24 hours before the scheduled time. Just log into your account and navigate to "My Sessions" to make changes.</p>
                  </div>
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

export default SupportContact;
