import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { AuthUserProvider } from './context/AuthUserContext';
import { LanguageProvider } from './context/LanguageContext';
// Add page imports here
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import VillagePage from './pages/VillagePage';
import SupportPage from './pages/SupportPage';
import TutorialPage from './pages/TutorialPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MembershipPage from './pages/MembershipPage';
import VouchersPage from './pages/VouchersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CommunityPage from './pages/CommunityPage';
import Layout from './components/Layout';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/village" element={<VillagePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/vouchers" element={<VouchersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <LanguageProvider>
          <AuthUserProvider>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </AuthUserProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App