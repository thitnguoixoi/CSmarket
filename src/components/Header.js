import './styles/Header.css';
import { Link } from 'react-router-dom';
function Header() {
    return (
      <>
        <div className="header">
        <Link to="/home"><img src={require('../assets/logo/csmarket.png')} alt="logo"/></Link> 
        <div className="topnav">
              <Link to="/Opencase">Opencase</Link>
              <Link to="/Upgrade">Upgrade</Link>
        </div>
        <Link to="#" className="btn">Login via steam</Link>
      </div>
      </>
      
    );
}

export default Header;