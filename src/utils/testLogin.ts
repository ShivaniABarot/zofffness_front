import axios from 'axios';

// Test login API endpoint
export const testLoginAPI = async (email: string, password: string) => {
  try {
    console.log('Testing login API with:', { email, password });
    
    const response = await axios.post('http://localhost:8000/api/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', response.headers);
    console.log('API Response Data:', response.data);
    
    return {
      success: true,
      status: response.status,
      data: response.data
    };
  } catch (error: any) {
    console.error('API Error:', error);
    console.error('Error Code:', error.code);
    console.error('Error Response:', error.response?.data);
    console.error('Error Status:', error.response?.status);
    
    return {
      success: false,
      error: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// Test if API server is running
export const testAPIConnection = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/test', {
      timeout: 5000
    });
    console.log('API Server is running:', response.status);
    return true;
  } catch (error) {
    console.log('API Server not reachable:', error);
    return false;
  }
};
