import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom, isAuthAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';
import ProductList from '../components/ProductList';
import CreateProduct from '../components/CreateProduct';

export default function Dashboard() {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const effectRan = useRef(false);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  useEffect(() => {
    if (effectRan.current === false && isLoggedIn && user.token) {
      const fetchUsers = async () => {
        if (!user.isAdmin) {
          setError('Unauthorized: Must be an Admin user.');
          return;
        }

        const { url, options } = buildRequestOptions('users', 'admin_dashboard', {
          token: user.token
        });

        console.log('Fetching users with options:', options);

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            setUsers(data.data);
          } else {
            setError(`Failed to fetch users: ${data.status.message}`);
            console.error('Failed to fetch users', data);
          }
        } catch (error) {
          setError('Error fetching users');
          console.error('Error fetching users', error);
        }
      };

      fetchUsers();
      effectRan.current = true;
    }

    return () => {
      effectRan.current = false;
    };
  }, [isLoggedIn, user.token, user.isAdmin]);

  useEffect(() => {
    if (!isLoggedIn || !user.isAdmin) {
      navigate('/'); // Redirige vers la page 404 si l'utilisateur n'est pas admin
    }
  }, [isLoggedIn, user.isAdmin, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(users)) {
    return <div>Unexpected response format</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Bienvenue, {user.email}!</h2>
      <h3>Liste des utilisateurs</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
      <h3>Liste des Produits</h3>
      <ProductList />
      <h3>Créer un nouveau Produit</h3>
      <CreateProduct />
    </div>
  );
}
