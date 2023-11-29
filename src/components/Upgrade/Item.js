import React from "react";

function Item({itemData}) {
    return (
        <div className="item">
            <img src={itemData.context} alt="" />
            <div className="item-details">
                <p>{itemData.name}</p>
                <p>{itemData.price}</p>
            </div>
        </div>
    );
}

export default Item;
