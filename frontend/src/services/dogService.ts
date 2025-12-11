import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { DogProfile } from '@/types/app';

const DOGS_COLLECTION = 'dogs';

export const dogService = {
  // Get all dogs
  async getAllDogs(): Promise<DogProfile[]> {
    const dogsRef = collection(db, DOGS_COLLECTION);
    const snapshot = await getDocs(dogsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DogProfile));
  },

  // Get dogs for discovery (exclude user's own dogs)
  async getDiscoverDogs(userId: string, limitCount: number = 10): Promise<DogProfile[]> {
    try {
      const dogsRef = collection(db, DOGS_COLLECTION);
      const q = query(
        dogsRef,
        where('owner.id', '!=', userId),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DogProfile));
    } catch (error) {
      console.error('Error fetching discover dogs:', error);
      return []; // Return empty array on error
    }
  },

  // Get user's dogs
  async getUserDogs(userId: string): Promise<DogProfile[]> {
    try {
      const dogsRef = collection(db, DOGS_COLLECTION);
      const q = query(dogsRef, where('owner.id', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DogProfile));
    } catch (error) {
      console.error('Error fetching user dogs:', error);
      return []; // Return empty array on error
    }
  },

  // Add a new dog
  async addDog(dog: Omit<DogProfile, 'id'>): Promise<string> {
    const dogsRef = collection(db, DOGS_COLLECTION);
    const docRef = await addDoc(dogsRef, dog);
    return docRef.id;
  },

  // Update a dog
  async updateDog(dogId: string, data: Partial<DogProfile>): Promise<void> {
    const dogRef = doc(db, DOGS_COLLECTION, dogId);
    await updateDoc(dogRef, data);
  },

  // Delete a dog
  async deleteDog(dogId: string): Promise<void> {
    const dogRef = doc(db, DOGS_COLLECTION, dogId);
    await deleteDoc(dogRef);
  },
};
