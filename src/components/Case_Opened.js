// CaseOpened.js
import React from 'react';
import './styles/Case_opened.css';

function Case_Opened(){
    return(
        <>
            <div className="opencase" id='free1'>
                <h1>Freecase1</h1>
                <img src={require('../assets/case/freecase1.png')} alt="" />
                <button>Open $0.00</button>
            </div>

            <div className="case_item">
                <div className="image-container">
                    <img src={require('../assets/skin/Freecase1/tier1/Fc1-1_1.png')} className="tier1" />
                    <img src={require('../assets/skin/Freecase1/tier1/Fc1-1_2.png')} className="tier1" />
                    
                    <img src={require('../assets/skin/Freecase1/tier2/Fc1-2_1.png')} className="tier2" />
                    <img src={require('../assets/skin/Freecase1/tier2/Fc1-2_2.png')} className="tier2" />
                    <img src={require('../assets/skin/Freecase1/tier2/Fc1-2_3.png')} className="tier2" />
                    
                    <img src={require('../assets/skin/Freecase1/tier3/Fc1-3_1.png')} className="tier3" />
                    <img src={require('../assets/skin/Freecase1/tier3/Fc1-3_2.png')} className="tier3" />
                    <img src={require('../assets/skin/Freecase1/tier3/Fc1-3_3.png')} className="tier3" />

                    <img src={require('../assets/skin/Freecase1/tier4/Fc1-4_1.png')} className="tier4" />
                    <img src={require('../assets/skin/Freecase1/tier4/Fc1-4_2.png')} className="tier4" />

                    <img src={require('../assets/skin/Freecase1/tier5/Fc1-5_1.png')} className="tier5" />
                    <img src={require('../assets/skin/Freecase1/tier5/Fc1-5_2.png')} className="tier5" />
                </div>
            </div>
        </>
    );
}

export default Case_Opened;