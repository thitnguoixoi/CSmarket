import React from "react";
import Item from './Item.js';

function SelectedItem({ selectedItem, fixedSize }) {
    return (
        <div className={`selected-item ${selectedItem ? 'selected' : ''}`}>
            {selectedItem ? (
                <Item itemData={selectedItem} fixedSize={fixedSize} />
            ) : (
                <img src="path_to_default_image.jpg" alt="No item selected" width="200" height="200" />
            )}
        </div>
    );
}

export default SelectedItem;