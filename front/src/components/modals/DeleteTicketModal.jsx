import './Modal.css';
import { handleDelete } from '../../controllers/TicketController';
import { useState } from 'react';

const DeleteTicketModal = ({ id, onClose }) => {
  const [modal, setModal] = useState(null);

  const handleConfirmDelete = async () => {
    const result = await handleDelete(id, () => {
      setModal(null);
      onClose();
    });

    if (result) {
      setModal(<SuccessModal onClose={() => setModal(null)} />);
    } else {
      setModal(<FailureModal onClose={() => setModal(null)} />);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3>Are you sure you want to delete this ticket?</h3>
          <div className="modal-button-container">
            <button onClick={onClose}>No</button>
            <button onClick={handleConfirmDelete}>Yes</button>
          </div>
        </div>
      </div>
      {modal}
    </>
  );
};

export const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Ticket deleted successfully!</h3>
        <div className="modal-button-container">
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export const FailureModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Error deleting ticket.</h3>
        <div className="modal-button-container">
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTicketModal;
