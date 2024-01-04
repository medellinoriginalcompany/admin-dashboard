import { Navigate } from 'react-router-dom';
import { useContext, ReactNode } from 'react'
import { AuthContext } from './AuthContext';
import Loading from '../pages/Loading';

function LoginGuard({ children }: Readonly<{ children: ReactNode }>) {

  const auth = useContext(AuthContext)
  
  if(!auth.authValidated) {
    return (
      <Loading />
    );
  }

  // Se o usuário estiver logado, redireciona para a página de home
  if (auth.user != null) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default LoginGuard
