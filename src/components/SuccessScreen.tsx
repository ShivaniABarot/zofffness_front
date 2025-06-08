import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface SuccessScreenProps {
  serviceName: string;
  onRegisterAnother: () => void;
  serviceType?: string; // New prop to identify the service type
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  serviceName,
  onRegisterAnother,
  serviceType
}) => {
  // Function to get related services based on service type
  const getRelatedServices = (type?: string) => {
    switch (type) {
      case 'sat_act_diagnostic':
        return [
          { href: '/forms/sat-act-course', text: '📚 SAT/ACT Course Registration - Comprehensive test preparation' },
          { href: '/forms/sat-act-practice-test', text: '📝 SAT/ACT Practice Test Registration - Practice with real test conditions' }
        ];
      case 'sat_act_course':
        return [
          { href: '/forms/sat-act-diagnostic', text: '🔍 SAT/ACT Diagnostic Test - Determine which test is the best fit' },
          { href: '/forms/sat-act-practice-test', text: '📝 SAT/ACT Practice Test Registration - Practice with real test conditions' }
        ];
      case 'sat_act_practice_test':
        return [
          { href: '/forms/sat-act-diagnostic', text: '🔍 SAT/ACT Diagnostic Test - Determine which test is the best fit' },
          { href: '/forms/sat-act-course', text: '📚 SAT/ACT Course Registration - Comprehensive test preparation' }
        ];
      case 'executive_function':
        return [
          { href: '/forms/sat-act-diagnostic', text: '🔍 SAT/ACT Diagnostic Test - Determine which test is the best fit' },
          { href: '/forms/sat-act-course', text: '📚 SAT/ACT Course Registration - Comprehensive test preparation' },
          { href: '/forms/sat-act-practice-test', text: '📝 SAT/ACT Practice Test Registration - Practice with real test conditions' }
        ];
      case 'college_admissions':
        return [
          { href: '/forms/college-essays', text: '✍️ College Essays Service - Personalized essay writing guidance' }
        ];
      case 'college_essays':
        return [
          { href: '/forms/college-admissions', text: '🎓 College Admissions Counseling - Professional guidance for college applications' }
        ];
      default:
        return [];
    }
  };

  const relatedServices = getRelatedServices(serviceType);
  return (
    <div className="space-y-6">
      <Card className="border-green-500">
        <CardContent className="p-6">
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600">Registration Successful!</h2>
            <p className="text-gray-600 font-medium">
              Registration successful!
            </p>
            <p className="text-gray-600">
              Thank you for registering for {serviceName}. We have received your information.
            </p>
            <p className="text-gray-600">
              You will receive a confirmation email shortly with additional details.
            </p>
            <Button
              className="mt-4 bg-college-blue-500 hover:bg-college-blue-600"
              onClick={onRegisterAnother}
            >
              Register Another Student
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className={`p-5 rounded-xl border shadow-sm ${
              serviceType?.includes('college')
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                : serviceType === 'executive_function'
                ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
            }`}>
              <h4 className={`font-semibold mb-4 flex items-center ${
                serviceType?.includes('college')
                  ? 'text-green-900'
                  : serviceType === 'executive_function'
                  ? 'text-purple-900'
                  : 'text-blue-900'
              }`}>
                <svg className={`w-5 h-5 mr-2 ${
                  serviceType?.includes('college')
                    ? 'text-green-600'
                    : serviceType === 'executive_function'
                    ? 'text-purple-600'
                    : 'text-blue-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {serviceType?.includes('college') ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  ) : serviceType === 'executive_function' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  )}
                </svg>
                {serviceType?.includes('college') ? 'Related College Services' :
                 serviceType === 'executive_function' ? 'Complementary Test Prep Services' :
                 'Related SAT/ACT Services'}
              </h4>
              <div className="space-y-3">
                {relatedServices.map((service, index) => {
                  const emoji = service.text.split(' ')[0];
                  const title = service.text.split(' - ')[0].substring(2);
                  const description = service.text.split(' - ')[1];

                  return (
                    <a
                      key={index}
                      href={service.href}
                      className={`group flex items-start p-3 bg-white rounded-lg border hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${
                        serviceType?.includes('college')
                          ? 'border-green-100 hover:border-green-300'
                          : serviceType === 'executive_function'
                          ? 'border-purple-100 hover:border-purple-300'
                          : 'border-blue-100 hover:border-blue-300'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                        serviceType?.includes('college')
                          ? 'bg-green-100 group-hover:bg-green-200'
                          : serviceType === 'executive_function'
                          ? 'bg-purple-100 group-hover:bg-purple-200'
                          : 'bg-blue-100 group-hover:bg-blue-200'
                      }`}>
                        <span className="text-lg">{emoji}</span>
                      </div>
                      <div>
                        <div className={`font-medium transition-colors ${
                          serviceType?.includes('college')
                            ? 'text-green-900 group-hover:text-green-700'
                            : serviceType === 'executive_function'
                            ? 'text-purple-900 group-hover:text-purple-700'
                            : 'text-blue-900 group-hover:text-blue-700'
                        }`}>
                          {title}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {description}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SuccessScreen;
