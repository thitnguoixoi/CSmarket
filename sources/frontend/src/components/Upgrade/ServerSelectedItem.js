import React from "react";
import ServerItem from './ServerItem.js';

function SelectedServerItem({ selectedItem }) {
    return (
        <>
            <div className={`selected-item ${selectedItem ? 'selected' : ''}`}>
                {selectedItem ? (
                    <ServerItem data={selectedItem} />
                ) : (
                    <img src="path_to_default_image.jpg" alt="No Item selected" />
                )}
            </div>
        </>

    );
}

export default SelectedServerItem;