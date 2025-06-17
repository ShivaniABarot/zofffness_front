
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import CollegeEssays from "./pages/CollegeEssays";
import CollegeAdmissions from "./pages/CollegeAdmissions";
import PracticeTests from "./pages/PracticeTests";
import ExecutiveCoaching from "./pages/ExecutiveCoaching";
import OurTeam from "./pages/OurTeam";
import OurApproach from "./pages/OurApproach";
import Enroll from "./pages/Enroll";
import OnlinePayment from "./pages/OnlinePayment";
import CommunityFeedback from "./pages/CommunityFeedback";
import NotFound from "./pages/NotFound";

// Program Pages
import CollegeApplicationMastery from "./pages/programs/CollegeApplicationMastery";
import SATACTPreparation from "./pages/programs/SATACTPreparation";
import OneOnOneMentorship from "./pages/programs/OneOnOneMentorship";
import SummerIntensive from "./pages/programs/SummerIntensive";
import VirtualTutoring from "./pages/programs/VirtualTutoring";

// Resource Pages
import Blog from "./pages/resources/Blog";
import TestResources from "./pages/resources/TestResources";
import EssayTips from "./pages/resources/EssayTips";
import Scholarships from "./pages/resources/Scholarships";
import FinancialAid from "./pages/resources/FinancialAid";

// Utility Pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import Sitemap from "./pages/legal/Sitemap";
import Dashboard from "./pages/account/Dashboard";
import Settings from "./pages/account/Settings";
import Earnings from "./pages/account/Earnings";
import SignOut from "./pages/account/SignOut";

// New Pages for Buttons
import SupportContact from "./pages/contact/SupportContact";
import MentorshipConsultation from "./pages/mentorship/ScheduleConsultation";
import EssayServices from "./pages/essays/EssayServices";
import GeneralConsultation from "./pages/consultation/ScheduleConsultation";
import ServiceSelection from "./pages/serviceselection";
import SatActCourseForm from "./pages/forms/SatActCourseForm";
import SatActDiagnosticForm from "./pages/forms/SatActDiagnosticForm";
import SatActPracticeTestForm from "./pages/forms/SatActPracticeTestForm";
import CollegeAdmissionsForm from "./pages/forms/CollegeAdmissionsForm";
import CollegeEssaysForm from "./pages/forms/CollegeEssaysForm";
import ExecutiveFunctionForm from "./pages/forms/ExecutiveFunctionForm";

// Authentication
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import StudentLoginPage from "./pages/auth/StudentLoginPage";
import DashboardPage from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Test utilities (for development)
import "./utils/testSignup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/college-essays" element={<CollegeEssays />} />
          <Route path="/college-admissions" element={<CollegeAdmissions />} />
          <Route path="/practice-tests" element={<PracticeTests />} />
          <Route path="/executive-coaching" element={<ExecutiveCoaching />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/our-approach" element={<OurApproach />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/service-selection" element={<ServiceSelection />} />
          <Route path="/online-payment" element={<OnlinePayment />} />
          <Route path="/community-feedback" element={<CommunityFeedback />} />

          {/* Program Routes */}
          <Route path="/programs/college-application-mastery" element={<CollegeApplicationMastery />} />
          <Route path="/programs/sat-act-preparation" element={<SATACTPreparation />} />
          <Route path="/programs/one-on-one-mentorship" element={<OneOnOneMentorship />} />
          <Route path="/programs/summer-intensive" element={<SummerIntensive />} />
          <Route path="/programs/virtual-tutoring" element={<VirtualTutoring />} />

          {/* Resource Routes */}
          <Route path="/resources/blog" element={<Blog />} />
          <Route path="/resources/test-resources" element={<TestResources />} />
          <Route path="/resources/essay-tips" element={<EssayTips />} />
          <Route path="/resources/scholarships" element={<Scholarships />} />
          <Route path="/resources/financial-aid" element={<FinancialAid />} />

          {/* Legal Routes */}
          <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/legal/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal/sitemap" element={<Sitemap />} />

          {/* Account Routes */}
          <Route path="/account/dashboard" element={<Dashboard />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/account/earnings" element={<Earnings />} />
          <Route path="/account/sign-out" element={<SignOut />} />

          {/* New Button Pages */}
          <Route path="/contact/support" element={<SupportContact />} />
          <Route path="/mentorship/schedule" element={<MentorshipConsultation />} />
          <Route path="/essays/services" element={<EssayServices />} />
          <Route path="/consultation/schedule" element={<GeneralConsultation />} />
          <Route path="/forms/sat-act-course" element={<SatActCourseForm />} />
          <Route path="/forms/sat-act-diagnostic" element={<SatActDiagnosticForm />} />
          <Route path="/forms/sat-act-practice-test" element={<SatActPracticeTestForm />} />
          <Route path="/forms/college-admissions" element={<CollegeAdmissionsForm />} />
          <Route path="/forms/college-essays" element={<CollegeEssaysForm />} />
          <Route path="/forms/executive-function" element={<ExecutiveFunctionForm />} />

          {/* Authentication Routes */}
          <Route path="/auth/login" element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path="/auth/signup" element={
            <ProtectedRoute requireAuth={false}>
              <SignupPage />
            </ProtectedRoute>
          } />
          <Route path="/auth/student-login" element={
            <ProtectedRoute requireAuth={false}>
              <StudentLoginPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute requireAuth={true}>
              <DashboardPage />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
