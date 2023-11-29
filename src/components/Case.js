import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const Case = ({ image, price , to}) => {
  return (
    <div className="case_box">
      <Link to="/opened_case">
        <div className='img_box'>
          <img src={image} alt=""/>
        </div>
      </Link>
      <h3>{price}</h3>
    </div>
  );
};

export default Case;