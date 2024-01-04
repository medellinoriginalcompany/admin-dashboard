import { useApi } from "../hooks/useApi";
import { User } from "../types/User";
import { AuthContext } from "./AuthContext"
import React, { useState, useEffect } from 'react';

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const api = useApi();

  const [user, setUser] = useState<User | null>(null);
  const [authValidated, setAuthValidated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateToken = async () => {
      const response = await api.validateToken();

      if (response) {
        setTimeout(() => {
          setUser(response.user);
          setAuthValidated(true);
          setLoading(false);
        }, 900);
      }

    };
    validateToken();
  }, []);

  const login = async (email: string, password: string) => {

    const data = await api.login(email, password);
    if (data.user && data.token) {
      setUser(data.user);

      return true
    };

    return false
  };

  const logout = async () => {
    const response = await api.logout();
    if (response) {
      setUser(null);

      return true;
    }

    return false;
  };


  return (
    <AuthContext.Provider value={{ user, authValidated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};