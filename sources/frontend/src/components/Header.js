import React, { useState, useEffect } from 'react';
import axios from "../assets/setup/axios"
import { Link } from 'react-router-dom';
import './styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { admin } from '../assets/admin';

function Header() {
  const [user, setUser] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [wallet, setWallet] = useState(0);


  const handleLogin = async () => {
    const popupWindow = window.open(
      "http://localhost:8080/api/v1/auth/steam",
      "_blank",
      "width=800, height=600",
    );
    if (window.focus) popupWindow.focus();
  };

  // Empty dependency array ensures the effect runs only once
  const handleMessage = (event) => {
    if (event.origin !== "http://localhost:8080") return;
    const tokenData = JSON.parse(event.data);
    sessionStorage.setItem("steamprofile", JSON.stringify(tokenData));
    setUser(tokenData);
    setLoggedIn(true);
    //send api to set role for user
    axios.get(`/api/v1/user`, { params: { steamid: tokenData.steamid } })
      .then(response => {
        if (response.data.DT.GroupID === 3) {
          setUserIsAdmin(true);
        } else if (response.data.DT.GroupID === 2) {
          setUserIsAdmin(true);
        }
      })
      .catch(error => {
        console.error('Error checking user group:', error);
      });
  };
  const handleLogout = () => {
    sessionStorage.clear();
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

  const handleWallet = (id) => {
    axios.get('http://localhost:8080/api/v1/users')
      .then(response => {
        const userData = response.data.DT.find(item => item.SteamID === id);
        setWallet(userData.Wallet);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    // Cleanup the event listener when the component is unmounted
    handleWallet(user.steamid);
    return () => {
      window.removeEventListener("message", handleMessage);
    };

  });
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
            <h4>{wallet}$</h4>
          </div>

          <Link to="/profile">
            <img
              className="avatar"
              src={user.avatarmedium}
              alt="User Avatar"
            />
          </Link>

          {showDropdown && (
            <ul className="dropdown-menu">
              <Link to="/profile"><li>User Profile</li></Link>
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
