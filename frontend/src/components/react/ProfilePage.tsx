import { useState } from 'react';
import './ProfilePage.css';
import type { DogProfile } from '@/types/app';

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
    groups: number;
  };
}

const mockUser: UserProfile = {
  id: 'u1',
  name: 'Emma Andersson',
  image: '/profiles/emma.jpg',
  location: 'Stockholm, Sweden',
  bio: 'Dog trainer and agility enthusiast. Always looking for new training partners!',
  dogs: [
    {
      id: 'd1',
      name: 'Luna',
      breed: 'Border Collie',
      age: 2,
      sports: ['Agility', 'Frisbee'],
      training: ['Clicker', 'Positive Reinforcement'],
      location: 'Stockholm',
      images: ['/dogs/luna1.jpg', '/dogs/luna2.jpg'],
      bio: 'High-energy agility champion',
      owner: { id: 'u1', name: 'Emma Andersson', image: '/profiles/emma.jpg' }
    }
  ],
  stats: {
    matches: 24,
    events: 12,
    groups: 5
  }
};

export default function ProfilePage() {
  const [user] = useState<UserProfile>(mockUser);
  const [editMode, setEditMode] = useState(false);

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
            <img src={user.image} alt={user.name} onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120"%3E%3Crect fill="%23ddd" width="120" height="120"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="48"%3E👤%3C/text%3E%3C/svg%3E';
            }} />
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
            <div className="stat-value">{user.stats.groups}</div>
            <div className="stat-label">Groups</div>
          </div>
        </section>

        {/* Dogs Section */}
        <section className="dogs-section">
          <div className="section-header">
            <h3>My Dogs</h3>
            {editMode && <button className="add-btn">+ Add Dog</button>}
          </div>
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
            <button className="setting-item logout">
              <span>🚪 Log Out</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
