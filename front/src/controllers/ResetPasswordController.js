import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function useResetPasswordController() {
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [showSuccessModal, setshowSuccessModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  useEffect(() => {
    if (!token) {
      setErrorMessage('Token inválido ou ausente.');
    }
  }, [token]);


  const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://ticketflow-7gd8.onrender.com';

  const handleModalClose = () => {
    setshowSuccessModal(false);
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    try {
      const response = await fetch(`${BASE_URL}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error) {
          setErrorMessage(data.error);
        }
        return;
      }

      setshowSuccessModal(true);

    } catch (error) {
      console.error(error);
      alert('Network error or server down');
    }
  }

  return {
    password,
    confirmPassword,

    setPassword,
    setConfirmPassword,

    errorMessage,

    handleSubmit,
    showSuccessModal,
    setshowSuccessModal,
    handleModalClose,

    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility
  };
}
