import React from "react";
import './styles/CaseOpened.css';

function CaseOpened({ caseData }) {
    return (
        <div className="Case_Opened">
            <div className="opencase">
                <h3>{caseData.name}</h3>
                <img src={caseData.imgUrl} alt="Case" />
                <button>Open {caseData.price}</button>
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
