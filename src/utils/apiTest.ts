// API Test Utility
import axios from 'axios';

const API_ENDPOINTS = {
  SIGNUP: 'https://zoffness.academy/api/register',
  SIGNIN: 'http://localhost:8000/api/login'
};

// Test signup API with different formats
export const testSignupAPI = async () => {
  try {
    console.log('Testing Signup API:', API_ENDPOINTS.SIGNUP);

    // Try format 1: snake_case with password_confirmation
    const testData1 = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test' + Date.now() + '@example.com', // Unique email
      password: 'password123',
      password_confirmation: 'password123',
      user_type: 'parent',
      phone: '1234567890'
    };

    console.log('Trying format 1:', testData1);
    const response = await axios.post(API_ENDPOINTS.SIGNUP, testData1);
    console.log('Signup API Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Signup API Error:', error.response?.data || error.message);
    console.error('Validation errors:', error.response?.data?.errors);

    // Try format 2: camelCase
    try {
      const testData2 = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test' + Date.now() + '@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        userType: 'parent',
        phone: '1234567890'
      };

      console.log('Trying format 2:', testData2);
      const response2 = await axios.post(API_ENDPOINTS.SIGNUP, testData2);
      console.log('Signup API Response (format 2):', response2.data);
      return response2.data;
    } catch (error2: any) {
      console.error('Format 2 also failed:', error2.response?.data);
      return null;
    }
  }
};

// Test signin API
export const testSigninAPI = async () => {
  try {
    console.log('Testing Signin API:', API_ENDPOINTS.SIGNIN);
    
    const testData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const response = await axios.post(API_ENDPOINTS.SIGNIN, testData);
    console.log('Signin API Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Signin API Error:', error.response?.data || error.message);
    return null;
  }
};

// Test both APIs
export const testAPIs = async () => {
  console.log('=== API Testing Started ===');
  
  console.log('\n1. Testing Signup API...');
  await testSignupAPI();
  
  console.log('\n2. Testing Signin API...');
  await testSigninAPI();
  
  console.log('\n=== API Testing Completed ===');
};
