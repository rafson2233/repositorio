import './TicketDisplayModal.css';

const AllTicketsModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const renderField = (label, value, isLink = false) => (
    <div className="field-box">
      <span className="field-label">{label}</span>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="field-value link">
          Access
        </a>
      ) : (
        <span className="field-value">{value || '—'}</span>
      )}
    </div>
  );

  return (
    <div className="modal-overlay-ticket" onClick={onClose}>
      <div className="modal-content-ticket" onClick={(e) => e.stopPropagation()}>
        <h2>Ticket Details</h2>
        <div className="field-grid">
          {renderField('Company', ticket.companyName)}
          {renderField('Budget', ticket.companyBudget)}
          {renderField('Date', new Date(ticket.dateReport).toLocaleDateString())}
          {renderField('Level', ticket.priorityLevel)}
          {renderField('Error', ticket.errorFound)}
          {renderField('Reason', ticket.priorityReason)}
          {renderField('User', ticket.userName)}
          {renderField('Responsible', ticket.responsableName || 'Not assigned')}
          {renderField('Link', ticket.linkTicket, true)}
          {renderField('Status', ticket.status)}
        </div>

        <div className="modal-actions">
          <button className="btn-close-modal-ticket" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AllTicketsModal;
