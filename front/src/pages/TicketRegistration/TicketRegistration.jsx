import Header from '../../components/header/PageHeader';
import Sidebar from '../../components/sideBar/SideBar';
import Modal from '../../components/modals/TicketRegistrationModal';
import { useTicketRegisterController } from '../../controllers/TicketRegistrationController';
import './TicketRegistration.css';

import {
  FaBuilding,
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaLink,
  FaBug
} from 'react-icons/fa';

const menuTicketRegistration = [];

export const TicketRegistration = () => {
  const response = useTicketRegisterController();

  return (
    <>
      <Header menuItems={menuTicketRegistration} />
      <Sidebar />
      <div className='ticketregistration'>
        <h2>REGISTER YOUR TICKET</h2>
        <div className='ticketForm'>
          <form onSubmit={response.handleSubmit}>
            <div className="dataLeft">
              <div className="input-icon-wrapper">
                <FaBuilding className="input-icon" />
                <input
                  className='form-input'
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Inform the company name"
                  value={response.companyName}
                  onChange={(e) => response.setCompanyName(e.target.value)}
                />
              </div>
              <p className="error-mensage">{response.errorMessageCompanyName}</p>

              <div className="input-icon-wrapper">
                <FaMoneyBillAlt className="input-icon" />
                <input
                  className='form-input'
                  type="text"
                  id="companyBudget"
                  name='companyBudget'
                  placeholder='Inform the company budget'
                  value={response.companyBudget}
                  onChange={(e) => response.setCompanyBudget(e.target.value)}
                />
              </div>
              <p className="error-mensage">{response.errorMessageCompanyBudget}</p>

              <div className="input-icon-wrapper">
                <FaCalendarAlt className="input-icon" />
                <input
                  className='form-input'
                  type="text"
                  id="dateReport"
                  name="dateReport"
                  placeholder="Inform the report date"
                  value={response.dateReport}
                  onChange={(e) => response.setDateReport(e.target.value)}
                />
              </div>
              <p className="error-mensage">{response.errorMessageDateReport}</p>

              <div className="input-icon-wrapper">
                <FaExclamationTriangle className="input-icon" />
                <select
                  className='form-input'
                  id="priorityLevel"
                  name='priorityLevel'
                  value={response.priorityLevel}
                  onChange={(e) => response.setPriorityLevel(e.target.value)}
                >
                  <option value="">Select the priority level</option>
                  <option value="Blocker">Blocker</option>
                  <option value="Critical">Critical</option>
                  <option value="Failure">Failure</option>
                  <option value="Failure Blocker">Failure Blocker</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <p className="error-mensage">{response.errorMessagePriorityLevel}</p>

              <div className="input-icon-wrapper">
                <FaQuestionCircle className="input-icon" />
                <input
                  className='form-input'
                  type="text"
                  id="priorityReason"
                  name="priorityReason"
                  placeholder="Inform the priority reason"
                  value={response.priorityReason}
                  onChange={(e) => response.setPriorityReason(e.target.value)}
                />
              </div>
              <p className="error-mensage">{response.errorMessagePriorityReason}</p>

              <div className="input-icon-wrapper">
                <FaLink className="input-icon" />
                <input
                  className='form-input'
                  type="text"
                  id="linkTicket"
                  name="linkTicket"
                  placeholder="Inform the ticket link"
                  value={response.linkTicket}
                  onChange={(e) => response.setLinkTicket(e.target.value)}
                />
              </div>
              <p className="error-mensage">{response.errorMessageLinkTicket}</p>

              <div className="input-icon-wrapper">
                <FaBug className="input-icon" />
                <input
                  className='form-input'
                  type="text"
                  name="errorFound"
                  placeholder="Inform the error found"
                  value={response.errorFound}
                  onChange={(e) => response.setErrorFound(e.target.value)}
                />
              </div>
              <p className="error-mensage">{response.errorMessageErrorFound}</p>
            </div>

            <button className="form button" type="submit" disabled={response.showSuccessModal}>
              SUBMIT
            </button>
          </form>

          {response.showSuccessModal && <Modal onClose={response.handleModalClose} />}
        </div>
      </div>
    </>
  );
};

export default TicketRegistration;
