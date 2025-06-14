import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Template for creating new pages
 * Copy this file and customize for each new page:
 *
 * 1. Rename the component to match the page name
 * 2. Update the page title and description in the hero section
 * 3. Add the main content sections relevant to the page
 * 4. Import any necessary components
 * 5. Update any data/props needed
 */

const PageTemplate = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-00 pb-16 md:pt-48 md:pb-20 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/20"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1
              className="text-4xl md:text-5xl font-bold text-white font-display mb-6 drop-shadow-lg"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              Page Title
            </h1>
            <p
              className="text-lg md:text-xl text-white mb-8 drop-shadow-md"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              Page description goes here. This should provide a brief overview
              of what the page is about.
            </p>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Add your page-specific content here */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Section Title
                </h2>
                <p className="text-lg text-gray-700">
                  Section description text. Provide more details about this
                  specific section.
                </p>
              </div>

              {/* Replace this with your actual content */}
              <div className="bg-gray-100 p-8 rounded-xl text-center">
                <p className="text-gray-500">Content goes here</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PageTemplate;
