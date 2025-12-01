import { useState } from 'react';
import Navigation from './Navigation';
import DiscoverPage from './DiscoverPage';
import ProfilePage from './ProfilePage';
import './App.css';

type Page = 'Discover' | 'Messages' | 'Groups' | 'Profile';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('Discover');

  const renderPage = () => {
    switch (activePage) {
      case 'Discover':
        return <DiscoverPage />;
      case 'Profile':
        return <ProfilePage />;
      case 'Messages':
        return <div className="placeholder-page"><h2>💬 Messages</h2><p>Coming soon...</p></div>;
      case 'Groups':
        return <div className="placeholder-page"><h2>👥 Groups</h2><p>Coming soon...</p></div>;
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
