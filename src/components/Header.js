import './styles/Header.css';
import { Link } from 'react-router-dom';
function Header() {
    return (
      <>
        <div className="header">
        <Link to="/home"><img src={require('../assets/logo/csmarket.png')} alt="logo"/></Link> 
        <div className="topnav">
              <Link to="/opencase">Opencase</Link>
              <Link to="/upgrade">Upgrade</Link>
        </div>
        <Link to="#" className="btn">Login via steam</Link>
      </div>
      </>
      
    );
}

export default Header;