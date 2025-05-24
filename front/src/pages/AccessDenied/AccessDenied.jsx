import Header from '../../components/header/PageHeader';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import './AccessDenied.css';

const menuAccessDenied = [
    { label: "LOGIN |", href: "/login" },
    { label: "CADASTRO |", href: "/register" },
    { label: "SOBRE", href: "/about" },
];

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header menuItems={menuAccessDenied} />
            <div className="access-denied-container">
                <FaLock className="access-denied-icon" />
                <h2 className="access-denied-message">
                    Sorry, you are not authorized to access the page you requested.
                </h2>
                <button className="access-denied-button" onClick={() => navigate('/')}>
                    Go back to home
                </button>
            </div>
        </>
    );
};

export default AccessDenied;
