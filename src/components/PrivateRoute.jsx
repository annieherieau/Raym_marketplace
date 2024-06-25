import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { isAuthAtom } from '../app/atoms';

export default function PrivateRoute ({children, redirect }){
  const isLoggedIn = useAtomValue(isAuthAtom);
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate
    to={`/login?redirect=${encodeURIComponent(redirect || location.pathname)}`}
    />
  );
};
