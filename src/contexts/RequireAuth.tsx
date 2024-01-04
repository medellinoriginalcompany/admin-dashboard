import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router-dom';

type RequireAuthProps = {
  children: React.JSX.Element// Renderiza um elemento ou um array de elementos JSX
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useContext(AuthContext);

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!auth.user) {
    return <Navigate to='/login' replace />;
  }

  return children;
}