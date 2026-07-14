import logo from '../images/logo.png';

function Header() {
    return (
      <header className="header">
        <img
          src={logo}
          alt="University of Nottingham logo"
          className="logo"
        />
  
        <h2>Confocal Dye Assistant</h2>
      </header>
    );
  }
  
  export default Header;