
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Fade in animation for sections
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach((el) => fadeInObserver.observe(el));

    return () => {
      if (fadeElements) {
        fadeElements.forEach((el) => fadeInObserver.unobserve(el));
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />

        <div className="fade-in-section">
          <Programs />
        </div>

        <div className="fade-in-section">
          <About />
        </div>

        <div className="fade-in-section">
          <Testimonials />
        </div>

        <div className="fade-in-section">
          <CTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
