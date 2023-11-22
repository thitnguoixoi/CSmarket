import React from 'react';

const Case = ({ image, price ,href}) => {
  return (
    <a href="#">
      <div className="img_box">
        <img src={image} href={href} />
      </div>
      <h3>{price}</h3>
    </a>
  );
};

export default Case;