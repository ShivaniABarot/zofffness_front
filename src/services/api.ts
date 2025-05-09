import axios from 'axios';

// Base API URL
const API_BASE_URL = 'https://zoffness.academy/api';

/**
 * Submit SAT/ACT Practice Test registration
 * This function handles the special formatting needed for the test_type field
 */
export const submitPracticeTestRegistration = async (data: any) => {
  // Create a new object with all the data
  const submissionData = {
    ...data,
    // Remove test_type from the main data object
    test_type: undefined
  };

  // Create a URLSearchParams object for the request
  const params = new URLSearchParams();
  
  // Add all fields from submissionData
  Object.entries(submissionData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  
  // Add test_type as a special case with array notation
  params.append('test_type[]', '1');
  
  // Make the API request with the correct content type
  const response = await axios.post(
    `${API_BASE_URL}/practice_tests`, 
    params.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  
  return response.data;
};

/**
 * Submit SAT/ACT Course registration
 */
export const submitSatActCourseRegistration = async (data: any) => {
  return axios.post(`${API_BASE_URL}/new_sat_act`, data)
    .then(response => response.data);
};

/**
 * Submit Executive Function Coaching registration
 */
export const submitExecutiveFunctionRegistration = async (data: any) => {
  return axios.post(`${API_BASE_URL}/executive_coaching`, data)
    .then(response => response.data);
};
