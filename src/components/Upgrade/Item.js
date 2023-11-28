import React, { Component } from "react";

class Item extends Component {
    render() {
        const { itemData, fixedSize } = this.props;

        return (
            <div className={`item ${fixedSize ? 'fixed-size' : ''}`}>
                <img src={itemData.context} alt={itemData.name} />
                <div className="item-details">
                    <p>{itemData.updater}</p>
                    <p>Tier: {itemData.props}</p>
                    <p>Price: {itemData.price}</p>
                </div>
            </div>
        );
    }
}

export default Item;
