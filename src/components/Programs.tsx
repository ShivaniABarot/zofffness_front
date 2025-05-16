
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, GraduationCap, FileText, Users, Clock, BookOpen } from 'lucide-react';

const programsData = [
  {
    id: 1,
    title: "SAT/ACT Test Preparation",
    description: "Proven strategies and personalized coaching to maximize your standardized test scores.",
    icon: <BookOpen className="h-10 w-10 text-college-blue-500" />,
    features: [
      "Diagnostic assessment and custom study plan",
      "Expert instruction in all test sections",
      "Practice tests with detailed analysis",
      "Score improvement strategies",
    ],
    popular: true,
    url: "/programs/sat-act-preparation"
  },
  {
    id: 2,
    title: "College Application Mastery",
    description: "Comprehensive guidance through the entire college application process, from school selection to acceptance letters.",
    icon: <FileText className="h-10 w-10 text-college-blue-500" />,
    features: [
      "Strategic college selection guidance",
      "Essay writing and personal statement support",
      "Application review and optimization",
      "Interview preparation",
    ],
    popular: false,
    url: "/programs/college-application-mastery"
  },
  {
    id: 3,
    title: "One-on-One Mentorship",
    description: "Personalized guidance from experienced mentors who have helped students get into top schools.",
    icon: <Users className="h-10 w-10 text-college-blue-500" />,
    features: [
      "Weekly one-on-one coaching sessions",
      "Personalized academic planning",
      "Extracurricular activity optimization",
      "Long-term educational strategy",
    ],
    popular: false,
    url: "/programs/one-on-one-mentorship"
  },
  {
    id: 4,
    title: "Summer College Prep Intensive",
    description: "Accelerated summer program to jumpstart your college preparation journey.",
    icon: <Clock className="h-10 w-10 text-college-blue-500" />,
    features: [
      "Two-week intensive preparation",
      "Small group workshops and personalized attention",
      "Complete application package development",
      "College visit planning and preparation",
    ],
    popular: false,
    url: "/programs/summer-intensive"
  },
];

const Programs = () => {
  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-college-blue-500 mb-4">Our Programs</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Comprehensive college preparation programs designed to help you achieve your academic goals and secure admission to your dream school.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programsData.map((program) => (
            <Card key={program.id} className="card-shadow card-hover flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-2 hover:border-college-blue-500">
              {program.popular && (
                <div className="bg-college-blue-500 text-white text-sm font-semibold py-1 px-3 absolute right-4 top-4 rounded-full">
                  Popular Choice
                </div>
              )}
              <CardHeader className="pt-8">
                <div className="mb-4">{program.icon}</div>
                <CardTitle className="text-xl font-display">{program.title}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-college-blue-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600 transition-all duration-300 hover:shadow-md" asChild>
                  <Link to={program.url}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
