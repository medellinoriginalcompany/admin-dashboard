import { Navigate } from 'react-router-dom';
import { useContext, ReactNode } from 'react'
import { AuthContext } from './AuthContext';

function LoginGuard({ children }: { children: ReactNode }) {

  const auth = useContext(AuthContext)
  const isAuthenticated = auth?.user;

  // Se o usuário estiver logado, redireciona para a página de home
  if (isAuthenticated != null) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default LoginGuard
