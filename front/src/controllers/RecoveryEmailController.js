import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRecoveryEmailController() {
  const [email, setEmail] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [showSuccessModal, setshowSuccessModal] = useState(false)
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();



  const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://ticketflow-7gd8.onrender.com';

  const handleModalClose = () => {
    setshowSuccessModal(false);
    navigate('/login');
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrorMessageEmail('')
    setIsSending(true);


    try {
      const response = await fetch(`${BASE_URL}/api/auth/recovery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error){
          setErrorMessageEmail(data.error)
        }
        setIsSending(false);
        return;
      }
      setshowSuccessModal(true);

    } catch (error) {
      console.error(error);
      alert('Network error or server down');
      setIsSending(false);
    }
    
  }

  return {
    email,

    setEmail,
    setIsSending,

    errorMessageEmail,

    handleSubmit,
    setshowSuccessModal,
    showSuccessModal,
    handleModalClose,
    isSending
  };
}
