import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-48 pb-32 md:pt-56 md:pb-28 lg:pt-64 lg:pb-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/team-images/hero-home.jpg"
          alt="College Success Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-0"></div>

      {/* Hero content */}
      <div className="container relative z-10 mx-auto px-9 md:px-5">
        <div className="max-w-3xl mx-auto md:mx-0 md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-6 leading-tight drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Your Path to <span className="text-college-accent-gold">College Success</span> Starts Here
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
            Expert college preparation, personalized mentorship, and proven strategies to help you get accepted to your dream schools.
          </p>
          <div className="flex justify-start">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white hover:opacity-90 px-8 py-3 rounded-full shadow-lg transform transition-transform hover:scale-105"
              asChild
            >
              <Link to="/consultation/schedule">Schedule Consultation</Link>
            </Button>
          </div>

          <div className="mt-12 flex items-center space-x-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"></div>
              ))}
            </div>
            <p className="text-white text-sm">
              <span className="font-semibold">500+</span> students successfully placed in top universities
            </p>
          </div>

          <div className="mt-8 inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full transform hover:scale-105 transition-transform">
            <p className="text-college-accent-gold font-semibold text-sm md:text-base">
              Voted as the Best Tutoring Company in Westchester County
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
