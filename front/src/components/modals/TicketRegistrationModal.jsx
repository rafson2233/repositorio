import './Modal.css';

const TicketRegistrationModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Ticket registered successfully!</h3>
        <div className="modal-button-container">
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default TicketRegistrationModal;
