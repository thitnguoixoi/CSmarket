import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import logo from '../assets/logo/csmarket.png';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="CSMarket Logo" />
      </Link>
      <div className="topnav">
        <a href="Opencase">Opencase</a>
        <a href="Upgrade">Upgrade</a>
      </div>
      <a href="#" className="btn">Login via steam</a>
    </div>
  );
}

export default Header;