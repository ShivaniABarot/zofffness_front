
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-college-blue-500 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
            Have questions about our programs or want to schedule a consultation?
            Reach out to us today. We're here to help you achieve your college dreams.
          </p>

          <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600 px-8 py-6 text-lg" asChild>
            <Link to="/contact/support">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;