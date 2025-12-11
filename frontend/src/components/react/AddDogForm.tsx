import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { dogService } from '@/services/dogService';
import type { DogProfile } from '@/types/app';
import './AddDogForm.css';

interface AddDogFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddDogForm({ onClose, onSuccess }: AddDogFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    location: '',
    bio: '',
    sports: '',
    training: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const dogData: Omit<DogProfile, 'id'> = {
        name: formData.name,
        breed: formData.breed,
        age: parseInt(formData.age),
        location: formData.location,
        bio: formData.bio,
        sports: formData.sports.split(',').map(s => s.trim()).filter(Boolean),
        training: formData.training.split(',').map(t => t.trim()).filter(Boolean),
        images: [`https://placedog.net/500/500?random=${Date.now()}`],
        owner: {
          id: user.uid,
          name: user.email?.split('@')[0] || 'User',
          image: '',
        },
      };

      await dogService.addDog(dogData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add dog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Add Your Dog</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <form className="add-dog-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
              placeholder="Luna"
            />
          </div>

          <div className="form-group">
            <label htmlFor="breed">Breed *</label>
            <input
              id="breed"
              type="text"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              required
              disabled={loading}
              placeholder="Border Collie"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age (years) *</label>
            <input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
              disabled={loading}
              min="0"
              max="30"
              placeholder="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              disabled={loading}
              placeholder="Stockholm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sports">Sports (comma separated)</label>
            <input
              id="sports"
              type="text"
              value={formData.sports}
              onChange={(e) => setFormData({ ...formData, sports: e.target.value })}
              disabled={loading}
              placeholder="Agility, Frisbee, Rally"
            />
          </div>

          <div className="form-group">
            <label htmlFor="training">Training Methods (comma separated)</label>
            <input
              id="training"
              type="text"
              value={formData.training}
              onChange={(e) => setFormData({ ...formData, training: e.target.value })}
              disabled={loading}
              placeholder="Clicker, Positive Reinforcement"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={loading}
              placeholder="Tell us about your dog..."
              rows={3}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Adding...' : 'Add Dog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
