import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User, UserRole } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (firstName: string, lastName: string, username: string, email: string, password?: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('labzero_token');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`${API_URL}/auth/me/`);
          setUser(response.data);
        } catch (error) {
          console.error("Token verification failed:", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        email: email, 
        password
      });
      const { access } = response.data;
      localStorage.setItem('labzero_token', access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      const userResponse = await axios.get(`${API_URL}/auth/me/`);
      setUser(userResponse.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (firstName: string, lastName: string, username: string, email: string, password?: string, role: UserRole = 'student') => {
    try {
      await axios.post(`${API_URL}/auth/register/`, {
        username,
        email,
        password,
        role,
        first_name: firstName,
        last_name: lastName
      });
      await login(email, password);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('labzero_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
