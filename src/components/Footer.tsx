
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-college-blue-800 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/zoffnesscollegeprep-logo.png"
              alt="Zoffness College Prep Logo"
              className="h-12 mb-4"
            />
            <p className="text-white/80 mb-4 max-w-xs">
              Empowering students to achieve their college dreams through expert guidance and personalized mentorship.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/people/Zoffness-College-Prep/100087611664603/" 
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300 group" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-gradient-to-r from-blue-600 to-blue-800 transition-opacity duration-300"></div>
              </a>
              <a 
                href="https://www.instagram.com/zoffnesscollegeprep/?hl=en" 
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300 group" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-gradient-to-r from-blue-600 to-blue-800 transition-opacity duration-300"></div>
              </a>
              <a 
                href="https://bronx.news12.com/be-well-advice-on-getting-kids-back-on-track" 
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300 group" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-gradient-to-r from-blue-600 to-blue-800 transition-opacity duration-300"></div>
              </a>
              <a 
                href="https://www.linkedin.com/in/ben-zoffness-a866263a/" 
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-300 group" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-gradient-to-r from-blue-600 to-blue-800 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-3">
              <li><Link to="/programs/college-application-mastery" className="text-white/80 hover:text-white transition-colors">College Application Mastery</Link></li>
              <li><Link to="/programs/sat-act-preparation" className="text-white/80 hover:text-white transition-colors">SAT/ACT Test Preparation</Link></li>
              <li><Link to="/programs/one-on-one-mentorship" className="text-white/80 hover:text-white transition-colors">One-on-One Mentorship</Link></li>
              <li><Link to="/programs/summer-intensive" className="text-white/80 hover:text-white transition-colors">Summer College Prep Intensive</Link></li>
              <li><Link to="/programs/virtual-tutoring" className="text-white/80 hover:text-white transition-colors">Virtual Tutoring</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/resources/blog" className="text-white/80 hover:text-white transition-colors">College Admissions Blog</Link></li>
              <li><Link to="/resources/test-resources" className="text-white/80 hover:text-white transition-colors">SAT/ACT Test Resources</Link></li>
              <li><Link to="/resources/essay-tips" className="text-white/80 hover:text-white transition-colors">Essay Writing Tips</Link></li>
              <li><Link to="/resources/scholarships" className="text-white/80 hover:text-white transition-colors">Scholarship Information</Link></li>
              <li><Link to="/resources/financial-aid" className="text-white/80 hover:text-white transition-colors">Financial Aid Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-white/80">510 West Boston Post Road, Mamaroneck, NY 10543</li>
              <li className="text-white font-bold text-lg hover:text-college-accent-purple transition-colors">(914) 462-7797</li>
              <li className="text-white/80">info@zoffnesscollageprep.com</li>
              <li className="text-white/80">Monday - Friday: 9am - 6pm</li>
              <li className="text-white/80">Saturday: 10am - 2pm</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Zoffness College Prep. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/legal/privacy-policy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/legal/terms-of-service" className="text-white/70 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/legal/sitemap" className="text-white/70 hover:text-white text-sm transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
