import React from 'react';

import './styles/OpencasePage.css';
import Case from './Case';
import { caseData } from '../assets/caseData';



class Opencase extends React.Component {
    render() {
        return (
            <>
                <div className='case' id='free'>
                    <h1 className="title">Free case</h1>
                    <div className="case_img">
                        <Case caseData={caseData[0]} />
                        <Case caseData={caseData[1]} />
                    </div>
                </div>

                <div className='case' id='common'>
                    <h1 className="title">Common case</h1>
                    <div className="case_img">
                        <Case caseData={caseData[2]} />
                        <Case caseData={caseData[3]} />
                        <Case caseData={caseData[4]} />
                    </div>
                </div>

                <div className='case' id='epic'>
                    <h1 className="title">Epic case</h1>
                    <div className="case_img">
                        <Case caseData={caseData[5]} />
                        <Case caseData={caseData[6]} />
                        <Case caseData={caseData[7]} />
                    </div>
                </div>

                <div className='case' id='vip'>
                    <h1 className="title">Vip case</h1>
                    <div className="case_img">
                        <Case caseData={caseData[8]} />
                    </div>
                </div>
            </>
        );
    }
}

export default Opencase;