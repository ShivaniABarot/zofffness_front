import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, GraduationCap, PenTool, Brain } from 'lucide-react';

const ServiceSelection = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'SAT/ACT Diagnostic',
      description: 'Pinpoint Your Strengths and Weaknesses with Our Comprehensive SAT/ACT Diagnostic Test.',
      icon: GraduationCap,
      path: '/practice-tests',
      formPath: '/forms/sat-act-diagnostic',
      registerText: 'Schedule Your Diagnostic'
    },
    {
      title: 'SAT/ACT Course',
      description: 'Comprehensive test preparation with practice tests, strategies, and personalized coaching.',
      icon: BookOpen,
      path: '/programs/sat-act-preparation',
      formPath: '/forms/SatActCourseForm',
      registerText: 'Start Your Test Prep Journey'
    },
    {
      title: 'SAT/ACT Practice tests',
      description: 'Regular practice tests with comprehensive analysis and personalized feedback to track your progress.',
      icon: Brain,
      path: '/practice-tests',
      formPath: '/forms/sat-act-practice-test',
      registerText: 'Take a Practice Test'
    },
    {
      title: 'Executive Function',
      description: 'Develop essential skills in organization, time management, and academic planning.',
      icon: Brain,
      path: '/executive-coaching',
      formPath: '/forms/executive-function',
      registerText: 'Enhance Your Skills'
    },
    {
      title: 'College Admissions Counseling',
      description: 'Expert guidance through the entire college admissions process, from school selection to acceptance.',
      icon: GraduationCap,
      path: '/college-admissions',
      formPath: '/forms/college-admissions',
      registerText: 'Begin Your College Journey'
    },
    {
      title: 'College Essays',
      description: 'Expert guidance on crafting compelling personal statements and supplemental essays.',
      icon: PenTool,
      path: '/college-essays',
      formPath: '/forms/college-essays',
      registerText: 'Get Essay Support'
    }
   ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-college-blue-500 via-college-blue-400 to-college-accent-purple relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/Above-Main-Header.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white font-display mb-6 leading-tight drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Transform Your College Journey
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed drop-shadow-md" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Expert Guidance and Personalized Support for Every Step of Your College Preparation
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">

            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="bg-college-blue-100 p-4 rounded-full mb-6">
                        <service.icon className="h-12 w-12 text-college-blue-500" />
                      </div>
                      <h3 className="text-xl font-bold font-display text-college-blue-500 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 mb-6">{service.description}</p>

                      <Button
                        onClick={() => navigate(service.path)}
                        className="w-full bg-college-blue-500 hover:bg-college-blue-600 mb-2"
                      >
                        Learn More
                      </Button>
                      <Button
                        onClick={() => navigate(service.formPath)}
                        className="w-full bg-white hover:bg-gray-50 text-college-blue-500 hover:text-college-blue-600 font-medium mt-2"
                      >
                        {service.registerText}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceSelection;