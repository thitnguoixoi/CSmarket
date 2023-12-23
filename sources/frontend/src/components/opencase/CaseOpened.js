import React, { useEffect, useState } from 'react';
import axios from "../../assets/setup/axios"
import './styles/CaseOpened.css';
import Popup from "./popup";

function CaseOpened({ caseData }) {
    const [buttonPopup, setButtonPopup] = useState(false);
    const handlePopup = () => {
        setButtonPopup(false);
    }

    return (
        <div className="Case_Opened">
            <div className="opencase">
                <h3>{caseData.name}</h3>
                <img src={caseData.imgUrl} alt="Case" />
                <button className="opencase-btn" onClick={() => setButtonPopup(true)}>Open {caseData.price}</button>
                <Popup trigger={buttonPopup} setTrigger={handlePopup}>
                    <h3>Congratulation</h3>
                    <h4>You got</h4>
                    <div className={`tierskin tier${caseData.skins[0].tier}`}>
                        <img src={caseData.skins[0].imgUrl} alt="skin" />
                        <h4>{caseData.skins[0].name}</h4>
                    </div>
                </Popup>
            </div>

            <div className="image-container">
                {caseData.skins.map((item) => {
                    return (
                        <div className={`tierskin tier${item.tier}`} >
                            <img src={item.imgUrl} alt="skin" />
                            <h4>{item.name}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default CaseOpened;
