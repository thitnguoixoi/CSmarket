import React, { useEffect, useState } from 'react';
import axios from "../../assets/setup/axios"
import './styles/CaseOpened.css';
import Popup from "./popup";

function CaseOpened(id) {
    const [caseData, setCaseData] = useState([]);
    const [skinData, setSkinData] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const handlePopup = () => {
        setButtonPopup(false);
    }
    useEffect(() => {
        axios.get(`/api/v1/cases/id`, { params: { caseid: id.id } })
            .then(response => {
                setCaseData(response.data.DT.acase);
                setSkinData(response.data.DT.skins);
            })
            .catch(error => {
                console.error('Error checking user group:', error);
            });
    }, []);
    // console.log(caseData);
    // console.log(skinData);
    return (
        <div className="Case_Opened">
            <div className="opencase">
                <h3>{caseData.Name}</h3>
                <img src={caseData.Image} alt="Case" />
                <button className="opencase-btn" onClick={() => setButtonPopup(true)}>Open {caseData.Price}$ </button>
                <Popup trigger={buttonPopup} setTrigger={handlePopup}>
                    <h3>Congratulation</h3>
                    <h4>You got</h4>
                    {/* <div className={`tierskin tier${caseData.skins[0].tier}`}>
                        <img src={caseData.skins[0].imgUrl} alt="skin" />
                        <h4>{caseData.skins[0].name}</h4>
                    </div> */}
                </Popup>
            </div>

            <div className="image-container">
                {skinData.map((item) => {
                    return (
                        <div className={`tierskin tier${item.Skin.Tier}`} >
                            <img src={item.Skin.Image} alt="skin" />
                            <h4>{item.Skin.Name}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default CaseOpened;
