import React, { useEffect, useState } from 'react';
import axios from "../../assets/setup/axios"
import './styles/CaseOpened.css';
import Popup from "./popup";

function CaseOpened(id) {
    const [data, setData] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const handlePopup = () => {
        setButtonPopup(false);
    }
    useEffect(() => {
        console.log(id.id);
        axios.get(`/api/v1/cases/id`, { params: { caseid: id.id } })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error checking user group:', error);
            });
    }, []);
    return (
        <div className="Case_Opened">
            <div className="opencase">
                <h3>Name</h3>
                <img src='' alt="Case" />
                <button className="opencase-btn" onClick={() => setButtonPopup(true)}>Open </button>
                {/* <Popup trigger={buttonPopup} setTrigger={handlePopup}>
                    <h3>Congratulation</h3>
                    <h4>You got</h4>
                    <div className={`tierskin tier${caseData.skins[0].tier}`}>
                        <img src={caseData.skins[0].imgUrl} alt="skin" />
                        <h4>{caseData.skins[0].name}</h4>
                    </div>
                </Popup> */}
            </div>

            {/* <div className="image-container">
                {caseData.skins.map((item) => {
                    return (
                        <div className={`tierskin tier${item.tier}`} >
                            <img src={item.imgUrl} alt="skin" />
                            <h4>{item.name}</h4>
                        </div>
                    )
                })}
            </div> */}
        </div>
    );
}

export default CaseOpened;
