
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, Calendar, DollarSign, Award, Search } from 'lucide-react';

const Scholarships = () => {
  const featuredScholarships = [
    {
      id: 1,
      name: "Zoffness Merit Scholarship",
      amount: "$5,000",
      deadline: "December 15, 2025",
      eligibility: "High school seniors with demonstrated academic excellence and leadership",
      description: "Annual scholarship awarded to exceptional students who demonstrate academic excellence, leadership qualities, and commitment to community service."
    },
    {
      id: 2,
      name: "Future Leaders Grant",
      amount: "$3,000",
      deadline: "January 30, 2026",
      eligibility: "High school juniors and seniors with leadership roles",
      description: "Supports students who have demonstrated leadership abilities in school, extracurricular activities, or community initiatives."
    },
    {
      id: 3,
      name: "STEM Excellence Award",
      amount: "$2,500",
      deadline: "February 28, 2026",
      eligibility: "Students pursuing degrees in Science, Technology, Engineering, or Mathematics",
      description: "Recognizes students with exceptional achievements in STEM fields and who plan to pursue STEM majors in college."
    }
  ];

  const nationalScholarships = [
    {
      id: 1,
      name: "Gates Scholarship",
      amount: "Full Cost of Attendance",
      deadline: "September 15, 2025",
      eligibility: "High-achieving, Pell-eligible minority students"
    },
    {
      id: 2,
      name: "Coca-Cola Scholars Program",
      amount: "$20,000",
      deadline: "October 31, 2025",
      eligibility: "High school seniors with strong leadership and service"
    },
    {
      id: 3,
      name: "Jack Kent Cooke Foundation Scholarship",
      amount: "Up to $55,000 per year",
      deadline: "November 18, 2025",
      eligibility: "High-achieving seniors with financial need"
    },
    {
      id: 4,
      name: "Elks National Foundation Scholarship",
      amount: "$50,000",
      deadline: "November 15, 2025",
      eligibility: "High school seniors, US citizens"
    },
    {
      id: 5,
      name: "Ron Brown Scholar Program",
      amount: "$40,000",
      deadline: "January 9, 2026",
      eligibility: "African American high school seniors"
    },
    {
      id: 6,
      name: "Questbridge National College Match",
      amount: "Full Four-Year Scholarship",
      deadline: "September 30, 2025",
      eligibility: "High-achieving seniors with low income"
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
                Scholarship Information
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Your comprehensive guide to finding and securing financial support for your college education.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Find Your Path to Affordable Education
                </h2>
                <p className="text-lg text-gray-700">
                  Discover scholarships that match your unique profile and learn proven strategies for submitting winning applications.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 mb-12 items-center">
                <div className="w-full md:w-1/2 order-2 md:order-1">
                  <div className="bg-college-blue-50 p-6 md:p-8 rounded-xl">
                    <h3 className="text-xl font-bold font-display text-college-blue-500 mb-4">
                      Scholarship Search Tool
                    </h3>
                    <p className="text-gray-700 mb-5">
                      Find scholarships tailored to your academic achievements, interests, background, and career goals.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Grade Level
                        </label>
                        <select id="grade" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500">
                          <option value="">Select your grade</option>
                          <option value="high-school-junior">High School Junior</option>
                          <option value="high-school-senior">High School Senior</option>
                          <option value="college-freshman">College Freshman</option>
                          <option value="college-sophomore">College Sophomore</option>
                          <option value="college-junior">College Junior</option>
                          <option value="college-senior">College Senior</option>
                          <option value="graduate-student">Graduate Student</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                          Intended Major/Field of Study
                        </label>
                        <select id="major" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500">
                          <option value="">Select a field</option>
                          <option value="business">Business & Management</option>
                          <option value="engineering">Engineering</option>
                          <option value="humanities">Humanities</option>
                          <option value="science">Natural Sciences</option>
                          <option value="social-science">Social Sciences</option>
                          <option value="arts">Fine Arts</option>
                          <option value="health">Health Sciences</option>
                          <option value="education">Education</option>
                          <option value="technology">Technology & Computer Science</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600">
                        Search Scholarships
                        <Search className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                    alt="Students celebrating scholarship" 
                    className="rounded-xl shadow-md w-full h-80 object-cover"
                  />
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  Featured Scholarships
                </h3>
                <div className="space-y-6">
                  {featuredScholarships.map(scholarship => (
                    <Card key={scholarship.id} className="overflow-hidden card-shadow card-hover">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 bg-college-blue-50 p-6 flex flex-col justify-center items-center">
                            <DollarSign className="h-12 w-12 text-college-accent-purple mb-2" />
                            <div className="text-xl font-bold text-college-blue-500">{scholarship.amount}</div>
                            <div className="flex items-center text-sm text-gray-600 mt-2">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Due: {scholarship.deadline}</span>
                            </div>
                          </div>
                          <div className="md:w-3/4 p-6">
                            <h4 className="text-xl font-bold text-college-blue-500 mb-2">{scholarship.name}</h4>
                            <p className="text-sm text-gray-600 mb-3"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                            <p className="text-gray-700 mb-4">{scholarship.description}</p>
                            <Button variant="outline" size="sm" className="text-college-blue-500 border-college-blue-500 hover:bg-college-blue-50">
                              View Details & Apply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  National Scholarships
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nationalScholarships.map(scholarship => (
                    <Card key={scholarship.id} className="card-shadow card-hover">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-college-blue-500">{scholarship.name}</h4>
                          <div className="bg-college-blue-100 text-college-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {scholarship.amount}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Deadline: {scholarship.deadline}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full text-college-blue-500 border-college-blue-500 hover:bg-college-blue-50">
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                      Our Scholarship Application Services
                    </h3>
                    <p className="text-gray-700 mb-5">
                      Let our experts help you maximize your scholarship opportunities with personalized guidance and application support.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Scholarship Search:</strong> Customized scholarship matching based on your unique profile.</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Essay Coaching:</strong> One-on-one assistance crafting compelling scholarship essays.</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Application Review:</strong> Thorough review of your applications to ensure they stand out.</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-college-accent-purple mr-2 mt-0.5 shrink-0" />
                        <span><strong>Deadline Management:</strong> Organized tracking of application requirements and deadlines.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="text-xl font-bold text-college-blue-500 mb-4 text-center">
                        Get Expert Help
                      </h4>
                      <Button className="w-full bg-college-blue-500 hover:bg-college-blue-600 mb-3">
                        Schedule a Consultation
                      </Button>
                      <Button variant="outline" className="w-full mb-3">
                        Download Free Guide
                      </Button>
                      <p className="text-sm text-center text-gray-600">
                        Our students secure an average of $25,000 in scholarship awards
                      </p>
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

export default Scholarships;
