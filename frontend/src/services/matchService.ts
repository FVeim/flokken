import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const MATCHES_COLLECTION = 'matches';
const LIKES_COLLECTION = 'likes';

export const matchService = {
  // Save a swipe (like or pass)
  async saveSwipe(userId: string, dogId: string, liked: boolean): Promise<void> {
    const swipeData = {
      userId,
      dogId,
      liked,
      timestamp: serverTimestamp(),
    };

    if (liked) {
      // Save to likes collection
      await addDoc(collection(db, LIKES_COLLECTION), swipeData);

      // Check if it's a mutual match
      const isMutual = await this.checkMutualMatch(userId, dogId);
      if (isMutual) {
        await this.createMatch(userId, dogId);
      }
    }
  },

  // Check if there's a mutual like (both users liked each other's dogs)
  async checkMutualMatch(userId: string, dogId: string): Promise<boolean> {
    // Get the owner of the dog that was liked
    const likesRef = collection(db, LIKES_COLLECTION);
    const q = query(
      likesRef,
      where('dogId', '==', dogId),
      where('liked', '==', true)
    );
    
    const snapshot = await getDocs(q);
    // In a real app, you'd check if the dog owner also liked this user's dog
    // This is simplified for now
    return false;
  },

  // Create a match between two users
  async createMatch(userId1: string, userId2: string): Promise<void> {
    const matchData = {
      users: [userId1, userId2],
      timestamp: serverTimestamp(),
      chatStarted: false,
    };

    await addDoc(collection(db, MATCHES_COLLECTION), matchData);
  },

  // Get all matches for a user
  async getUserMatches(userId: string): Promise<any[]> {
    const matchesRef = collection(db, MATCHES_COLLECTION);
    const q = query(matchesRef, where('users', 'array-contains', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Get all likes by a user
  async getUserLikes(userId: string): Promise<any[]> {
    const likesRef = collection(db, LIKES_COLLECTION);
    const q = query(likesRef, where('userId', '==', userId), where('liked', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
};
