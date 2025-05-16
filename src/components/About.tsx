
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Award, Users, BookOpen, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-college-blue-500 mb-6">
              About Zoffness College Prep
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Since 2005, Zoffness College Prep has been dedicated to helping students navigate the complex college
              admissions process and achieve their academic dreams. We believe every student deserves personalized
              guidance to unleash their full potential.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our team of experienced educators and admissions specialists provides expert guidance,
              practical strategies, and unwavering support to ensure our students stand out among thousands
              of applicants and secure spots at their dream schools.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <Award className="h-6 w-6 text-college-accent-purple mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Expert Mentors</h3>
                  <p className="text-gray-600">Former admissions officers and educators</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-6 w-6 text-college-accent-purple mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Personalized Approach</h3>
                  <p className="text-gray-600">Customized plans for each student</p>
                </div>
              </div>
              <div className="flex items-start">
                <BookOpen className="h-6 w-6 text-college-accent-purple mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Proven Methods</h3>
                  <p className="text-gray-600">Research-backed strategies</p>
                </div>
              </div>
              <div className="flex items-start">
                <TrendingUp className="h-6 w-6 text-college-accent-purple mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Track Record</h3>
                  <p className="text-gray-600">95% acceptance rate to top choices</p>
                </div>
              </div>
            </div>

            <Button className="bg-college-blue-500 hover:bg-college-blue-600" asChild>
              <Link to="/our-team">
                Meet Our Team
              </Link>
            </Button>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-college-blue-500/10 to-college-blue-500/0"></div>
              <img src="/big.jpg" alt="About Zoffness College Prep" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-52 h-52 rounded-xl overflow-hidden shadow-lg hidden md:block group">
              <img src="/2small.jpg" alt="Small decorative image" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-xl overflow-hidden shadow-lg hidden md:block group">
              <img src="/1small.jpg" alt="Small decorative image" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
