
import React, { createContext, useContext } from 'react';

// Minimal type stubs so existing imports don't break
export type MockUser = { id: string; email: string };
export type MockSession = { user: MockUser };

interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  isLoading: boolean;
  isAdmin: boolean;
  mfaEnabled: boolean;
  checkUserRole: () => Promise<boolean>;
  checkMFAStatus: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: { id: 'local-user', email: 'user@heartmender.com' },
  session: { user: { id: 'local-user', email: 'user@heartmender.com' } },
  isLoading: false,
  isAdmin: false,
  mfaEnabled: false,
  checkUserRole: async () => false,
  checkMFAStatus: async () => false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const mockUser: MockUser = { id: 'local-user', email: 'user@heartmender.com' };
  const mockSession: MockSession = { user: mockUser };

  return (
    <AuthContext.Provider
      value={{
        user: mockUser,
        session: mockSession,
        isLoading: false,
        isAdmin: false,
        mfaEnabled: false,
        checkUserRole: async () => false,
        checkMFAStatus: async () => false,
        signOut: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
