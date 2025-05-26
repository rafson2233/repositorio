import { useState, useEffect } from "react";

export const ProfileController = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://ticketflow-7gd8.onrender.com';

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${BASE_URL}/api/auth/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar perfil.");
        }

        const data = await response.json();
        setName(data.name || '');
        setEmail(data.email || '');
        setAccessCode(data.accessCode || '');
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError('Erro de rede ou servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { name, email, accessCode, loading, error };
};
