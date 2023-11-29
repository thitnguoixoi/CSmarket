import React from "react";
import { Link } from 'react-router-dom';
import './styles/CaseOpened.css';

function CaseOpened({ name, ImgPath, SkinPath }) {
    return (
        <div className="Case_Opened">
            <Link>
                <div>
                    <h3>{name}</h3>
                    <img src={ImgPath} alt="Case" />
                </div>

                <div>
                    
                </div>
            </Link>

        </div>
    );
}

export default CaseOpened;
