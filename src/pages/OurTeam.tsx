import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Ben Zoffness",
    title: "Founder and President",
    education: "B.A. from the University of Wisconsin-Madison, M.B.A.",
    experience: "25+ years of tutoring experience",
    bio: "Ben holds a B.A. from the University of Wisconsin-Madison and then went on to receive his M.B.A. to pursue his entrepreneurial ambitions. He began tutoring students 25 years ago and has, since then, mastered the SAT and ACT strategies required to score in the 99th percentile. Ben has helped thousands of students maximize their academic performance with confidence. Inspired by the challenges of SAT vs ACT assessment, Ben created and developed Zoffness College Prep's proprietary software which provides a comprehensive online analysis, complete with statistical data and insight, of each student's strengths and weaknesses to determine which test is the best fit. This program has saved valuable time for students and reduced the cost for clients. His company provides classroom and individualized instruction, within a multitude of subject areas with a focus on innovative solutions, which allows students to grow personally and professionally. His motivation is continuously fueled by celebratory phone calls and emails from his clients sharing that they gained acceptance into their top collegiate choices, which is often paired with merit-based scholarships.",
    image: "/team-images/Ben-1.jpg",
  },
  {
    id: 2,
    name: "Ben Hartman",
    title: "Program Director",
    education: "Ph.D. from the University of Chicago",
    experience:
      "Jacob K. Javits Fellow and top instructor with the university's Writing Program",
    bio: "A language arts specialist, Ben earned his Ph.D. from the University of Chicago, where he was a Jacob K. Javits Fellow and a top instructor with the university's Writing Program. Over the past seven years, his teaching has helped students achieve their highest potential in the Verbal sections of the ISEE, SSAT, SAT, ACT, GRE, and GMAT exams, as well as college essay writing. Ben's focus on building mastery of core strategies, modeling positive feedback, and inspiring self-confidence has delivered outsized results across a broad range of ages, backgrounds, and ability levels. By adapting his approach to fit the unique needs of each student, he has helped students place in the 99th percentile of test takers and go on to study at universities including Princeton, NYU, Brown, and the University of Chicago. Outside of the classroom, Ben enjoys backpacking, playing piano, and spending time with his four nieces and nephews.",
    image: "/team-images/HSF-2.jpg",
  },
  {
    id: 3,
    name: "Caiden Leavitt",
    title:
      "SAT/ACT Specialist, AP Language, AP Literature, Literature Subject Test, and College Essays",
    education: "B.A. in English Literature from Cornell University",
    experience:
      "Trained in PAF (Preventing Academic Failure) and TBWS (Teaching Basic Writing Skills)",
    bio: "Caiden graduated from Cornell University with a B.A. in English Literature. Upon graduation, she worked at the prestigious Windward School which specializes in language based learning disabilities, where she was intensively trained in PAF (Preventing Academic Failure) and TBWS (Teaching Basic Writing Skills). Since then, she has worked for several years with students of all ability levels on standardized test prep. Many of Caiden's students have gone on to earn scores that were above their target score and even into the 99th percentile. She also specializes in college essays and has helped many of her students get into the college of their choice. In addition to her work as a tutor, Caiden has developed an extensive standardized test prep curriculum and worked with parents directly to evaluate their students' needs and to help them find an instructor who is the best fit for their child. She knows that so much of the academic success of the student depends on the relationship with their instructors and is committed to helping students find instructors that make them feel both safe and challenged. Caiden believes that test prep is a skill that can be learned and does not set any limits on what students can achieve.",
    image: "/team-images/zoffnesscollegeprep-3.jpg",
  },
  {
    id: 4,
    name: "Aniruddha Deb",
    title:
      "SAT/ACT Math, AP Calculus BC/AB, AP Chemistry, & AP Physics Specialist",
    education:
      "Ph.D in Physics with research on Materials Science and Engineering",
    experience:
      "Scientist at Lawrence Berkeley National Laboratory, SLAC National Accelerator Laboratory and Japan Synchrotron Radiation Research Institute (JASRI)",
    bio: "Aniruddha holds a Ph.D in Physics with research on Materials Science and Engineering. He worked as a Scientist at the prestigious Lawrence Berkeley National Laboratory, SLAC National Accelerator Laboratory and Japan Synchrotron Radiation Research Institute (JASRI). He has been teaching all levels of science and math from middle school to high school, SAT/ACT Math, AP Calculus BC/AB, AP Chemistry and AP Physics for over 15 years. Many of his students over the years have earned scores of 5 on their AP examinations and perfect scores on SAT/ACT Math. In addition to motivating students in math and science, he also mentors students for AM10 and AMC 12 examinations.",
    image: "/team-images/Aniruddha-4.jpg",
  },
  {
    id: 5,
    name: "Erin Ott",
    title: "SAT/ACT Language Arts, PSAT, SHSAT, TACHS, & ISEE Specialist",
    education:
      "M.A. in English Literature, and dual major B.A. in Creative Writing and Psychology from Hofstra University",
    experience: "Teaches composition and literature at the collegiate level",
    bio: "Erin graduated with a M.A. in English Literature, and dual major B.A. in Creative Writing and Psychology, from Hofstra University. She teaches composition and literature at the collegiate level, and has worked with both university and community college students. Erin has been helping middle and high school students score higher on various standardized tests for the past decade. Her passion is to help students build academic confidence and succeed in their college application process. She firmly believes that all students are different and works diligently to help her students uncover which test-taking strategies apply best to each of them. As a former rowing coach, and captain of her college varsity rowing team, Erin is well-versed in the benefits of self-motivated hard work and strives to help her students embrace this practice.",
    image: "/team-images/zoffnesscollegeprep-5.jpg",
  },
  {
    id: 6,
    name: "Ethan Butler",
    title: "SAT/ACT, SHSAT, ISEE, TACHS, & Economics Specialist",
    education: "B.A. from NYU, Salutatorian at Cardinal Spellman High School",
    experience: "AP Scholar with Distinction, 99th percentile SAT scorer",
    bio: "Ethan attended Cardinal Spellman High School where he was the Salutatorian of a graduating class of 250 students and the President of the National Honors Society. In addition, he was the Captain of the Varsity lacrosse team and Co-Captain of the Varsity football team. Ethan scored in the 99th percentile on the SAT, and graduated as an AP Scholar with Distinction, which helped earn him a full academic scholarship to NYU. He has tutored students in mathematics, language arts, economics, and physics, individually and in a small group setting, with a high level of success. Ethan has worked with students of various levels of abilities and enjoys helping his students build their confidence and reach their maximum potential.",
    image: "/team-images/ethannew-6.jpg",
  },
  {
    id: 7,
    name: "Alyssa Dembek",
    title: "Language Arts Specialist",
    education:
      "B.S. in Secondary Education: English and Communications from Pennsylvania State University, M.S. in Literacy from Long Island University",
    experience:
      "Grader for The University of Michigan's Language Assessment Department, Former English Teacher at New Rochelle High School",
    bio: "Alyssa Dembek holds a B.S. in Secondary Education: English and Communications from Pennsylvania State University and a M.S. in Literacy from Long Island University. Alyssa is currently a grader for The University of Michigan's Language Assessment Department where she evaluates student examinations from all over the world. Previously, while teaching at New Rochelle High School, Alyssa held several leadership roles. She served as multiple grade-level representatives and was a co-chair for Middle States; both positions required her to ensure that teachers were working collaboratively for the greater good of the students and school. Additionally, Alyssa was the head coach of New Rochelle's Varsity volleyball team from 2011-2018. Her responsibilities didn't end with simply coaching; she ran study halls, communicated with student-athletes, their teachers, and the students' parents on a weekly basis to ensure each student-athlete reached her full academic and athletic potential. In 2017, Alyssa was named the New York State Public High School Section 1 Coach of the Year. For eight years, Alyssa taught various grade levels of English, which included senior electives such as Creative Writing, World Literature, Shakespeare, and College Reading. In addition to the regular integration of SAT and ACT preparation into her curriculum, Alyssa equipped her students with the skills necessary to be successful on the NYS Common Core English Regents. She continues to work with a myriad of students with their college applications and college essays and enjoys the process of working with students to craft a truly original and inspirational essay. In 2017, Alyssa won the New York State English Council's Educator of Excellence award.",
    image: "/team-images/Alysssa-7.jpg",
  },
  {
    id: 8,
    name: "Peter O'Byrne",
    title:
      "SAT/ACT, Algebra I/Algebra II/Trigonometry, Microeconomics/Macroeconomics, & World History Specialist",
    education:
      "B.A. in Mathematics and Economics from Georgetown University (magna cum laude), M.A. in Secondary Education from National-Louis University",
    experience:
      "New York State certified in Social Studies and Mathematics, Current Economics Teacher at Mamaroneck High School",
    bio: "Peter graduated magna cum laude from Georgetown University where he earned a B.A. in Mathematics and Economics. Shortly thereafter, he received an M.A. in Secondary Education from National-Louis University. Peter began his career in education at Bogan High School, in Chicago IL, and then spent nine years teaching at KIPP NYC College Prep High School in the Bronx, where he also coached their varsity football team. Peter has worked with Zoffness College Prep since 2015, and helped countless students significantly increase their SAT and ACT scores, in both Mathematics and Language Arts, through proven motivational and academic techniques. He is New York State certified in both Social Studies and Mathematics, and currently teaches Economics at Mamaroneck High School while coaching the MHS varsity football team.",
    image: "/team-images/zoffnesscollegeprep-8.jpg",
  },
  {
    id: 9,
    name: "Andrea Coady",
    title:
      "SAT/ACT Mathematics & Algebra I/Algebra II/Trigonometry/Pre-Calculus Specialist",
    education:
      "B.S. in Mathematics and M.S. in Mathematics Education from Mercy College (with honors)",
    experience:
      "11 years of teaching high school mathematics and special education in New York",
    bio: "Andrea graduated with honors from Mercy College in Dobbs Ferry, N.Y. where she received a B.S. in Mathematics and a M.S. in Mathematics Education. She holds New York State teaching certifications in Secondary Mathematics, Mathematics for Students with Disabilities, Generalist for Students with Disabilities, and Teaching English to Students of Other Languages. She has 11 years of teaching high school mathematics and special education here in our beautiful state of New York and Westchester County. In addition to teaching a variety of Regents level mathematics courses, Andrea has experience working individually and with small groups of students to increase their mathematics scores on the ACT and SAT for the past ten years. She has helped students of various levels of ability improve their study skills, learn test taking strategies, and gain the confidence needed to achieve success on standardized exams.",
    image: "/team-images/andrea-9.jpg",
  },
  {
    id: 10,
    name: "Kate Dowling",
    title:
      "SAT/ACT Language Arts, AP US History/AP World History, & College Essay Specialist",
    education:
      "B.A., cum laude, from Colgate University in both History and Education, M.A.T. from Teachers College, Columbia University",
    experience:
      "20+ years of teaching experience, Captain of Colgate University Rowing team",
    bio: "Kate is a passionate and experienced high school teacher, tutor, and seasoned writing coach. Over the last 20 years, she has equipped students with the skills, techniques and strategies to achieve success in school, on standardized tests, and in life beyond the classroom. Kate holds a B.A., cum laude, from Colgate University in both History and Education, and was the captain of the Colgate University Rowing team. Shortly thereafter, she received her M.A.T. from Teachers College, Columbia University. Kate has been teaching at Rye High School since 2003, where she has taught various social studies classes, including AP World History and AP US History. She is also a writing coach who has helped many students throughout all aspects of the essay writing process. Kate's passion for sports has led her to coach basketball, soccer, and volleyball at the high school and middle school levels. The lessons from athletics – specifically the importance of determination, and the belief in oneself – have guided Kate throughout many walks of life. She takes pride in creating a learning environment that minimizes anxiety and maximizes opportunities for students to achieve success. Because many students view standardized tests as roadblocks on the path to success, Kate makes an effort to reframe that view, and help her students stay loose, stay calm, and approach exams with confidence.",
    image: "/team-images/Kate-Dowling-10.jpg",
  },
  {
    id: 11,
    name: "Adam Richardson",
    title:
      "SAT/ACT, GRE, GMAT, LSAT, ISEE, AB/BC Calculus, AP Statistics, AP Physics, & Chemistry Specialist",
    education:
      "BA in Mathematics and BS in Physics from Rhodes College, MS in Mathematics from Vanderbilt University",
    experience:
      "15+ years of tutoring experience, 99th percentile scorer on LSAT, GRE, SAT, and ACT",
    bio: "Adam graduated with honors from Rhodes College with a BA in Mathematics and a BS in Physics before continuing to Vanderbilt University, where he studied Logic and Graph Theory. After earning his MS in Mathematics, he worked in Nashville for several years as a touring musician and songwriter. Over the last fifteen years, Adam has dedicated himself to helping students of all ages meet their academic goals. He has coached students in verbal and math/science sections of the ACT and SAT, helping many to achieve perfect scores. Adam has personally scored in the 99th percentile on the LSAT, GRE, SAT, and ACT. His approach balances high expectations with a clear-eyed understanding that every student has unique needs.",
    image: "/team-images/Adam-Richardson-11.jpg",
  },
  {
    id: 12,
    name: "Jansen Gibson",
    title:
      "SAT/ACT, ISEE, AB/BC Calculus, Math and Science Generalist, AP Literature, AP English Composition, College Essay Specialist, & Executive Functioning Coach",
    education:
      "Focus in Geology and Environmental Sciences from Vanderbilt University",
    experience:
      "99th percentile scorer on ACT and LSAT exams, experience teaching all age groups",
    bio: "Jansen attended Vanderbilt University with a focus in Geology and Environmental Sciences. Since then, after scoring in the 99th percentile on the ACT and LSAT exams, he has worked as a tutor providing home-schooling and teaching about environmentalism and conservation with local non-profits. Jansen has experience teaching age groups from pre-K to senior citizens, and focuses on working with students who want to expand their understanding of, and excitement for, advanced science and math courses. Additionally, Jansen has several years of experience as a math, science, and history teacher who creates a warm and adaptable learning environment to build confidence and capability inside and outside the classroom.",
    image: "/team-images/Jansen-Gibson-12.png",
  },
  {
    id: 13,
    name: "Joshua Asen",
    title: "SAT/ACT Language Arts Specialist",
    education:
      "Concentrated in Music History and French language at Brown University, Master's in Education (TESOL)",
    experience:
      "30+ years of teaching experience, NYC Teaching Fellow, 5 foreign languages",
    bio: "Joshua is an experienced private tutor, former public school teacher (NYC Teaching Fellow), and linguist with over 30 years of teaching experience (and 5 foreign languages under his belt). Joshua grew up in Mamaroneck and attended Central, Hommocks and MHS, graduating with honors and 5 AP credits. Joshua went on to Brown University, where he concentrated in Music History and French language (earning department Honors for his senior thesis); subsequently, Joshua earned a Master's in Education (TESOL) as a NYC Teaching Fellow, while teaching ESL and Language Arts for 4 years in a NYC public school. Joshua has also tutored privately in French, Hebrew, and Arabic, as well as SAT Prep and College Essay consulting for 20 years, and has served as an Alumni admissions interviewer for Brown University. In addition to his work in education, Joshua is a documentary filmmaker and has produced several films and TV series, with a focus on the environment, wildlife, STEM and youth culture. Joshua loves to share his passion for music and film, as a way to engage high school students, and to custom-tailor lesson plans that boost students' confidence while strengthening skills. Joshua teaches the English & Reading sections of the SAT and ACT, as well as AP French and other subject tests. When he's not teaching, Joshua is a father, amateur farmer, and yoga lover.",
    image: "/team-images/JA-headshot-13.jpg",
  },
];

