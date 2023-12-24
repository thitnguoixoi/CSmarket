import React from "react";
import Item from './Item.js';

function SelectedItem({ selectedItem }) {
    return (
        <div className={`selected-item ${selectedItem ? 'selected' : ''}`}>
            {selectedItem ? (
                <Item itemData={selectedItem} />
            ) : (
                <img src="path_to_default_image.jpg" alt="No item selected" />
            )}
        </div>
    );
}

export default SelectedItem;