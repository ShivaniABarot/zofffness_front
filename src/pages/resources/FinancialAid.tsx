
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, Calendar, DollarSign, FileText, HelpCircle } from 'lucide-react';

const FinancialAid = () => {
  const fafaTimeline = [
    {
      id: 1,
      period: "October 1",
      title: "FAFSA Opens",
      description: "The Free Application for Federal Student Aid becomes available for the upcoming academic year."
    },
    {
      id: 2,
      period: "October - December",
      title: "Gather Documentation",
      description: "Collect tax returns, W-2 forms, bank statements, and records of untaxed income."
    },
    {
      id: 3,
      period: "January - February",
      title: "Submit FAFSA",
      description: "Complete and submit your FAFSA, ideally by each school's priority deadline."
    },
    {
      id: 4,
      period: "February - March",
      title: "CSS Profile",
      description: "Submit the CSS Profile for private institutions that require it."
    },
    {
      id: 5,
      period: "March - April",
      title: "Review SAR",
      description: "Review your Student Aid Report and correct any errors promptly."
    },
    {
      id: 6,
      period: "April - May",
      title: "Financial Aid Offers",
      description: "Compare financial aid packages from different schools."
    }
  ];

  const aidTypes = [
    {
      id: 1,
      title: "Federal Grants",
      description: "Money from the federal government that doesn't need to be repaid. Includes Pell Grants, FSEOG, and TEACH Grants.",
      icon: <DollarSign className="h-8 w-8 text-college-accent-purple" />
    },
    {
      id: 2,
      title: "Federal Loans",
      description: "Money borrowed from the government that must be repaid with interest. Includes Direct Subsidized, Unsubsidized, and PLUS Loans.",
      icon: <FileText className="h-8 w-8 text-college-accent-purple" />
    },
    {
      id: 3,
      title: "Work-Study",
      description: "A program that provides part-time jobs for students with financial need, allowing them to earn money for education expenses.",
      icon: <Calendar className="h-8 w-8 text-college-accent-purple" />
    },
    {
      id: 4,
      title: "State Grants",
      description: "Financial aid provided by your state of residence, usually based on financial need and academic achievement.",
      icon: <DollarSign className="h-8 w-8 text-college-accent-purple" />
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "What is the difference between grants and loans?",
      answer: "Grants are financial aid that doesn't need to be repaid, similar to scholarships. Loans must be repaid with interest over time, typically after you graduate or leave school."
    },
    {
      id: 2,
      question: "Do I need to reapply for financial aid every year?",
      answer: "Yes, you need to submit a new FAFSA each academic year to maintain eligibility for federal, state, and many institutional financial aid programs."
    },
    {
      id: 3,
      question: "What documents do I need to complete the FAFSA?",
      answer: "You'll need tax returns, W-2 forms, bank statements, records of investments, and information about untaxed income. Both student and parent information is required for dependent students."
    },
    {
      id: 4,
      question: "Can I appeal my financial aid offer?",
      answer: "Yes, if your financial situation has changed since filing the FAFSA or if you have special circumstances, you can submit an appeal to the college's financial aid office."
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
                Financial Aid Guide
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Navigate the complexities of financial aid with our comprehensive guide to making college more affordable.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Understanding Financial Aid
                </h2>
                <p className="text-lg text-gray-700">
                  Financial aid can significantly reduce your college costs. Learn about the different types of aid, application processes, and strategies for maximizing your benefits.
                </p>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  Types of Financial Aid
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aidTypes.map(type => (
                    <Card key={type.id} className="card-shadow card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start mb-4">
                          {type.icon}
                          <h4 className="text-xl font-bold text-college-blue-500 ml-3">{type.title}</h4>
                        </div>
                        <p className="text-gray-700">{type.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  Financial Aid Timeline
                </h3>
                <div className="relative border-l-2 border-college-blue-200 pl-6 ml-4 space-y-10">
                  {fafaTimeline.map((item, index) => (
                    <div key={item.id} className="relative">
                      <div className="absolute -left-10 mt-1.5 h-5 w-5 rounded-full bg-college-blue-500"></div>
                      <h4 className="text-xl font-bold text-college-blue-500 mb-2">{item.period}</h4>
                      <h5 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h5>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                  FAFSA Tips & Strategies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Before You Apply
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Create your FSA ID early (both student and parent)</li>
                      <li>• Gather all required financial documents</li>
                      <li>• Research priority deadlines for each school</li>
                      <li>• List all schools you're applying to on your FAFSA</li>
                      <li>• Understand dependency status requirements</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      During the Process
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Use the IRS Data Retrieval Tool to reduce errors</li>
                      <li>• Don't leave any questions blank (use '0' if applicable)</li>
                      <li>• Save your work frequently</li>
                      <li>• Review all information before submitting</li>
                      <li>• Print or save confirmation pages</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      After Submission
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Review your Student Aid Report (SAR) promptly</li>
                      <li>• Correct any errors immediately</li>
                      <li>• Respond to verification requests quickly</li>
                      <li>• Compare financial aid offers carefully</li>
                      <li>• Appeal if your financial situation has changed</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-bold text-college-blue-500 mb-3">
                      Common Mistakes to Avoid
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Missing deadlines</li>
                      <li>• Reporting incorrect income or asset information</li>
                      <li>• Using the wrong social security number</li>
                      <li>• Forgetting to sign the application</li>
                      <li>• Assuming you won't qualify for aid</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6">
                  {faqs.map(faq => (
                    <Card key={faq.id} className="card-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <HelpCircle className="h-5 w-5 text-college-accent-purple mr-2 mt-1 shrink-0" />
                          <div>
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h4>
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                  Need Personalized Financial Aid Guidance?
                </h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Our financial aid experts can help you navigate the application process, understand your options, and develop strategies to maximize your aid.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="bg-college-blue-500 hover:bg-college-blue-600">
                    Schedule a Financial Aid Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Download Complete Financial Aid Guide
                  </Button>
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

export default FinancialAid;
