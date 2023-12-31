import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/popup.css'

function Popup({ trigger, children, setTrigger }) {
    const navigate = useNavigate();

    const handleViewInventory = () => {
        // Navigate to /profile
        navigate("/profile");
    };

    return trigger ? (
        <div className="popup">
            <div className="popup-inner">
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
