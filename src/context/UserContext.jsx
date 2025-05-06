import { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'; // ✅ Modular imports

const UserContext = createContext();

export function UserProvider({ children, user, signOut }) {
  console.log("[UserContext] Initial user:", user);
  const [currentUser] = useState(user);
  const [loadingUser] = useState(false);

  return (
    <UserContext.Provider value={{ user: currentUser, signOut, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
