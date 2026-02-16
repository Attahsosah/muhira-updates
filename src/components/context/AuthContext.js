import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();
export const AllowedContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // To actually set the user
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
  };
  return (
    <AuthContext.Provider value={value}>
      <AllowedContext.Provider value={[allowed, setAllowed]}>
        {/* Not rendering the application until there is a current user set */}
        {!loading && children}
      </AllowedContext.Provider>
    </AuthContext.Provider>
  );
}
