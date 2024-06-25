// AdminContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom, isAuthAtom } from '../app/atoms';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AdminProvider useEffect triggered');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('user.token:', user.token);

    const fetchAdminStatus = async () => {
      if (!isLoggedIn || !user.token) {
        console.log('Not logged in or no token, setting loading to false');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching admin status...');
        const response = await fetch('http://127.0.0.1:3000/admin_check', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to check admin status');
        }

        const data = await response.json();
        console.log('Admin check response:', data);
        setIsAdmin(data.admin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [isLoggedIn, user.token]);

  return (
    <AdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
};
