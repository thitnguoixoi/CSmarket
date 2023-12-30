import React, { useEffect, useState } from 'react';
import axios from "../../assets/setup/axios"
import './styles/CaseOpened.css';
import Popup from "./popup";

function CaseOpened(id) {
    //data
    const [caseData, setCaseData] = useState([]);
    const [skinData, setSkinData] = useState([]);
    const [gachaData, setGachaData] = useState([]);
    //show popup
    const [buttonPopup, setButtonPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const handlePopup = () => {
        setButtonPopup(false);
    }
    const randomSkin = () => {
        setButtonPopup(true);
        //api send request open from user with id of case
        axios.get(`/api/v1/users/cases/open`, { params: { caseid: id.id } })
            .then(response => {
                //if open success set data for popup
                if (response.data.EM === 'Case opened') setShowPopup(true);
                setGachaData(response.data.DT.Skin);
            })
            .catch(error => {
                //if user haven't login ,  alert them
                setShowPopup(false);
                alert('please login');
            })
    }
    useEffect(() => {
        //api refesh data
        axios.get(`/api/v1/cases/skins`, { params: { caseid: id.id } })
            .then(response => {
                setCaseData(response.data.DT.acase);
                setSkinData(response.data.DT.skins);
            })
            .catch(error => {
                console.error('Error checking user group:', error);
            });
    }, []);

    return (
        <div className="Case_Opened">
            <div className="opencase">
                <h3>{caseData.Name}</h3>
                <img src={caseData.Image} alt="Case" />
                <button className="opencase-btn" onClick={() => randomSkin()}>Open {caseData.Price}$ </button>
                {showPopup && (
                    <Popup trigger={buttonPopup} setTrigger={handlePopup}>
                        <h3>Congratulation</h3>
                        <h4>You got</h4>
                        <div className="image-container">
                            <div className={`tierskin tier${gachaData?.Tier}`}>
                                <img src={gachaData?.Image} alt="skin" />
                                <h4>{gachaData?.Name}</h4>
                            </div>
                        </div>
                    </Popup>
                )}

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
