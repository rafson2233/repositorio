const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://ticketflow-7gd8.onrender.com";

export const handleEdit = async (id, onClose, ticketData) => {
  try {
    const response = await fetch(`${BASE_URL}/editTicket/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || 'Unknown error occurred.' };
    }
  } catch (err) {
    console.error('Failed to edit ticket:', err);
    return { success: false, error: 'An error occurred while trying to edit the ticket.' };
  }
};

export const handleDelete = async (id, onClose) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteTicket/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      onClose();
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Failed to delete ticket:', err);
    alert('An error occurred while trying to delete the ticket.');
    return false;
  }
};

export const handlePartialEdit = async (id, onClose, ticketData) => {
  try {
    const response = await fetch(`${BASE_URL}/editPartialTicket/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || 'Unknown error occurred.' };
    }
  } catch (err) {
    console.error('Failed to edit ticket:', err);
    return { success: false, error: 'An error occurred while trying to edit the ticket.' };
  }
};

