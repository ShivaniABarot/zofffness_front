import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface SuccessScreenProps {
  serviceName: string;
  onRegisterAnother: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ 
  serviceName, 
  onRegisterAnother 
}) => {
  return (
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
  );
};

export default SuccessScreen;
