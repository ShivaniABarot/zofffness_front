// Mock API service to simulate backend responses when the real API is not available

export interface Session {
  id: number;
  title: string;
  price_per_slot: string;
  description?: string;
  session_type: string;
  created_at: string;
  updated_at: string;
}

// Mock session data
const mockSessions: Session[] = [
  {
    id: 1,
    title: "SAT/ACT Diagnostic Test - Full Length Proctored",
    price_per_slot: "200.00",
    description: "Complete two full-length proctored diagnostic tests",
    session_type: "diagnostic",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    title: "SAT Diagnostic Test - Extended Time",
    price_per_slot: "250.00",
    description: "SAT diagnostic test with extended time accommodations",
    session_type: "diagnostic",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    title: "ACT Diagnostic Test - Extended Time",
    price_per_slot: "250.00",
    description: "ACT diagnostic test with extended time accommodations",
    session_type: "diagnostic",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

// Mock course sessions
const mockCourseSessions: Session[] = [
  {
    id: 4,
    title: "SAT Prep Course - 8 Week Program",
    price_per_slot: "800.00",
    description: "Comprehensive 8-week SAT preparation course",
    session_type: "course",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 5,
    title: "ACT Prep Course - 8 Week Program",
    price_per_slot: "800.00",
    description: "Comprehensive 8-week ACT preparation course",
    session_type: "course",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 6,
    title: "SAT/ACT Combo Course - 10 Week Program",
    price_per_slot: "1000.00",
    description: "Combined SAT and ACT preparation course",
    session_type: "course",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

// Mock practice test sessions
const mockPracticeTestSessions: Session[] = [
  {
    id: 7,
    title: "SAT Practice Test - Single Session",
    price_per_slot: "50.00",
    description: "Single SAT practice test session",
    session_type: "practice",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 8,
    title: "ACT Practice Test - Single Session",
    price_per_slot: "50.00",
    description: "Single ACT practice test session",
    session_type: "practice",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 9,
    title: "SAT Practice Test - 4 Session Package",
    price_per_slot: "180.00",
    description: "Package of 4 SAT practice test sessions",
    session_type: "practice",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

export const mockApiService = {
  // Get sessions with optional filtering
  getSessions: async (type?: string): Promise<{ success: boolean; data: Session[] }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let sessions = [...mockSessions, ...mockCourseSessions, ...mockPracticeTestSessions];
    
    // Filter by type if specified
    if (type) {
      sessions = sessions.filter(session => 
        session.session_type === type || 
        session.title.toLowerCase().includes(type.toLowerCase())
      );
    }
    
    console.log('Mock API: Returning sessions', sessions);
    
    return {
      success: true,
      data: sessions
    };
  },

  // Submit form data
  submitForm: async (endpoint: string, data: any): Promise<{ success: boolean; message: string; data?: any }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Mock API: Submitting to ${endpoint}`, data);
    
    // Generate a mock ID
    const mockId = Math.floor(Math.random() * 10000) + 1000;
    
    return {
      success: true,
      message: 'Registration submitted successfully (mock)',
      data: {
        id: mockId,
        ...data,
        created_at: new Date().toISOString()
      }
    };
  }
};
