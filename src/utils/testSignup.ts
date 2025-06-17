import axios from 'axios';

const API_SIGNUP = 'https://zoffness.academy/api/register';

export const testUniqueSignup = async () => {
  try {
    // Generate unique email with timestamp
    const timestamp = Date.now();
    const uniqueEmail = `test${timestamp}@example.com`;
    
    const signupData = {
      username: `test${timestamp}`,
      first_name: 'Test',
      last_name: 'User',
      email: uniqueEmail,
      password: 'Password123!',
      password_confirmation: 'Password123!',
      user_type: 'parent',
      phone: '1234567890'
    };
    
    console.log('Testing signup with unique data:', signupData);
    
    const response = await axios.post(API_SIGNUP, signupData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('✅ Signup successful:', response.data);
    return response.data;
    
  } catch (error: any) {
    console.error('❌ Signup failed:', error.response?.data);
    console.error('Validation errors:', error.response?.data?.errors);
    
    if (error.response?.data?.errors?.email) {
      console.error('Email specific error:', error.response.data.errors.email);
    }
    
    return null;
  }
};

// Generate a unique email for testing
export const generateUniqueEmail = () => {
  const timestamp = Date.now();
  return `test${timestamp}@example.com`;
};

// Call this function from browser console to test
(window as any).testUniqueSignup = testUniqueSignup;
(window as any).generateUniqueEmail = generateUniqueEmail;
