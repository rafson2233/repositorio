import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://ticketflow-7gd8.onrender.com';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/validate`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, []);

  if (isAuthenticated === null) { 
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/accessDenied" />;
};

export default ProtectedRoute;
