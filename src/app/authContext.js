'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on initial load and after changes
  const checkAuth = async () => {
    try {
      const response = await fetch('https://api.ucommerce.live/api/auth/me', {
        method: 'GET',
        credentials: 'include', // Important for cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth verification error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check auth on initial load
  useEffect(() => {
    checkAuth();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      // Call logout endpoint
      await fetch("https://api.ucommerce.live/api/auth/logout", {
        method: "POST",
        credentials: "include", // Important for cookies
      });
      
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshAuth: checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);