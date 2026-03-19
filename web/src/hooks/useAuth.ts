"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check for token in localStorage (Backend Auth)
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
        try {
            // Simple base64 decode to get user info if possible (not secure, but helps UI state)
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decoded = JSON.parse(jsonPayload);
            setUser({ uid: decoded.id, email: decoded.email, role: decoded.role });
        } catch (e) {
            console.error("Error decoding token", e);
        }
    }

    // 2. Also listen to Firebase Auth (if used)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
      if (typeof window !== 'undefined') localStorage.removeItem("token");
      return signOut(auth);
  };

  return { user, loading, logout };
};
