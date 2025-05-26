import "./PageHeader.css";

const Header = ({ menuItems }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="logo do TicketFlow" />
        <h1>TicketFlow</h1>
      </div>
      <div className="menu">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
