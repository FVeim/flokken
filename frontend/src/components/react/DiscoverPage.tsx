import { useState, useEffect } from 'react';
import DogCard from './DogCard';
import './DiscoverPage.css';
import type { DogProfile } from '@/types/app';
import { dogService } from '@/services/dogService';
import { useAuth } from '@/contexts/AuthContext';

export default function DiscoverPage() {
  const { user } = useAuth();
  const [dogs, setDogs] = useState<DogProfile[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadDogs();
    }
  }, [user]);

  const loadDogs = async () => {
    try {
      setLoading(true);
      setError('');
      const fetchedDogs = await dogService.getDiscoverDogs(user!.uid, 20);
      setDogs(fetchedDogs);
    } catch (err: any) {
      console.error('Error loading dogs:', err);
      setError(err.message || 'Failed to load dogs');
      setDogs([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    const currentDog = dogs[index];
    if (!currentDog || !user) return;

    try {
      const { matchService } = await import('@/services/matchService');
      await matchService.saveSwipe(user.uid, currentDog.id, direction === 'right');
      console.log(`${direction === 'right' ? 'Liked' : 'Passed'} on ${currentDog.name}`);
    } catch (err) {
      console.error('Failed to save swipe:', err);
    }

    setIndex(i => i + 1);
  };

  if (loading) {
    return (
      <div className="discover-page">
        <header className="discover-header"><h1>Discover</h1></header>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Finding dogs nearby...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discover-page">
        <header className="discover-header"><h1>Discover</h1></header>
        <div className="error-state">
          <p>❌ {error}</p>
          <button onClick={loadDogs}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="discover-page">
      <header className="discover-header"><h1>Discover</h1></header>
      <div className="cards-container">
        {index < dogs.length ? (
          <DogCard dog={dogs[index]} onSwipe={handleSwipe} />
        ) : (
          <div className="no-more-dogs">
            <h2>No More Dogs</h2>
            <p>Check back later for more profiles</p>
            <button onClick={loadDogs}>Reload</button>
          </div>
        )}
      </div>
    </div>
  );
}
