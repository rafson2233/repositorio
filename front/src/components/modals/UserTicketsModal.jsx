import './TicketDisplayModal.css';
import { handleEdit } from '../../controllers/TicketController';
import { useState, useEffect } from 'react';
import DeleteTicketModal from './DeleteTicketModal';
import EditTicketModal from './EditTicketModal';

const UserTicketsModal = ({ ticket, onClose }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);

  useEffect(() => {
    if (ticket) {
      setEditedTicket({
        ...ticket,
        dateReport: ticket.dateReport
          ? new Date(ticket.dateReport).toISOString().split("T")[0]
          : '',
      });
    }
  }, [ticket]);

  if (!ticket) return null;

  const handleChange = (field, value) => {
    setEditedTicket(prev => ({ ...prev, [field]: value }));
  };

  const renderField = (label, field, type = 'text', isLink = false) => (
    <div className="field-box">
      <span className="field-label">{label}</span>
      {isEditing ? (
        type === 'textarea' ? (
          <textarea
            value={editedTicket[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className="field-value"
          />
        ) : (
          <input
            type={type}
            value={editedTicket[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className="field-value"
          />
        )
      ) : isLink ? (
        <a href={editedTicket[field]} target="_blank" rel="noopener noreferrer" className="field-value link">
          Access
        </a>
      ) : (
        <span className="field-value">
          {field === 'dateReport'
            ? (() => {
              const d = new Date(ticket[field]);
              if (isNaN(d)) return 'Data inválida';
              const day = String(d.getUTCDate()).padStart(2, '0');
              const month = String(d.getUTCMonth() + 1).padStart(2, '0');
              const year = d.getUTCFullYear();
              return `${day}/${month}/${year}`;
            })()
            : ticket[field] || '—'}
        </span>
      )}
    </div>
  );

  const handleEditClick = async () => {
    if (isEditing) {
      const [year, month, day] = editedTicket.dateReport.split("-");
      const formattedDate = `${day}/${month}/${year}`;
      const updatedTicket = { ...editedTicket, dateReport: formattedDate };

      const result = await handleEdit(editedTicket._id, onClose, updatedTicket);
      if (result.success) {
        setIsEditing(false);
        setErrorMessage('');
        setShowEditSuccessModal(true);
      } else {
        setErrorMessage(result.error);
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <div className="modal-overlay-ticket" onClick={onClose}>
        <div className="modal-content-ticket" onClick={(e) => e.stopPropagation()}>
          <h2>Ticket Details</h2>
          <div className="field-grid">
            {renderField('Company', 'companyName')}
            {renderField('Budget', 'companyBudget')}
            {renderField('Date', 'dateReport', 'date')}
            <div className="field-box">
              <span className="field-label">Level</span>
              {isEditing ? (
                <select
                  value={editedTicket.priorityLevel || ''}
                  onChange={(e) => handleChange('priorityLevel', e.target.value)}
                  className="field-value"
                >
                  <option value="">Select level</option>
                  {['Critical', 'Blocker', 'Failure', 'Failure Blocker', 'High', 'Low'].map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              ) : (
                <span className="field-value">{ticket.priorityLevel || '—'}</span>
              )}
            </div>
            {renderField('Error', 'errorFound', 'textarea')}
            {renderField('Reason', 'priorityReason', 'textarea')}
            {renderField('Link', 'linkTicket', 'text', true)}
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="modal-actions">
            {isEditing ? (
              <>
                <button className="btn-edit-ticket" onClick={handleEditClick}>
                  Save
                </button>
                <button
                  className="btn-cancel-ticket"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTicket({
                      ...ticket,
                      dateReport: ticket.dateReport
                        ? new Date(ticket.dateReport).toISOString().split("T")[0]
                        : '',
                    });
                    setErrorMessage('');
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="btn-edit-ticket" onClick={handleEditClick}>
                  Edit
                </button>
                <button className="btn-delete-ticket" onClick={() => setShowDeleteModal(true)}>
                  Delete
                </button>
              </>
            )}
            <button className="btn-close-modal-ticket" onClick={onClose}>
              Close
            </button>
          </div>

          {showDeleteModal && (
            <DeleteTicketModal
              id={ticket._id}
              onClose={() => {
                setShowDeleteModal(false);
                onClose();
              }}
            />
          )}
        </div>
      </div>

      {showEditSuccessModal && (
        <EditTicketModal
          onClose={() => {
            setShowEditSuccessModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default UserTicketsModal;
