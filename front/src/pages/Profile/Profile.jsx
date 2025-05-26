import Header from '../../components/header/PageHeader';
import Sidebar from '../../components/sideBar/SideBar';
import { ProfileController } from '../../controllers/ProfileController';
import './Profile.css';
import { FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const menuProfile = [];

export const Profile = () => {
  const { name, email, accessCode, loading, error } = ProfileController();

  return (
    <>
      <Header menuItems={menuProfile} />
      <Sidebar />
      <main className='profile'>
        <img src="/perfil.png" alt="Foto de perfil" className='profile-image' />

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="data">
              <div className="print-container">
                <h1>{name}</h1>
                <h2>{email}</h2>
                <p><strong>Código de Acesso:</strong> {accessCode}</p>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Profile;
