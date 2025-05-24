import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegisterController = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [errorMessageAccessCode, setErrorMessageAccessCode] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://ticketflow-7gd8.onrender.com';


  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessageName('');
    setErrorMessageEmail('');
    setErrorMessagePassword('');
    setErrorMessageAccessCode('');

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, accessCode })
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error.includes('name') || data.error.includes('Name')) {
          setErrorMessageName(data.error);
        } else if (data.error.includes('email') || data.error.includes('Email')) {
          setErrorMessageEmail(data.error);
        } else if (data.error.includes('password') || data.error.includes('Password')) {
          setErrorMessagePassword(data.error);
        } else if (data.error.includes('access code') || data.error.includes('Access code') || data.error.includes('access Code') || data.error.includes('Access Code')) {
          setErrorMessageAccessCode(data.error);
        } else {
          alert(data.error);
        }
        return;
      }

      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error when registering:', error);
      alert('Network error or server down');
    }
  };

  return {
    name,
    email,
    password,
    accessCode,
    setName,
    setEmail,
    setPassword,
    setAccessCode,
    errorMessageName,
    errorMessageEmail,
    errorMessagePassword,
    errorMessageAccessCode,
    handleSubmit,
    showSuccessModal,
    setShowSuccessModal,
    showPassword,
    togglePasswordVisibility,
    handleModalClose
  };
};
