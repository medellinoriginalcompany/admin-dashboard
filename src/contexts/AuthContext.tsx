import { createContext } from 'react'
import { User } from '../types/User';

export type AuthContextType = {
  user: User | null,
  authValidated: boolean,
  login: (email: string, password: string) => Promise<boolean>,
  logout: () => void,
}

export const AuthContext = createContext<AuthContextType>(null!);