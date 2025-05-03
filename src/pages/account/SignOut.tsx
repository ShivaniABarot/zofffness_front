
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // In a real app, you would handle the sign out logic here
    // For example, clearing tokens, user data from localStorage, etc.
    
    // After signing out, redirect to home page
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleCancel = () => {
    // Navigate back to the previous page or dashboard
    navigate(-1);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-r from-college-blue-500/90 to-college-accent-purple/70">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                Sign Out
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Are you sure you want to sign out of your account?
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-md mx-auto text-center">
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm mb-8">
                <LogOut className="h-16 w-16 text-college-blue-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold font-display text-college-blue-500 mb-4">
                  Sign Out Confirmation
                </h2>
                <p className="text-gray-700 mb-8">
                  You're about to sign out from your Zoffness College Prep account. Any unsaved changes may be lost.
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={handleSignOut} 
                    className="w-full bg-college-blue-500 hover:bg-college-blue-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    className="w-full"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
              
              <div className="text-gray-600">
                <h3 className="font-semibold mb-2">Having issues with your account?</h3>
                <p className="mb-4">
                  If you're experiencing any issues with your account or need assistance, please contact our support team.
                </p>
                <div className="flex justify-center">
                  <Button variant="link" className="text-college-blue-500" asChild>
                    <Link to="/contact/support">Contact Support</Link>
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

export default SignOut;
