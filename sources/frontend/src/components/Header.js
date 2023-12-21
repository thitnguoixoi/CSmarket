import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { admin } from '../assets/admin';

function Header() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);


  const handleLogin = async () => {
    const popupWindow = window.open(
      "http://localhost:8080/api/v1/auth/steam",
      "_blank",
      "width=800, height=600",
    );
    if (window.focus) popupWindow.focus();
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:8080") return;
      const tokenData = JSON.parse(event.data);
      sessionStorage.setItem("steamprofile", JSON.stringify(tokenData));
      setUser(tokenData);
      setLoggedIn(true);
      for (let i = 0; i < admin.length; i++) {
        if (tokenData.steamid === admin[i].steamid) {
          setUserIsAdmin(true);
          break;
        }
      }
    });
  }, [setUser, setLoggedIn, setUserIsAdmin]);
  const handleLogout = () => {
    setLoggedIn(false);
    setUserIsAdmin(false);
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
              src={user.avatarmedium}
              alt="User Avatar"
            />
          </Link>

          {showDropdown && (
            <ul className="dropdown-menu">
              <Link to="/panel"><li>User Profile</li></Link>
              {/* Assuming userIsAdmin is a state/prop indicating admin status */}
              {userIsAdmin && <Link to="/AdminPanel"><li>AdminPanel</li></Link>}
              <Link to="/"><li onClick={handleLogout}>Logout</li></Link>

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
