import Header from '../../components/header/PageHeader';
import './About.css';
import { useNavigate } from 'react-router-dom';
import { FaBug, FaListAlt, FaUserCog, FaRegClipboard } from 'react-icons/fa';

const menuAbout = [
  { label: 'LOGIN |', href: '/login' },
  { label: 'HOME', href: '/' },
];

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header menuItems={menuAbout} />
      <section className="about">
        <div className="contentAbout">
          <h2>Sobre o TicketFlow</h2>
          <p>
            O Ticket Flow é uma plataforma criada para facilitar o fluxo de
            comunicação entre Quality Assurance (QA) e Engenharia. Nosso
            objetivo é oferecer um ambiente centralizado onde os tickets
            reportados no Jira possam ser organizados e priorizados,
            garantindo uma resolução eficiente.
          </p>
          <p>O que oferecemos?</p>
          <ul>
            <li>▪️ Registro e acompanhamento de tickets.</li>
            <li>▪️ Integração com Jira para evitar retrabalho.</li>
            <li>▪️ Gerenciamento de prioridades para maior controle.</li>
            <li>▪️ Notificações para manter todos informados.</li>
          </ul>
          <p>
            Desenvolvido pensando na produtividade e colaboração, o TicketFlow
            é a ponte entre QA e Engenharia, garantindo que nenhum bug passe despercebido!
          </p>
          <div className="buttonAbout">
            <button onClick={() => navigate('/register')}>
              COMECE AGORA!
            </button>
          </div>
        </div>
      </section>

      <section className="roadmap">
        <h2>Como funciona?</h2>
        <div className="steps">
          <div className="step">
            <FaBug className="icon-About" />
            <p>QA reporta o ticket via Jira.</p>
          </div>
          <div className="step">
            <FaListAlt className="icon-About" />
            <p>É definida a ordem de prioridade do ticket.</p>
          </div>
          <div className="step">
            <FaUserCog className="icon-About" />
            <p>Time de engenharia resolve o problema.</p>
          </div>
          <div className="step">
            <FaRegClipboard className="icon-About" />
            <p>Status é atualizado e todos são notificados.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
