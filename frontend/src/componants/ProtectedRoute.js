import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure to import the useAuth hook

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth(); // Get user from context

  if (!user) {
    // If there's no user (not logged in), redirect to the login page
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If the user doesn't have the required role, redirect to the home page
    return <Navigate to="/" />;
  }

  // If the user is logged in and has the correct role (if provided), render the children
  return children;
};

export default ProtectedRoute;
