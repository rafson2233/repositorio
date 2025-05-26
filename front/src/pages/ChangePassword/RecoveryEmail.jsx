import Header from '../../components/header/PageHeader';
import { useRecoveryEmailController } from '../../controllers/RecoveryEmailController';
import './RecoveryEmail.css';
import Modal from '../../components/modals/RecoveryEmailModal';
import { FaEnvelope, } from 'react-icons/fa';

const menuRecoveryEmail = [
  { label: "HOME |", href: "/" },
  { label: 'LOGIN |', href: '/login' },
  { label: "ABOUT", href: "/about" }
];

export default function RecoveryEmail() {
  const response = useRecoveryEmailController();

  return (
    <>
      <Header menuItems={menuRecoveryEmail} />
      <div className='body'>
        <div className="recovery-email-container">
          <h2>Request password recovery</h2>
          <form onSubmit={response.handleSubmit}>
            <div className="input-container">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={response.email}
                onChange={e => response.setEmail(e.target.value)}
              />
            </div>

            <div>
              {response.errorMessageEmail && (
                <p className="error">{response.errorMessageEmail}</p>
              )}
            </div>

            <button type="submit" disabled={response.isSending}>
              {response.isSending ? 'SENDING...' : 'Submit'}
            </button>
          </form>

          {response.showSuccessModal && (
            <Modal onClose={response.handleModalClose} />
          )}
        </div>
      </div>
    </>
  );
}