const OurTeam = () => {
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="pt-96 pb-16 md:pt-48 md:pb-22 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Meet Our Expert Team
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Our experienced educators and admissions specialists are
                dedicated to helping students achieve their academic dreams.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h2 className="text-3xl font-bold font-display text-college-blue-500 mb-4">
                Our College Admissions Experts
              </h2>
              <p className="text-lg text-gray-700">
                Our team brings decades of combined experience in college
                admissions, test preparation, essay coaching, and academic
                mentorship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {teamMembers.map((member) => (
                <Card
                  key={member.id}
                  className="card-shadow card-hover overflow-hidden"
                >
                  <div className="aspect-[3/4] bg-gray-200 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-display text-college-blue-500 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-college-accent-purple font-medium mb-2">
                      {member.title}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full mb-4 hover:bg-transparent hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                      onClick={() => setSelectedMember(member)}
                    >
                      View Full Profile
                    </Button>
                    <div className="flex space-x-3">
                      <a
                        href="#"
                        className="text-gray-500 hover:text-college-blue-500 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-500 hover:text-college-blue-500 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Dialog
              open={!!selectedMember}
              onOpenChange={() => setSelectedMember(null)}
            >
              <DialogContent className="max-w-5xl p-0 overflow-hidden max-h-[80vh] overflow-y-auto">
                {selectedMember && (
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Image */}
                    <div className="md:w-2/5 bg-gray-100">
                      <div className="h-full relative">
                        <img
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                          style={{ minHeight: "400px" }}
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                          <h2 className="text-2xl font-bold text-white mb-1">
                            {selectedMember.name}
                          </h2>
                          <p className="text-white/90">
                            {selectedMember.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="md:w-3/5 p-6 md:p-8 bg-white">
                      <div className="space-y-6">
                        <div className="pb-6">
                          <h4 className="text-lg font-bold text-college-blue-500 mb-2">
                            About
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {selectedMember.bio}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 pt-4">
                          <Button
                            variant="outline"
                            className="flex items-center space-x-2"
                            asChild
                          >
                            <a
                              href="#"
                              className="text-gray-700 hover:text-college-blue-500"
                            >
                              <Linkedin className="h-5 w-5" />

                              <span>Connect on LinkedIn</span>
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center space-x-2"
                            asChild
                          >
                            <a
                              href="#"
                              className="text-gray-700 hover:text-college-blue-500"
                            >
                              <Mail className="h-5 w-5" />
                              <span>Send Email</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <div className="bg-college-blue-50 p-8 md:p-12 rounded-xl mb-12">
              <h3 className="text-2xl font-bold font-display text-college-blue-500 mb-6 text-center">
                Why Choose Our Team?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-college-blue-500 mb-4">
                    Deep Admissions Expertise
                  </h4>
                  <p className="text-gray-700">
                    Our counselors include former admissions officers from top
                    universities who understand what it takes to craft a
                    successful application from the inside.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-college-blue-500 mb-4">
                    Personalized Approach
                  </h4>
                  <p className="text-gray-700">
                    We take the time to understand each student's unique
                    strengths, challenges, and aspirations to provide truly
                    individualized guidance.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-college-blue-500 mb-4">
                    Holistic Support
                  </h4>
                  <p className="text-gray-700">
                    Beyond applications, we mentor students in developing the
                    skills and mindset needed for long-term academic and
                    personal success.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-college-blue-500 mb-4">
                    Proven Track Record
                  </h4>
                  <p className="text-gray-700">
                    Our students consistently gain admission to their top-choice
                    schools, with 95% being accepted to at least one of their
                    top three college choices.
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

export default OurTeam;
