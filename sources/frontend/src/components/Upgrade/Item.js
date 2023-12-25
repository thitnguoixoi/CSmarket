import React from "react";
import "./styles/Item.css";

function Item({ itemData }) {
    return (
        <div className={`item tier${itemData.Skin?.Tier}`}>
            <img src={itemData.Skin?.Image} alt="" />
            <div className="item-details">
                <div>
                    <span id="name">{itemData.Skin?.Name}</span>    
                </div>
                <div className="float-price">
                    <div>
                        <span id="float">{itemData.Skin?.Float}</span>
                    </div>
                    <div>
                        <span id="price">{itemData.Skin?.Price}$</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
