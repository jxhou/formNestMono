import { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated as checkIsAuthenticated, logout as apiLogout } from './services/authService';

// This context will hold authentication state like the user object and JWT token.
// It will be used to provide this state to components throughout the app.

// 1. Define the shape of the context data
interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

// 2. Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(checkIsAuthenticated());
  const navigate = useNavigate();

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    apiLogout(); // This clears the token from localStorage
    setIsAuth(false);
    navigate('/login');
  };

  return <AuthContext.Provider value={{ isAuth, login, logout }}>{children}</AuthContext.Provider>;
};

// 4. Create a custom hook for easy context consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};