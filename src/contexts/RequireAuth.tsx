import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import Login from '../pages/Login';

type RequireAuthProps = {
  children: React.JSX.Element// Renderiza um elemento ou um array de elementos JSX
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useContext(AuthContext);

  // Se o usuário não estiver logado, redireciona para a página de login
  if (!auth.user) {
    return <Login />
  }
  
  return children;
}