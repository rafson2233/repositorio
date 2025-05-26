import './Modal.css';

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Email sent successfully!</h3>
        <div className="modal-button-container">
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
