import React from "react";
import './styles/popup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Popup({ trigger, children, setTrigger }) {
    return (trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => setTrigger(false)}>
                    <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff", }} />
                </button>
                {children}

                <div className="popup-nav-btn">
                    <button>View in inventory</button>
                    <button onClick={() => setTrigger(false)}>Open more</button>
                </div>
            </div>
        </div>
    ) : "";
}

export default Popup;