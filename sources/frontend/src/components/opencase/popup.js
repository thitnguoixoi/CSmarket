import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/popup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';  // Correct icon name

function Popup({ trigger, children, setTrigger }) {
    const navigate = useNavigate();

    const handleViewInventory = () => {
        // Navigate to /profile or your desired route
        navigate("/profile");
    };

    return trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => setTrigger(false)}>
                    <FontAwesomeIcon icon={faTimes} style={{ color: "#ffffff" }} />
                </button>
                {children}

                <div className="popup-nav-btn">
                    <button onClick={handleViewInventory}>View in inventory</button>
                    <button onClick={() => setTrigger(false)}>Open more</button>
                </div>
            </div>
        </div>
    ) : null;
}

export default Popup;
