import React from 'react';
import './styles/OpencasePage.css';
import Case from './Case';
import { caseData } from '../assets/caseData';

const caseCategories = [
    { id: 'free', title: 'Free case', items: [0, 1] },
    { id: 'common', title: 'Common case', items: [2, 3, 4] },
    { id: 'epic', title: 'Epic case', items: [5, 6, 7] },
    { id: 'vip', title: 'Vip case', items: [8] },
];

function Opencase() {
    return (
        <div className='openCasePage'>
            {caseCategories.map((item) => (
                <div className='case' id={item.id} key={item.id}>
                    <h1 className="title">{item.title}</h1>
                    <div className="case_img">
                        {item.items.map((itemIndex) => (
                            <Case key={itemIndex} caseData={caseData[itemIndex]} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Opencase;
