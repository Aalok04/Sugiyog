import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sugiyog_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('sugiyog_admin_token');
    if (token) {
      api
        .get('/auth/profile')
        .then((res) => {
          if (res.success && res.data) {
            setAdminUser(res.data);
            localStorage.setItem('sugiyog_admin_user', JSON.stringify(res.data));
          }
        })
        .catch(() => {
          localStorage.removeItem('sugiyog_admin_token');
          localStorage.removeItem('sugiyog_admin_user');
          setAdminUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.success && response.data) {
      const { token, user } = response.data;
      localStorage.setItem('sugiyog_admin_token', token);
      localStorage.setItem('sugiyog_admin_user', JSON.stringify(user));
      setAdminUser(user);
      return user;
    }
    throw new Error(response.message || 'Login failed');
  };

  const logout = () => {
    localStorage.removeItem('sugiyog_admin_token');
    localStorage.removeItem('sugiyog_admin_user');
    setAdminUser(null);
    window.location.href = '/admin/login';
  };

  return (
    <AuthContext.Provider value={{ adminUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
