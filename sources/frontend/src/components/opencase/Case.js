import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Case.css';

function Case({ caseData }) {
  const originalString = caseData.Name;
  const convertedString = originalString.replace(/\s+/g, '').toLowerCase();

  return (
    <div className="case_box">
      <Link to={`/${convertedString}`}>
        <div className='img_box' id={caseData.Name}>
          <img src={caseData.Image} alt="" />
        </div>
      </Link>
      <h3>{caseData.Price}</h3>
    </div>
  );
}

export default Case;
