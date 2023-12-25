import React from "react";
import Item from './Item.js';

function SelectedItem({ selectedItem }) {
    return (
        <div className={`selected-item ${selectedItem ? 'selected' : ''}`}>
            {selectedItem ? (
                <Item itemData={selectedItem} />
            ) : (
                <p>No image selected!</p>
            )}
        </div>
    );
}

export default SelectedItem;