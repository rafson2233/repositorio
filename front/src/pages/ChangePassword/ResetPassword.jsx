import { useResetPasswordController } from '../../controllers/ResetPasswordController';
import './ResetPassword.css';
import {FaKey,} from 'react-icons/fa';
import Modal from '../../components/modals/ResetPasswordModal';

export default function ResetPassword() {
  const response = useResetPasswordController();

  return (
    
    <div className='body'>
      <div className="reset-password-container">
        <h2>Reset password</h2>
        <form onSubmit={response.handleSubmit}>

          <div className="input-container">
            <FaKey className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={response.password}
              onChange={e => response.setPassword(e.target.value)}
            />
          </div>
          
          <div className="input-container">
            <FaKey className="icon" />
            <input
              type="password"
              placeholder="Confirm password"
              value={response.confirmPassword}
              onChange={e => response.setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            {response.errorMessage && (<p className="error">{response.errorMessage}</p>)}
          </div>

          <button type="submit" 
            disabled={response.showSuccessModal}>
            Submit
          </button>
        </form>
        {response.showSuccessModal && <Modal onClose={response.handleModalClose} />}
    </div>
    </div>

    
  );
}
