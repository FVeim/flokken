import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export const authService = {
  // Sign in
  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  // Sign up
  async signUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  // Sign out
  async signOut() {
    return await firebaseSignOut(auth);
  },

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};
