import './TicketDisplayModal.css';
import { handlePartialEdit } from '../../controllers/TicketController';
import { useState, useEffect } from 'react';
import DeleteTicketModal from './DeleteTicketModal';
import EditTicketModal from './EditTicketModal';

const PrioritiseTicketsModal = ({ ticket, onClose }) => {
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

  const renderStaticField = (label, field, isDate = false) => (
    <div className="field-box">
      <span className="field-label">{label}</span>
      <span className="field-value">
        {isDate
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
    </div>
  );

  const handleEditClick = async () => {
    if (isEditing) {
      const result = await handlePartialEdit(editedTicket._id, onClose, editedTicket);
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
            {renderStaticField('Company', 'companyName')}
            {renderStaticField('Budget', 'companyBudget')}
            {renderStaticField('Date', 'dateReport', true)}
            <div className="field-box">
              <span className="field-label">Level</span>
              <span className="field-value">{ticket.priorityLevel || '—'}</span>
            </div>
            {renderStaticField('Error', 'errorFound')}
            {renderStaticField('Reason', 'priorityReason')}
            <div className="field-box">
              <span className="field-label">Link</span>
              {ticket.linkTicket ? (
                <a
                  href={ticket.linkTicket}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="field-value link"
                >
                  Access
                </a>
              ) : (
                <span className="field-value">—</span>
              )}
            </div>

            <div className="field-box">
              <span className="field-label">Weight</span>
              {isEditing ? (
                <select
                  value={editedTicket.weight || ''}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  className="field-value"
                >
                  <option value="">Select weight</option>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              ) : (
                <span className="field-value">{ticket.weight || '—'}</span>
              )}
            </div>

            {/* Corrigido: Agora o "Responsable" está dentro de uma div .field-box */}
            <div className="field-box">
              <span className="field-label">Responsable</span>
              {isEditing ? (
                <input
                  type="text"
                  value={editedTicket.responsableName || ''}
                  onChange={(e) => handleChange('responsableName', e.target.value)}
                  className="field-value"
                />
              ) : (
                <span className="field-value">{ticket.responsableName || '—'}</span>
              )}
            </div>

            <div className="field-box">
              <span className="field-label">Priority</span>
              {isEditing ? (
                <select
                  value={editedTicket.priority || ''}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="field-value"
                >
                  <option value="">Select priority</option>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select>
              ) : (
                <span className="field-value">{ticket.priority || '—'}</span>
              )}
            </div>

            <div className="field-box">
              <span className="field-label">Status</span>
              {isEditing ? (
                <select
                  value={editedTicket.status || ''}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="field-value"
                >
                  <option value="">Select status</option>
                  <option value="not started">not started</option>
                  <option value="in progress">in progress</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                  <option value="blocked">blocked</option>
                </select>
              ) : (
                <span className="field-value">{ticket.status || '—'}</span>
              )}
            </div>
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
export default PrioritiseTicketsModal;