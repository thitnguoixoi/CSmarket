import React from 'react';
import { Link } from 'react-router-dom';

const Case = ({ name, image, price }) => {
  return (
    <div className="case_box">
      <Link to="/caseOpened">
        <div className='img_box' id={name}>
          <img src={image} alt="" />
        </div>
      </Link>

      <h3>{price}</h3>
    </div>
  );
};

export default Case;