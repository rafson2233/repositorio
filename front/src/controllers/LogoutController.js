const LogoutController = async () => {

  const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://ticketflow-7gd8.onrender.com';

  try {
    const response = await fetch(`${BASE_URL}/logout`, {

      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error logging out');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in LogoutController:', error);
    return { message: 'Error logging out' };
  }
};

export default LogoutController;