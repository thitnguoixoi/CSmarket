import React from "react";

function Item({ itemData }) {
    return (
        <div className={`item tier${itemData.Skin.Tier}`}>
            <img src={itemData.Skin.Image} alt="" />
            <div className="item-details">
                <p>{itemData.Skin.Name}</p>    
                <p>{itemData.Skin.Float}</p>
                <p>{itemData.Skin.Price}$</p>
            </div>
        </div>
    );
}

export default Item;
