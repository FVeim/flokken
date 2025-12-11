import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Navigation from './Navigation';
import DiscoverPage from './DiscoverPage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import './App.css';

// Import seed function for easy testing
import '../../seed';

type Page = 'Discover' | 'Messages' | 'Communities' | 'Profile';

function AppContent() {
  const { user, loading } = useAuth();
  const [activePage, setActivePage] = useState<Page>('Discover');

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Discover':
        return <DiscoverPage />;
      case 'Profile':
        return <ProfilePage />;
      case 'Messages':
        return <div className="placeholder-page"><h2>💬 Messages</h2><p>Coming soon...</p></div>;
      case 'Communities':
        return <div className="placeholder-page"><h2>👥 Communities</h2><p>Coming soon...</p></div>;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="app-container">
      {renderPage()}
      <Navigation activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
