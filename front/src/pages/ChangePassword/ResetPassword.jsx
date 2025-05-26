import Header from '../../components/header/PageHeader';
import { useResetPasswordController } from '../../controllers/ResetPasswordController';
import './ResetPassword.css';
import { FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from '../../components/modals/ResetPasswordModal';

const menuResetPassword = [
  { label: "HOME |", href: "/" },
  { label: 'LOGIN |', href: '/login' },
  { label: "ABOUT", href: "/about" }
];

export default function ResetPassword() {
  const response = useResetPasswordController();

  return (
    <>
      <Header menuItems={menuResetPassword} />
      <div className='body'>
        <div className="reset-password-container">
          <h2>Reset password</h2>
          <form onSubmit={response.handleSubmit}>
            <div className="input-container">
              <FaKey className="icon" />
              <input
                type={response.showPassword ? "text" : "password"}
                placeholder="Password"
                value={response.password}
                onChange={e => response.setPassword(e.target.value)}
              />
              <span onClick={response.togglePasswordVisibility} className="eye-icon">
                {response.showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="input-container">
              <FaKey className="icon" />
              <input
                type={response.showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={response.confirmPassword}
                onChange={e => response.setConfirmPassword(e.target.value)}
              />
              <span onClick={response.toggleConfirmPasswordVisibility} className="eye-icon">
                {response.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {response.errorMessage && (
              <p className="error">{response.errorMessage}</p>
            )}

            <button type="submit" disabled={response.showSuccessModal}>
              Submit
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
