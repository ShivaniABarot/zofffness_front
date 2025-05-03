
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import CountUpAnimation from './CountUpAnimation';

const testimonials = [
  {
    id: 1,
    name: "Gabby Kelly",
    testimonial: "We had an exceptional experience with Zoffness College Prep! Ben and his team took a truly personalized approach, carefully matching my son with a tutor who fit his personality and learning style perfectly. This thoughtful pairing made all the difference, keeping him engaged and motivated throughout the process. The expertise and dedication of the tutors were evident, and the results spoke for themselves. I highly recommend Zoffness College Prep to any family looking for top-notch academic support!",
    rating: 5
  },
  {
    id: 2,
    name: "Alan Music",
    testimonial: "My daughter is having a wonderful experience with Zoffness. It has been a completely personalized experience that has already yielded meaningful results. The tutors clicked with my daughter to the extent that she actually wanted to go to the tutoring sessions. Everyone has been an absolute pleasure to work with, including the owner, Ben Zoffness. He and Ben Hartman have both made this experience very easy. Thank you!",
    rating: 5
  },
  {
    id: 3,
    name: "Elene Spanakos-Weis",
    testimonial: "An exceptional personal experience and boosted score outcome for our second son. Ben and his team build authentic personal relationships and effectively play the role of testing coach to optimize your child's potential outcome. We used the test prep competition for our first son and much preferred the overall experience with the Zoffness personalized approach. We will return to Zoffness for our third son. Highly recommend!",
    rating: 5
  },
  {
    id: 4,
    name: "Karen Murabito",
    testimonial: "Ben Zoffness helped both of our children achieve their potential in college testing, one on the ACT and the other on the SAT. The Zoffness tutors are real educators and specialists. We have worked with other local tutoring agencies that employ recent college graduates…smart kids but not the same quality of coaching and attention you get from the Zoffness team.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="success" className="py-20 bg-testimonial-pattern">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-college-blue-500 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our students go on to attend prestigious universities and achieve their academic dreams. 
            Here's what they have to say about their experience with us.
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={() => {
              const container = document.getElementById('testimonials-container');
              if (container) container.scrollLeft -= container.offsetWidth;
            }} 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-college-blue-500" />
          </button>
          
          <button 
            onClick={() => {
              const container = document.getElementById('testimonials-container');
              if (container) container.scrollLeft += container.offsetWidth;
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-college-blue-500" />
          </button>

          <div id="testimonials-container" className="flex overflow-x-auto pb-4 space-x-6 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white card-shadow card-hover flex-none w-[85vw] md:w-[400px] snap-center">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-college-accent-gold text-college-accent-gold" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.testimonial}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-college-blue-50 rounded-2xl p-8 lg:p-12 shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <CountUpAnimation
                targetValue={180}
                className="text-4xl lg:text-5xl text-college-blue-500 mb-2 font-display"
              />
              <p className="text-gray-700">Average super-scored SAT improvement 2023</p>
            </div>
            <div className="text-center p-4">
              <CountUpAnimation
                targetValue={2800000}
                prefix="$"
                className="text-4xl lg:text-5xl text-college-blue-500 mb-2 font-display"
              />
              <p className="text-gray-700">in scholarships have been earned</p>
            </div>
            <div className="text-center p-4">
              <CountUpAnimation
                targetValue={7}
                className="text-4xl lg:text-5xl text-college-blue-500 mb-2 font-display"
              />
              <p className="text-gray-700">Average super-scored ACT composite improvement 2023</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
