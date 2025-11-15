import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  name: string;
  email: string;
  department: string;
  currentRole: string;
  technicalSkills: string[];
  softSkills: string[];
  careerInterests: string[];
  workStyle: string;
  documents: File[];
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserContext.Provider value={{ userData, setUserData, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
