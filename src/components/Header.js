import './styles/Header.css';

function Header() {
    return (
      <>
        <div className="header">
        <a href="home"><img src={require('../assets/logo/csmarket.png')}/></a> 
        <div className="topnav">
              <a href="Opencase">Opencase</a>
              <a href="Upgrade">Upgrade</a>
        </div>
        <a href="#" className="btn">Login via steam</a>
      </div>
      </>
      
    );
}

export default Header;