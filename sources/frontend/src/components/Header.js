import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const handleLogin = (id) => {
    setLoggedIn(true);
    setUserIsAdmin(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setShowDropdown(false); // Close the dropdown when logging out
  };

  const handleAvatarHover = () => {
    // Open the dropdown when hovering over the avatar
    setShowDropdown(true);
  };

  const handleAvatarLeave = () => {
    // Close the dropdown when leaving the avatar area
    setShowDropdown(false);
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={require('../assets/logo/csmarket.png')} alt="CSMarket Logo" />
      </Link>
      <div className="topnav">
        <Link to="/opencase">Opencase</Link>
        <Link to="/upgrade">Upgrade</Link>
      </div>
      {isLoggedIn ? (
        <div
          className="avatar-container"
          onMouseEnter={handleAvatarHover}
          onMouseLeave={handleAvatarLeave}
        >
          <div className='user-wallet'>
            <FontAwesomeIcon icon={faWallet} />
            <h4>0.00$</h4>
          </div>

          <Link to="/panel">
            <img
              className="avatar"
              src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              alt="User Avatar"
            />
          </Link>

          {showDropdown && (
            <ul className="dropdown-menu">
              <Link to="/panel"><li>User Profile</li></Link>
              {/* Assuming userIsAdmin is a state/prop indicating admin status */}
              {userIsAdmin && <Link to="/AdminPanel"><li>AdminPanel</li></Link>}
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      ) : (
        <button onClick={handleLogin}>Login via Steam</button>
      )}
    </div>
  );
}

export default Header;
