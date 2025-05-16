
import React from 'react';
import { Link } from 'react-router-dom';
import './ui/animated-button.css';

const CTA = () => {
  return (
    <>
      <section className="py-16 relative overflow-hidden my-12">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/down.jpeg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Darker gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl ml-0 md:ml-0 lg:ml-0">
            <div className="text-left pl-0 md:pl-0 lg:pl-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display text-white drop-shadow-md">
                Set Your Child Up for Success
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white max-w-xl drop-shadow-md">
                Enroll your child in our comprehensive college preparation program and give them the expert guidance, personalized mentorship, and proven strategies they need to excel. Support their academic journey and help turn their dream college into a reality.
              </p>
              <div className="flex gap-4">
                <Link to="/enroll" className="animated-button">
                  <span className="circle">
                    <span className="icon"></span>
                  </span>
                  <span className="button-text">Enroll Now</span>
                </Link>
                <Link to="/service-selection" className="animated-button">
                  <span className="circle">
                    <span className="icon"></span>
                  </span>
                  <span className="button-text">View Our Services</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
