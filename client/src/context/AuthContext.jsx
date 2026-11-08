import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('campusos_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (err) {
        console.error('Failed to restore session:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token]);

  const login = async (identifier, password) => {
    const response = await api.post('/auth/login', {
      identifier,
      email: identifier.includes('@') ? identifier : undefined,
      password,
    });
    const { user: userData, token: userToken } = response.data;
    localStorage.setItem('campusos_token', userToken);
    localStorage.setItem('campusos_user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
    return userData;
  };

  const register = async (payload) => {
    const response = await api.post('/auth/register', payload);
    const { user: userData, token: userToken } = response.data;
    localStorage.setItem('campusos_token', userToken);
    localStorage.setItem('campusos_user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('campusos_token');
    localStorage.removeItem('campusos_user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        token,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

