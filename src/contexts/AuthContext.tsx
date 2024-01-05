import { createContext } from 'react'
import { User } from '../types/User';
import { Credentials } from '../types/Credentials';

export type AuthContextType = {
  user: User | null,
  authValidated: boolean,
  loading: boolean,
  login: (credentials: Credentials) => Promise<boolean>,
  logout: () => void,
}

export const AuthContext = createContext<AuthContextType>(null!);