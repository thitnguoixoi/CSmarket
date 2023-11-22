// CaseOpened.js
import React from 'react';
import './styles/Case_opened.css';

import freecase1 from '../assets/case/freecase1.png';

import tier1 from '../assets/frame/tier1.png';
import tier2 from '../assets/frame/tier2.png';
import tier3 from '../assets/frame/tier3.png';
import tier4 from '../assets/frame/tier4.png';
import tier5 from '../assets/frame/tier5.png';

import tier1_1 from '../assets/skin/Freecase1/tier1/tier1_1.png';
import tier1_2 from '../assets/skin/Freecase1/tier1/tier1_2.png';

import tier2_1 from '../assets/skin/Freecase1/tier2/tier2_1.png';
import tier2_2 from '../assets/skin/Freecase1/tier2/tier2_2.png';
import tier2_3 from '../assets/skin/Freecase1/tier2/tier2_3.png';

import tier3_1 from '../assets/skin/Freecase1/tier3/tier3_1.png';
import tier3_2 from '../assets/skin/Freecase1/tier3/tier3_2.png';
import tier3_3 from '../assets/skin/Freecase1/tier3/tier3_3.png';

import tier4_1 from '../assets/skin/Freecase1/tier4/tier4_1.png';
import tier4_2 from '../assets/skin/Freecase1/tier4/tier4_2.png';

import tier5_1 from '../assets/skin/Freecase1/tier5/tier5_1.png';
import tier5_2 from '../assets/skin/Freecase1/tier5/tier5_2.png';

function Case_Opened(){
    return(
        <>
            <div className="opencase" id='free1'>
                <h1>Freecase1</h1>
                <img src={freecase1} alt="" />
                <button>Open $0.00</button>
            </div>

            <div className="case_item">
                <div className="image-container">
                    <img src={tier1_1} className="tier1"/>
                    <img src={tier1_2} className="tier1"/>
                    
                    <img src={tier2_1} className="tier2"/>
                    <img src={tier2_2} className="tier2"/>
                    <img src={tier2_3} className="tier2"/>
                    
                    <img src={tier3_1} className="tier3"/>
                    <img src={tier3_2} className="tier3"/>
                    <img src={tier3_3} className="tier3"/>

                    <img src={tier4_1} className="tier4"/>
                    <img src={tier4_2} className="tier4"/>

                    <img src={tier5_1} className="tier5"/>
                    <img src={tier5_2} className="tier5"/>
                </div>
            </div>
        </>
    );
}

export default Case_Opened;