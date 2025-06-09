
import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-[-17px] left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 text-center">
       
      </div>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-2 md:px-6 py-5">
        <Link to="/" className="flex items-center">
          <img src="/zoffnesscollegeprep-logo.png" alt="Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="group relative">
            <Link to="/programs/sat-act-preparation" className={`text-gray-800 text-[15px] font-normal px-2 py-1 relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800 after:bottom-[-5px] after:left-0 after:scale-x-0 after:transform-origin-right hover:after:scale-x-100 after:transition-transform after:duration-400 before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:top-[-5px] before:left-0 before:scale-x-0 before:transform-origin-left hover:before:scale-x-100 before:transition-transform before:duration-400 transition-all duration-400 [&.active]:scale-107 [&.active]:after:scale-x-100 [&.active]:before:scale-x-100 ${isActive('/programs/sat-act-preparation')}`}>
              SAT/ACT
            </Link>
          </div>
          <div className="group relative">
            <Link to="/practice-tests" className={`text-gray-800 text-[15px] font-normal px-2 py-1 relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800 after:bottom-[-5px] after:left-0 after:scale-x-0 after:transform-origin-right hover:after:scale-x-100 after:transition-transform after:duration-400 before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:top-[-5px] before:left-0 before:scale-x-0 before:transform-origin-left hover:before:scale-x-100 before:transition-transform before:duration-400 transition-all duration-400 [&.active]:scale-107 [&.active]:after:scale-x-100 [&.active]:before:scale-x-100 ${isActive('/practice-tests')}`}>
              Practice Tests & Analysis
            </Link>
          </div>
          <div className="group relative">
            <Link to="/college-admissions" className={`text-gray-800 text-[15px] font-normal px-2 py-1 relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800 after:bottom-[-5px] after:left-0 after:scale-x-0 after:transform-origin-right hover:after:scale-x-100 after:transition-transform after:duration-400 before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:top-[-5px] before:left-0 before:scale-x-0 before:transform-origin-left hover:before:scale-x-100 before:transition-transform before:duration-400 transition-all duration-400 [&.active]:scale-107 [&.active]:after:scale-x-100 [&.active]:before:scale-x-100 ${isActive('/college-admissions')}`}>
              Admissions
            </Link>
          </div>
          <div className="group relative">
            <Link to="/college-essays" className={`text-gray-800 text-[15px] font-normal px-2 py-1 relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800 after:bottom-[-5px] after:left-0 after:scale-x-0 after:transform-origin-right hover:after:scale-x-100 after:transition-transform after:duration-400 before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:top-[-5px] before:left-0 before:scale-x-0 before:transform-origin-left hover:before:scale-x-100 before:transition-transform before:duration-400 transition-all duration-400 [&.active]:scale-107 [&.active]:after:scale-x-100 [&.active]:before:scale-x-100 ${isActive('/college-essays')}`}>
              Essays
            </Link>
          </div>
          <div className="group relative">
            <Link to="/executive-coaching" className={`text-gray-800 text-[15px] font-normal px-2 py-1 relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800 after:bottom-[-5px] after:left-0 after:scale-x-0 after:transform-origin-right hover:after:scale-x-100 after:transition-transform after:duration-400 before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:top-[-5px] before:left-0 before:scale-x-0 before:transform-origin-left hover:before:scale-x-100 before:transition-transform before:duration-400 transition-all duration-400 [&.active]:scale-107 [&.active]:after:scale-x-100 [&.active]:before:scale-x-100 ${isActive('/executive-coaching')}`}>
              Executive Function
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className={`text-gray-800 text-[15px] font-normal px-2 py-1 relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800 after:bottom-[-5px] after:left-0 after:scale-x-0 after:transform-origin-right hover:after:scale-x-100 after:transition-transform after:duration-400 before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:top-[-5px] before:left-0 before:scale-x-0 before:transform-origin-left hover:before:scale-x-100 before:transition-transform before:duration-400 transition-all duration-400 ${location.pathname.startsWith('/our-') ? 'active scale-107 after:scale-x-100 before:scale-x-100' : ''}`}>
              About
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/our-team" className={`w-full text-[15px] relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/our-team')}`}>Our Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/our-approach" className={`w-full text-[15px] relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/our-approach')}`}>Our Approach</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/community-feedback" className={`w-full text-[15px] relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/community-feedback')}`}>Community Feedback</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="group relative">
            <Link to="/online-payment" className={`text-gray-800 text-[15px] font-normal px-2 py-1 relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800 after:bottom-[-5px] after:left-0 after:scale-x-0 after:transform-origin-right hover:after:scale-x-100 after:transition-transform after:duration-400 before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:top-[-5px] before:left-0 before:scale-x-0 before:transform-origin-left hover:before:scale-x-100 before:transition-transform before:duration-400 transition-all duration-400 [&.active]:scale-107 [&.active]:after:scale-x-100 [&.active]:before:scale-x-100 ${isActive('/online-payment')}`}>
              Payment
            </Link>
          </div>
          <div className="group relative">
            <Link to="/consultation/schedule" className={`text-gray-800 text-[15px] font-normal px-2 py-1 relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gradient-to-r after:from-blue-600 after:to-blue-800 after:bottom-[-5px] after:left-0 after:scale-x-0 after:transform-origin-right hover:after:scale-x-100 after:transition-transform after:duration-400 before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-800 before:top-[-5px] before:left-0 before:scale-x-0 before:transform-origin-left hover:before:scale-x-100 before:transition-transform before:duration-400 transition-all duration-400 [&.active]:scale-107 [&.active]:after:scale-x-100 [&.active]:before:scale-x-100 ${isActive('/consultation/schedule')}`}>
              Contact
            </Link>
          </div>

          {/* Authentication Section */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors">
                <User className="w-5 h-5" />
                <span className="text-[15px] font-normal">{user?.firstName}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex items-center w-full">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/auth/login">
                <Button variant="outline" size="sm" className="text-[15px]">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-[15px]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-college-blue-500 p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm py-4 px-4 shadow-lg absolute w-full max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/programs/sat-act-preparation" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/programs/sat-act-preparation')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              SAT/ACT
            </Link>
            <Link 
              to="/practice-tests" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/practice-tests')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Practice Tests & Analysis
            </Link>
            <Link 
              to="/college-admissions" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/college-admissions')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admissions
            </Link>
            <Link 
              to="/college-essays" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/college-essays')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Essays
            </Link>
            <Link 
              to="/executive-coaching" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/executive-coaching')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Executive Function
            </Link>
            <hr className="border-gray-200 my-2" />
            <h3 className="font-medium text-gray-600">About</h3>
            <Link 
              to="/our-team" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/our-team')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Our Team
            </Link>
            <Link 
              to="/our-approach" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/our-approach')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Our Approach
            </Link>
            <Link 
              to="/community-feedback" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/community-feedback')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Community Feedback
            </Link>
            <hr className="border-gray-200 my-2" />
            <Link 
              to="/online-payment" 
              className={`text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isActive('/online-payment')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Payment
            </Link>
            <Link
              to="/consultation/schedule"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule Consultation
            </Link>

            {/* Mobile Authentication */}
            <hr className="border-gray-200 my-2" />
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 py-2 font-medium text-left w-full hover:scale-107 transition-transform duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-gray-800 py-2 font-medium relative hover:scale-107 transition-transform duration-300 after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-gray-800 after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:scale-105 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
