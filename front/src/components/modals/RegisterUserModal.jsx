import './Modal.css';

const RegisterUserModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>User registered successfully!</h3>
        <div className="modal-button-container">
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserModal;
