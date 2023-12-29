import React, { useEffect, useState } from 'react';
import './styles/OpencasePage.css';
import Case from './Case';
import axios from "../../assets/setup/axios"

function Opencase() {
    const [caseCategories, setCaseCategories] = useState([]);

    useEffect(() => {
        // Send Axios request to check user's group ID
        axios.get(`/api/v1/cases`)
            .then(response => {
                setCaseCategories(response.data.DT);
            })
            .catch(error => {
                console.error('Error checking user group:', error);
            });
    }, []);

    return (
        <div className='openCasePage'>
            {Array.from(new Set(caseCategories.map((category) => category?.Name))).map((uniqueName, index) => {
                // Filter the categories based on the uniqueName
                const filteredCategories = caseCategories.filter((category) => category?.Name === uniqueName);
                return (
                    <div key={index} className={`${uniqueName}`}>
                        <h1>{uniqueName}</h1>
                        <div className='case-container'>
                            {filteredCategories.map((category, subIndex) => (
                                <div key={subIndex}>
                                    <Case caseData={category?.Cases[0]} />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Opencase;
