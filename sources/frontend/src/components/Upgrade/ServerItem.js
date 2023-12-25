import React from "react";
import "./styles/Item.css";

function ServerItem({ data }) {
    return (
        <>
            <div className={`item tier${data.Tier}`}>
                <img src={data.Image} alt="" />
                <div className="item-details">
                    <div>
                        <span id="name">{data.Name}</span>
                    </div>
                    <div className="float-price">
                        <div>
                            <span id="float">{data.Float}</span>
                        </div>
                        <div>
                            <span id="price">{data.Price}$</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServerItem;
