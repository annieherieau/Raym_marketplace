// AdminContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom, isAuthAtom } from '../app/atoms';
const api_url = import.meta.env.VITE_BACK_API_URL;

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
        const response = await fetch(`${api_url}/categories` , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Échec de la vérification du statut d'administrateur');
        }

        const data = await response.json();
        console.log("Réponse de vérification de l'administrateur:", data);
        setIsAdmin(data.admin);
      } catch (error) {
        console.error("Erreur lors de la vérification du statut d'administrateur:", error);
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
