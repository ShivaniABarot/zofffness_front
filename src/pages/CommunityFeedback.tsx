
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MessageSquare, Star, Send, ArrowRight, ThumbsUp, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Madalina",
    relation: "Student",
    content: "Highly recommend Zoffness College Prep for anyone navigating the college application process. The team truly goes above and beyond - with their knowledge, support, and genuine investment in their students' success.",
    rating: 5
  },
  {
    id: 2,
    name: "Deena Glassman",
    relation: "Parent",
    content: "Ben and his staff are all amazing. He worked with both of my boys and was able to increase their scores significantly. I highly recommend Zoffness Test Prep.",
    rating: 5
  },
  {
    id: 3,
    name: "Janine Clements",
    relation: "Parent",
    content: "The tutor was excellent. However the company could have done better diagnostics at the beginning of the process to make sure she took the right exam. Her initial diagnostic tests came out with similar results. She started off preparing for the SAT but after a few months tutoring she took the SAT test. She didn't do that well on it. They then suggested she switch to the ACT, which she did a lot better at.",
    rating: 4
  },
  {
    id: 4,
    name: "Joseph Lopez",
    relation: "Student",
    content: "Zoffness College Prep was a game-changer for me. My SAT tutor was incredibly knowledgeable, patient, and encouraging. The strategies I learned not only helped me improve my scores but also gave me the confidence I needed.",
    rating: 5
  },
  {
    id: 5,
    name: "Ciel DeCastro",
    relation: "Parent",
    content: "We highly recommend Zoffness College Prep & ACT/SAT Tutoring as both my boys enrolled in Ben's class and not only did they excelled in their SAT exams, they took away a kind and caring partner who, to this day, is a wonderful friend of our family. We are so very blessed having Ben in our lives.",
    rating: 5
  },
  {
    id: 6,
    name: "Sophie Sirkman",
    relation: "Student",
    content: "If you, or your child has ADHD, executive functioning disorder, dyslexia, or any sort of processing disorders and struggle with school the Zoffness test prep center is the place to go! Ben Zoffness's patience, understanding, and unique approach to teaching math catered to his students needs, enabled me to succeed beyond my expectations.",
    rating: 5
  },
  {
    id: 7,
    name: "Greg Mav",
    relation: "Parent",
    content: "Zoffness College Prep has been an absolute lifesaver for my son! Ben was incredibly patient and knowledgeable, breaking down complex concepts into easy-to-understand explanations. I wholeheartedly recommend their services to any parent looking to give their child the academic boost they need. Wish I could give this company 10 stars for what they did for my family.",
    rating: 5
  },
  {
    id: 8,
    name: "Frances Medico",
    relation: "Parent",
    content: "It's no surprise that Zoffness College Prep was awarded Best Tutoring Company in Westchester County! Both of my daughters had the privilege of working with this amazing team, and we were very happy with their scores. The test prep they received not only helped them excel on the SATs but also equipped them with valuable study skills that benefited them in all of their classes. Ben's passion for what he does is contagious—his enthusiasm shines through in every email and phone call. From the moment we reached out, it was clear he truly cares about helping students succeed.",
    rating: 5
  }
];

