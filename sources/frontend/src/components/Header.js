import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

function Header() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const handleLogin = () => {
    // In a real application, you might want to implement proper authentication logic here
    // For the sake of the example, we'll assume successful login
    setLoggedIn(true);
    setUserIsAdmin(true);
  };

  const handleLogout = () => {
    // In a real application, you might want to implement proper logout logic here
    // For the sake of the example, we'll assume successful logout
    setLoggedIn(false);
    setShowDropdown(false); // Close the dropdown when logging out
  };

  const handleAvatarClick = () => {
    // Toggle the dropdown when clicking on the avatar
    setShowDropdown(!showDropdown);
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
          onClick={handleAvatarClick}
          onMouseEnter={handleAvatarHover}
          onMouseLeave={handleAvatarLeave}
        >
          <img
            className="avatar"
            src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" // Replace with the path to the user's avatar
            alt="User Avatar"
          />
          {showDropdown && (
            <ul className="dropdown-menu">
              <li>User Profile</li>
              {/* Assuming userIsAdmin is a state/prop indicating admin status */}
              {userIsAdmin && <li>Admin Panel</li>}
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
