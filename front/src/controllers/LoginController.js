import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoginController = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://ticketflow-7gd8.onrender.com';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessageEmail('');
    setErrorMessagePassword('');

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.toLowerCase().includes('email')) {
          setErrorMessageEmail(data.error);
        } else if (data.error?.toLowerCase().includes('password')) {
          setErrorMessagePassword(data.error);
        } else {
          alert(data.error || 'Unknown error occurred');
        }
        return;
      }
      navigate('/ticketRegistration');

    } catch (error) {
      console.error('Error logging in:', error);
      alert('Network error or server down');
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    errorMessageEmail,
    errorMessagePassword,
    handleSubmit,
    togglePasswordVisibility,
    showPassword
  };
};
