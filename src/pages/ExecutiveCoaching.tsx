
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BrainCircuit, CheckCircle2, ArrowRight, Clock, Calendar, Lightbulb } from 'lucide-react';

const ExecutiveCoaching = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Executive Function Coaching
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Build essential skills for academic success and lifelong achievement through personalized coaching.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Strengthen Your Executive Function Skills
                </h2>
                <p className="text-lg text-gray-700">
                  Our specialized coaching helps students develop the cognitive skills necessary for academic success and beyond.
                </p>
              </div>

              <div className="mb-12">
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex justify-center">
                      <BrainCircuit className="h-24 w-24 text-college-accent-purple" />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                        What Are Executive Functions?
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Executive functions are the cognitive processes that enable us to plan, focus attention, remember instructions, juggle multiple tasks, and regulate our actions. These skills are essential for academic achievement and lifelong success.
                      </p>
                      <p className="text-gray-700">
                        Our coaching program helps students strengthen these skills through personalized strategies and consistent practice, leading to improved performance in school and beyond.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                Key Skills We Develop
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="card-shadow card-hover">
                  <CardContent className="p-6">
                    <Lightbulb className="h-10 w-10 text-college-accent-purple mb-4" />
                    <h4 className="text-xl font-bold text-college-blue-500 mb-2">
                      Planning & Organization
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Learn to create effective study schedules, manage assignments, and organize materials.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Time management systems</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Digital organization tools</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Project planning</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-shadow card-hover">
                  <CardContent className="p-6">
                    <Clock className="h-10 w-10 text-college-accent-purple mb-4" />
                    <h4 className="text-xl font-bold text-college-blue-500 mb-2">
                      Focus & Attention
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Develop strategies to improve concentration and minimize distractions while studying.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Distraction management</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Focus techniques</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Study environment optimization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-shadow card-hover">
                  <CardContent className="p-6">
                    <Calendar className="h-10 w-10 text-college-accent-purple mb-4" />
                    <h4 className="text-xl font-bold text-college-blue-500 mb-2">
                      Task Initiation & Completion
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Overcome procrastination and develop routines to start and finish assignments effectively.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Anti-procrastination strategies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Goal setting & tracking</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Consistent work habits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-12">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3">
                      <img
                        src="/Kelsey-Berg.jpg"
                        alt="Kelsey Berg - Executive Function Coach"
                        className="w-full rounded-lg shadow-md"
                      />
                      <h3 className="text-xl font-bold font-display text-college-blue-500 mt-4 text-center">
                        Kelsey Berg
                      </h3>
                      <p className="text-center text-gray-600">Executive Function Coach</p>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                        Meet Your Executive Function Coach
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Kelsey is a passionate and dedicated Executive Function Coach with over five years of experience helping students develop lifelong thinking and learning skills. She excels at cultivating abilities, attitudes, and knowledge to help students identify and regulate emotions, pursue positive studying practices, and make responsible decisions through personalized lesson plans.
                      </p>
                      <p className="text-gray-700 mb-4">
                        With a proven track record of organizing and executing hundreds of successful sessions, Kelsey has assisted thousands of students in achieving their unique learning objectives. Her interactive lessons make mastering critical cognitive and developmental skills both entertaining and engaging.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-bold text-college-blue-500 mb-2">Education & Expertise</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                            <span>Bachelor of Arts in English Literature - Florida State University</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                            <span>Bachelor of Science in Cognitive Psychology - Florida State University</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                            <span>Over 5 years of Executive Function Coaching experience</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  Our Coaching Approach
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-college-blue-500 mb-4">
                      Personalized Assessment
                    </h4>
                    <p className="text-gray-700 mb-4">
                      We begin with a comprehensive assessment to identify your specific executive function strengths and challenges.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Detailed skills evaluation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Learning style analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Academic performance review</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-college-blue-500 mb-4">
                      Customized Coaching Plan
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Based on your assessment, we develop a tailored coaching plan with specific strategies and tools.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Weekly coaching sessions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Skill-building exercises</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span>Regular progress monitoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600">
                  Schedule a Coaching Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExecutiveCoaching;