const CommunityFeedback = () => {
  const [showAllTestimonials, setShowAllTestimonials] = React.useState(false);
  const displayedTestimonials = showAllTestimonials ? testimonials : testimonials.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Community Feedback
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Read what our students and parents have to say about their experience with Zoffness College Prep.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <Quote className="h-12 w-12 text-college-accent-purple mx-auto mb-4" />
                <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                  Student & Parent Testimonials
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  We're proud of the positive impact we've had on our students' college journeys. Here's what our community has to say about their experience with us.
                </p>
              </div>
              
              <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {displayedTestimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="card-shadow">
                      <CardContent className="p-6">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-college-accent-gold text-college-accent-gold" />
                          ))}
                        </div>
                        <blockquote className="text-gray-700 mb-4 italic">
                          "{testimonial.content}"
                        </blockquote>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-college-blue-500">{testimonial.relation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button
                    onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                    variant="outline"
                    className="border-college-blue-500 text-college-blue-500 hover:bg-college-blue-50"
                  >
                    {showAllTestimonials ? 'Show Less' : 'View More'}
                    <ArrowRight className={`ml-2 h-5 w-5 transform transition-transform ${showAllTestimonials ? 'rotate-90' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="bg-college-blue-50 p-8 rounded-xl mb-8">
                    <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 flex items-center">
                      <MessageSquare className="mr-3 h-6 w-6" />
                      Share Your Experience
                    </h3>
                    <p className="text-gray-700 mb-6">
                      We value your feedback! If you've worked with Zoffness College Prep, please share your experience to help other families in their college preparation journey.
                    </p>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                          <Input id="name" placeholder="Enter your name" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                          <Input id="email" type="email" placeholder="Enter your email" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="relation" className="text-sm font-medium text-gray-700">Your Relationship</label>
                        <select id="relation" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-college-blue-500">
                          <option value="">Select your relationship</option>
                          <option value="student">Current Student</option>
                          <option value="alumni">Former Student</option>
                          <option value="parent">Parent</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Your Rating</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              key={star}
                              type="button"
                              className="text-gray-300 hover:text-college-accent-gold focus:outline-none"
                            >
                              <Star className="h-6 w-6" />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="testimonial" className="text-sm font-medium text-gray-700">Your Testimonial</label>
                        <Textarea 
                          id="testimonial" 
                          placeholder="Share your experience with Zoffness College Prep..." 
                          rows={5}
                          required
                        />
                      </div>
                      
                      <div className="flex items-start">
                        <input id="consent" type="checkbox" className="h-4 w-4 mt-1 mr-2" required />
                        <label htmlFor="consent" className="text-sm text-gray-700">
                          I consent to having my testimonial published on the Zoffness College Prep website and other promotional materials.
                        </label>
                      </div>
                      
                      <Button type="submit" className="bg-college-blue-500 hover:bg-college-blue-600">
                        Submit Testimonial
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6">
                    Our Success Metrics
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-white p-6 text-center card-shadow">
                      <div className="text-4xl font-bold text-college-blue-500 mb-2">95%</div>
                      <p className="text-gray-700">of our students are accepted to at least one of their top-choice colleges</p>
                    </Card>
                    
                    <Card className="bg-white p-6 text-center card-shadow">
                      <div className="text-4xl font-bold text-college-blue-500 mb-2">180+</div>
                      <p className="text-gray-700">average point increase on SAT scores after our test prep program</p>
                    </Card>
                    
                    <Card className="bg-white p-6 text-center card-shadow">
                      <div className="text-4xl font-bold text-college-blue-500 mb-2">98%</div>
                      <p className="text-gray-700">student and parent satisfaction rating</p>
                    </Card>
                    
                    <Card className="bg-white p-6 text-center card-shadow">
                      <div className="text-4xl font-bold text-college-blue-500 mb-2">92%</div>
                      <p className="text-gray-700">of our business comes from referrals and word-of-mouth</p>
                    </Card>
                  </div>
                  
                  <Card className="bg-college-blue-500 text-white p-6 card-shadow">
                    <div className="flex items-start mb-4">
                      <ThumbsUp className="h-10 w-10 mr-4 shrink-0" />
                      <div>
                        <h4 className="text-xl font-bold mb-2">Hear More Success Stories</h4>
                        <p className="text-white/90 mb-4">
                          Join us for a free webinar where current and former students share their experiences and college success stories.
                        </p>
                      </div>
                    </div>
                    <Button className="w-full bg-white text-college-blue-500 hover:bg-gray-100">
                      Register for Upcoming Webinar
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Card>
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

export default CommunityFeedback;
