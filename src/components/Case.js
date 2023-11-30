import React from 'react';
import { Link } from 'react-router-dom';

function Case({ caseData }) {
  return (
    <div className="case_box">
      <Link to={caseData.to}>
        <div className='img_box' id={caseData.name}>
          <img src={caseData.imgUrl} alt="" />
        </div>
      </Link>
      <h3>{caseData.price}</h3>
    </div>
  );
}

export default Case;
