// SelectedItem.js

import React from "react";
import Item from './Item.js';

class SelectedItem extends React.Component {
    render() {
        const { selectedItem, fixedSize } = this.props;

        return (
            <div className={`selected-item ${selectedItem ? 'selected' : ''}`}>
                <h3>Selected Item</h3>
                {selectedItem ? (
                    <Item itemData={selectedItem} fixedSize={fixedSize} />
                ) : (
                    <img src="path_to_default_image.jpg" alt="No item selected" width="200" height="200" />
                )}
            </div>
        );
    }
}

export default SelectedItem;
