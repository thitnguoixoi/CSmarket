import './styles/Header.css';
import {Route, Link, Routes } from 'react-router-dom';
import FC1 from '../components/cases/FC1/FC1';

function Header() {
    return (
      <>
        <div className="header">
            <Link to="/home"><img src={require('../assets/logo/csmarket.png')}/></Link> 
            <div className="topnav">
              <Link to="/Opencase">Opencase</Link>
              <Link to="/Upgrade">Upgrade</Link>
            </div>
            <Link to="/login" className="btn">Login via steam</Link>

            <Routes>
              <Route path='/Opencase' exact component={FC1}></Route>
            </Routes>
      </div>
      </>
      
    );
}

export default Header;