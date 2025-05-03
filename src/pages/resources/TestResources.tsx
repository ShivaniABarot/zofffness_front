
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, Download, CheckCircle2 } from 'lucide-react';

const TestResources = () => {
  const satResources = [
    {
      id: 1,
      title: "SAT Math Formula Sheet",
      description: "A comprehensive list of all math formulas needed for the SAT exam.",
      type: "PDF",
      size: "1.2 MB"
    },
    {
      id: 2,
      title: "SAT Reading Comprehension Strategies",
      description: "Learn effective approaches to tackle the reading section of the SAT.",
      type: "PDF",
      size: "2.4 MB"
    },
    {
      id: 3,
      title: "SAT Writing Section Guide",
      description: "Tips and tricks for mastering the writing and language section.",
      type: "PDF",
      size: "1.8 MB"
    }
  ];

  const actResources = [
    {
      id: 1,
      title: "ACT Science Section Guide",
      description: "Strategies for interpreting graphs, tables, and research summaries in the ACT Science section.",
      type: "PDF",
      size: "2.1 MB"
    },
    {
      id: 2,
      title: "ACT Math Formulas & Concepts",
      description: "Key mathematical formulas and concepts frequently tested on the ACT exam.",
      type: "PDF",
      size: "1.5 MB"
    },
    {
      id: 3,
      title: "ACT English Grammar Rules",
      description: "Essential grammar rules and punctuation guidelines for the ACT English section.",
      type: "PDF",
      size: "1.9 MB"
    }
  ];

  const practiceMaterials = [
    {
      id: 1,
      title: "SAT Practice Test 1",
      description: "Full-length practice test with answer key and detailed explanations.",
      type: "PDF",
      size: "4.5 MB"
    },
    {
      id: 2,
      title: "ACT Practice Test 1",
      description: "Complete ACT practice test with scoring guide and answer explanations.",
      type: "PDF",
      size: "4.8 MB"
    },
    {
      id: 3,
      title: "SAT/ACT Comparison Worksheet",
      description: "Help determine which test is right for you by comparing your performance.",
      type: "PDF",
      size: "0.9 MB"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                SAT/ACT Test Resources
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Free study materials, practice tests, and preparation guides to help you excel on your standardized tests.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Free Test Preparation Resources
                </h2>
                <p className="text-lg text-gray-700">
                  Download our curated collection of SAT and ACT prep materials to boost your test scores and confidence.
                </p>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  SAT Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {satResources.map(resource => (
                    <Card key={resource.id} className="card-shadow card-hover">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">{resource.title}</h4>
                        <p className="text-gray-700 mb-4">{resource.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{resource.type} • {resource.size}</span>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  ACT Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {actResources.map(resource => (
                    <Card key={resource.id} className="card-shadow card-hover">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">{resource.title}</h4>
                        <p className="text-gray-700 mb-4">{resource.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{resource.type} • {resource.size}</span>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  Practice Tests & Materials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {practiceMaterials.map(resource => (
                    <Card key={resource.id} className="card-shadow card-hover">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold text-college-blue-500 mb-2">{resource.title}</h4>
                        <p className="text-gray-700 mb-4">{resource.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{resource.type} • {resource.size}</span>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                      Test Preparation Tips
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Start early:</strong> Begin your test prep 3-6 months before your test date.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Take practice tests:</strong> Regularly complete full-length practice tests under timed conditions.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Review mistakes:</strong> Thoroughly analyze incorrect answers to understand your weak areas.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Focus on strategy:</strong> Learn test-specific strategies rather than just content.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Manage time:</strong> Practice time management for each section of the test.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                      Need More Help?
                    </h3>
                    <p className="text-gray-700 mb-5">
                      Our specialized test preparation programs provide personalized coaching, structured practice, and proven strategies to maximize your score.
                    </p>
                    <div className="space-y-4">
                      <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                        Explore SAT Preparation Program
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                        Explore ACT Preparation Program
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        Schedule a Consultation
                      </Button>
                    </div>
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

export default TestResources;
