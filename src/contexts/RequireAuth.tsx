import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router-dom';
import Loading from '../pages/Loading';

type RequireAuthProps = {
  children: React.JSX.Element// Renderiza um elemento ou um array de elementos JSX
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useContext(AuthContext);

  if (auth.loading) return <Loading />;
  
  if (auth.user) return children;
  
  // Se não estiver logado, redireciona para a página de login
  if (!auth.user || !auth.authValidated) return <Navigate to="/login" replace />;
}