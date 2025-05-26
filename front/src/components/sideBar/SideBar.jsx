import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./SideBar.css";
import LogoutController from '../../controllers/LogoutController'; 
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await LogoutController(); 
      if (response.message === 'Logout successful') {
        navigate("/");
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "←" : "→"}
      </button>

      <nav className="sidebar-nav">
        <Link to="/ticketRegistration">
          <button>Create ticket</button>
        </Link>
        <Link to="/userTickets">
          <button>My tickets</button>
        </Link>
        <Link to="/allTickets">
          <button>All tickets</button>
        </Link>
        <Link to="/prioritiseTickets">
          <button>Sort tickets</button>
        </Link>
        
      </nav>

      <div className="sidebar-footer">
        <div>
          <Link to="/Profile">
          <button className="logout-button">Profile</button>
        </Link>
        </div> 
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
