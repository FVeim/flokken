import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: ReturnType<typeof auth.currentUser>;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ReturnType<typeof auth.currentUser>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout in case auth never responds
    const timeout = setTimeout(() => {
      console.warn('Auth initialization timeout');
      setLoading(false);
    }, 5000);

    const unsubscribe = authService.onAuthStateChange((user) => {
      clearTimeout(timeout);
      setUser(user);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    await authService.signIn(email, password);
  };

  const signUp = async (email: string, password: string) => {
    await authService.signUp(email, password);
  };

  const signOut = async () => {
    await authService.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
