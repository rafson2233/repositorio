import Header from '../../components/header/PageHeader'
import "./Home.css"
import { useNavigate } from 'react-router-dom';

const menuHome = [
  { label: "LOGIN |", href: "/login" },
  { label: "REGISTER |", href: "/register" },
  { label: "ABOUT", href: "/about" },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header menuItems={menuHome} />
      <section className='home'>
        <div className='logoHome'>
          <img src="../logo.png" alt="logo" />
        </div>
        <div className="left">
          <div className='contentHome'>
            <h2>Bem-vindo ao TicketFlow </h2>
            <p>
              Nosso sistema foi desenvolvido para simplificar o rastreamento e a priorização
              de tickets reportados pelo time de QA. Aqui, você pode registrar os bugs identificados no Jira,
              acompanhar seu status e garantir que as correções sejam tratadas com eficiência.
            </p>
            <ul>
              <li>▪️QAs: Reportem tickets de maneira rápida e organizada.</li>
              <li>▪️Engenheiros: Acompanhem os tickets em um só lugar.</li>
              <li>▪️Administradores: Definam prioridades e otimizem o fluxo  de trabalho.</li>
            </ul>

            <div className='buttonHome'>
        <button onClick={() => navigate('/register')}>
          COMECE AGORA!
        </button>
      </div>
          </div>
    
        </div>

      </section>
    </>

  )
}

export default Home