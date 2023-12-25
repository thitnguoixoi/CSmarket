import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../assets/setup/axios"
import { Link } from 'react-router-dom';
import './styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [user, setUser] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userIsMod, setUserIsMod] = useState(false);
  const navigate = useNavigate();

  const handleRefreshWallet = () => {
    // Fetch the updated wallet value
    axios.get(`/api/v1/users/steamid`)
      .then(response => {
        setUser(prevUser => ({
          ...prevUser,
          Wallet: response.data.DT.Wallet
        }));
      })
      .catch(error => {
        console.error('Error refreshing wallet', error);
      });
  };
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    if (checkCookieExists("csmarket")) {
      handleGetProfileAgain()
    } else {
      handleLogout()
    }
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  useEffect(() => {
    // Set up an interval to refresh the wallet every 1000 milliseconds (1 second)
    const intervalId = setInterval(handleRefreshWallet, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
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
    const steamData = JSON.parse(event.data);
    sessionStorage.setItem("steamprofile", JSON.stringify(steamData));
    //jwt
    axios.get(`/api/v1/jwt/steamid`, { params: { steamid: steamData.steamid } })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error('Error get jwt:', error);
      });
    handleGetProfile()
  };

  const checkCookieExists = (cookieName) => {
    const cookies = document.cookie.split(';');
    return cookies.some(cookie => cookie.trim().startsWith(`${cookieName}=`));
  };

  const handleGetProfile = () => {
    axios.get(`/api/v1/users/steamid`)
      .then(response => {
        setLoggedIn(true);
        setUser(response.data.DT);
        if (response.data.DT.GroupID === 3) {
          setUserIsMod(true);
        } else if (response.data.DT.GroupID === 2) {
          setUserIsMod(true);
        }
      })
      .catch(error => {
        handleGetProfileAgain()
      });
  }


  const handleGetProfileAgain = () => {
    axios.get(`/api/v1/users/steamid`)
      .then(response => {
        setLoggedIn(true);
        setUser(response.data.DT);
        if (response.data.DT.GroupID === 3) {
          setUserIsMod(true);
        } else if (response.data.DT.GroupID === 2) {
          setUserIsMod(true);
        }
      })
      .catch(error => {
        console.error('Error get user profile', error);
        if (error.response.data.EM === 'User is not authenticate') {
          handleLogout()
        }
      });
  }
  const handleLogout = () => {
    axios.get(`/api/v1/users/logout`)
      .then(response => {
      })
      .catch(error => {
        console.error('Error user log out', error);
      });
    navigate('/');
    setLoggedIn(false);
    setUserIsMod(false);
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
            <h4>{user.Wallet}$</h4>
          </div>

          <Link to="/profile">
            <img
              className="avatar"
              src={user.Avatarmedium}
              alt="User Avatar"
            />
          </Link>

          {showDropdown && (
            <ul className="dropdown-menu">
              <Link to="/profile"><li>User Profile</li></Link>
              {/* Assuming userIsMod is a state/prop indicating Mod status */}
              {userIsMod && <Link to="/admin"><li>Admin Panel</li></Link>}
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
