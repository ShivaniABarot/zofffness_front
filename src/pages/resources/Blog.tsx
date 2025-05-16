
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Stand Out in Competitive College Applications",
      excerpt: "Discover unique strategies to make your application memorable to admissions officers at selective institutions.",
      author: "Dr. Jennifer Chang",
      date: "April 2, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The New SAT: Changes and Preparation Strategies",
      excerpt: "A comprehensive overview of recent SAT changes and how to adapt your study approach for optimal results.",
      author: "Mark Wilson",
      date: "March 27, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "College Essay Topics to Avoid in 2025",
      excerpt: "Learn which overused topics admissions officers are tired of seeing and what to write about instead.",
      author: "Sophia Lee",
      date: "March 15, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Finding the Right Financial Aid Package",
      excerpt: "Navigate the complex world of college financial aid with these expert tips for maximizing your awards.",
      author: "Carlos Rodriguez",
      date: "March 8, 2025",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "The Benefits of Gap Year Experiences",
      excerpt: "Explore how a thoughtfully planned gap year can enhance your college application and personal growth.",
      author: "Emma Thompson",
      date: "February 25, 2025",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Crafting an Authentic Personal Statement",
      excerpt: "Step-by-step guidance for writing a compelling personal statement that authentically represents your voice.",
      author: "Dr. Jennifer Chang",
      date: "February 18, 2025",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
      <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-blue-400/70 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/20"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6 drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                College Admissions Blog
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Expert insights, tips, and strategies to guide you through the college admissions process.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Featured post - larger layout */}
                <div className="md:col-span-3 mb-8">
                  <Card className="overflow-hidden card-shadow card-hover">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2">
                        <img
                          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                          alt="College admission process"
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-6 md:p-8">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-4">April 5, 2025</span>
                          <User className="h-4 w-4 mr-1" />
                          <span className="mr-4">Dr. Michael Zoffness</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>15 min read</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold font-display text-college-blue-500 mb-4">
                          2025 College Admissions Trends: What Every Applicant Needs to Know
                        </h2>
                        <p className="text-gray-700 mb-6">
                          The college admissions landscape continues to evolve, with significant changes affecting how applications are evaluated. From test-optional policies becoming permanent at many institutions to the growing emphasis on demonstrated interest and authentic extracurricular involvement, understanding these trends is crucial for strategic application planning.
                        </p>
                        <Button className="bg-college-blue-500 hover:bg-college-blue-600">
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Regular blog posts */}
                {blogPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden card-shadow card-hover">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{post.date}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-college-blue-500 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">By {post.author}</span>
                        <Button variant="outline" size="sm" className="text-college-blue-500 border-college-blue-500 hover:bg-college-blue-50">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <Button variant="outline" size="lg" className="border-college-blue-500 text-college-blue-500 hover:bg-college-blue-50">
                  Load More Articles
                </Button>
              </div>

              <div className="mt-16 bg-college-blue-50 p-8 md:p-12 rounded-xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-college-blue-500 mb-4">
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                    Stay updated with the latest college admissions tips, event announcements, and exclusive content delivered directly to your inbox.
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-college-blue-500"
                    />
                    <Button className="bg-college-blue-500 hover:bg-college-blue-600 whitespace-nowrap">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
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

export default Blog;
