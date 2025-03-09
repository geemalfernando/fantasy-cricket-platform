import React, { createContext, useContext, useState } from 'react';

// Create a context with a default value
const AuthContext = createContext({
  user: null,
  setUser: () => {},
  login: (user) => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function that stores user data
  const login = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'fake-token'); // Assuming you set a token on login
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
