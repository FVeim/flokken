import { useState, useEffect } from 'react';
import './ProfilePage.css';
import type { DogProfile } from '@/types/app';
import { useAuth } from '@/contexts/AuthContext';
import { dogService } from '@/services/dogService';
import { userService } from '@/services/userService';
import type { UserProfile as FirebaseUserProfile } from '@/services/userService';
import { matchService } from '@/services/matchService';
import AddDogForm from './AddDogForm';

interface UserProfile {
  id: string;
  name: string;
  image: string;
  location: string;
  bio: string;
  dogs: DogProfile[];
  stats: {
    matches: number;
    events: number;
    communities: number;
  };
}

export default function ProfilePage() {
  const { user: authUser, signOut } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddDog, setShowAddDog] = useState(false);

  useEffect(() => {
    if (authUser) {
      loadUserProfile();
    }
  }, [authUser]);

  const loadUserProfile = async () => {
    if (!authUser) return;

    try {
      setLoading(true);

      // Get user profile
      let profile = await userService.getUserProfile(authUser.uid);
      
      // Create profile if it doesn't exist
      if (!profile) {
        await userService.createUserProfile(authUser.uid, authUser.email!);
        profile = await userService.getUserProfile(authUser.uid);
      }

      // Get user's dogs
      const dogs = await dogService.getUserDogs(authUser.uid);

      // Get stats
      const matches = await matchService.getUserMatches(authUser.uid);

      setUser({
        id: authUser.uid,
        name: profile?.name || authUser.email!,
        image: profile?.image || '',
        location: profile?.location || '',
        bio: profile?.bio || '',
        dogs: dogs,
        stats: {
          matches: matches.length,
          events: 0,
          communities: 0,
        },
      });
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <header className="profile-header"><h1>Profile</h1></header>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <header className="profile-header"><h1>Profile</h1></header>
        <div className="error-state">
          <p>Failed to load profile</p>
          <button onClick={loadUserProfile}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Profile</h1>
        <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
          {editMode ? '✓ Done' : '✏️ Edit'}
        </button>
      </header>

      <div className="profile-content">
        {/* User Info Section */}
        <section className="user-section">
          <div className="user-avatar">
            {user.image ? (
              <img src={user.image} alt={user.name} onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120"%3E%3Crect fill="%23ddd" width="120" height="120"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="48"%3E👤%3C/text%3E%3C/svg%3E';
              }} />
            ) : (
              <div className="user-avatar-placeholder">👤</div>
            )}
          </div>
          <h2 className="user-name">{user.name}</h2>
          <p className="user-location">📍 {user.location}</p>
          <p className="user-bio">{user.bio}</p>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-item">
            <div className="stat-value">{user.stats.matches}</div>
            <div className="stat-label">Matches</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.stats.events}</div>
            <div className="stat-label">Events</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.stats.communities}</div>
            <div className="stat-label">Communities</div>
          </div>
        </section>
        {/* Dogs Section */}
        <section className="dogs-section">
          <div className="section-header">
            <h3>My Dogs</h3>
            <button className="add-btn" onClick={() => setShowAddDog(true)}>+ Add Dog</button>
          </div>
          {user.dogs.length === 0 ? (
            <div className="empty-state">
              <p>🐕 No dogs yet</p>
              <button className="add-first-dog-btn" onClick={() => setShowAddDog(true)}>
                Add Your First Dog
              </button>
            </div>
          ) : (
          <div className="dogs-list">
            {user.dogs.map(dog => (
              <div key={dog.id} className="dog-card">
                <img 
                  src={dog.images[0]} 
                  alt={dog.name}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e0e0e0" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="40"%3E🐕%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="dog-info">
                  <h4>{dog.name}</h4>
                  <p className="dog-breed">{dog.breed} • {dog.age}y</p>
                  <div className="dog-sports">
                    {dog.sports.map(sport => (
                      <span key={sport} className="sport-tag">{sport}</span>
                    ))}
                  </div>
                </div>
                {editMode && <button className="edit-dog-btn">✏️</button>}
              </div>
            ))}
          </div>
          )}
        </section>

        {/* Settings Section */}
        <section className="settings-section">
          <h3>Settings</h3>
          <div className="settings-list">
            <button className="setting-item">
              <span>🔔 Notifications</span>
              <span className="chevron">›</span>
            </button>
            <button className="setting-item">
              <span>🔒 Privacy</span>
              <span className="chevron">›</span>
            </button>
            <button className="setting-item">
              <span>📍 Location Settings</span>
              <span className="chevron">›</span>
            </button>
            <button className="setting-item">
              <span>❓ Help & Support</span>
              <span className="chevron">›</span>
            </button>
            <button className="setting-item logout" onClick={handleSignOut}>
              <span>🚪 Log Out</span>
            </button>
          </div>
        </section>
      </div>

      {showAddDog && (
        <AddDogForm
          onClose={() => setShowAddDog(false)}
          onSuccess={loadUserProfile}
        />
      )}
    </div>
  );
}
