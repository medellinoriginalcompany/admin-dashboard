import { useApi } from "../hooks/useApi";
import { User } from "../types/User";
import { AuthContext } from "./AuthContext"
import React, { useState, useEffect } from 'react';

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
  const api = useApi();

  const [user, setUser] = useState<User | null>(null);
  const [authValidated, setAuthValidated] = React.useState<boolean>(false);

  useEffect(() => {
    const validateToken = async () => {
      const response = await api.validateToken();

      if (response) {
        setUser(response.user);
      }

      setAuthValidated(true);
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
    <AuthContext.Provider value={{ user, authValidated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};