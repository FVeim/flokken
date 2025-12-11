import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const USERS_COLLECTION = 'users';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image?: string;
  location?: string;
  bio?: string;
  createdAt: any;
  updatedAt: any;
}

export const userService = {
  // Create a new user profile
  async createUserProfile(userId: string, email: string, data?: Partial<UserProfile>): Promise<void> {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userData: Partial<UserProfile> = {
      id: userId,
      email,
      name: data?.name || email.split('@')[0],
      image: data?.image || '',
      location: data?.location || '',
      bio: data?.bio || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(userRef, userData);
  },

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const snapshot = await getDoc(userRef);
    
    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as UserProfile;
  },

  // Update user profile
  async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date(),
    });
  },

  // Search users by location
  async searchUsersByLocation(location: string): Promise<UserProfile[]> {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('location', '==', location));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as UserProfile);
  },

  // Check if user profile exists
  async userProfileExists(userId: string): Promise<boolean> {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const snapshot = await getDoc(userRef);
    return snapshot.exists();
  },
};
