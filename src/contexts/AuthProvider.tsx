import { useApi } from "../hooks/useApi";
import { Credentials } from "../types/Credentials";
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
      try {
        const response = await api.validateToken();

        if (response) {
          setUser(response.user);
          setAuthValidated(true);
        }
        setLoading(false);

      } catch (error) {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (credentials: Credentials) => {
    const response = await api.login(credentials);
    if (response.user && response.token) {
      setUser(response.user);
      setLoading(false);
    };

    return false;
  };

  const logout = async () => {
    const response = await api.logout();
    if (response) setUser(null);

    return response;
  };


  return (
    <AuthContext.Provider value={{ user, authValidated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};