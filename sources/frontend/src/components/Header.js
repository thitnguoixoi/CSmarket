import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import logo from '../assets/logo/csmarket.png';

function Header() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Add your logout logic here
    setLoggedIn(false);
  };

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="CSMarket Logo" />
      </Link>
      <div className="topnav">
        <a href="Opencase">Opencase</a>
        <a href="Upgrade">Upgrade</a>
      </div>
      {isLoggedIn ? (
        <div className="avatar-container" onClick={handleAvatarClick}>
          <img
            className="avatar"
            src="path/to/avatar.jpg" // Add the path to the user's avatar
            alt="User Avatar"
          />
          {showDropdown && (
            <ul className="dropdown-menu">
              <li>Option 1</li>
              <li>Option 2</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      ) : (
        <button onClick={handleLogin}>Login via steam</button>
      )}
    </div>
  );
}

export default Header;
