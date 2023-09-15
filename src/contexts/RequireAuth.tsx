import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import Login from '../pages/Login';

export const RequireAuth = ({ children }: {children: React.JSX.Element}) => {
  const auth = useContext(AuthContext);

  // Se o usuário não estiver logado, redireciona para a página de login
  if(!auth.user){
    return <Login />
  }
  return children;
}