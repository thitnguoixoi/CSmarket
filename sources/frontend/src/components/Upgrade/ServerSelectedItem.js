import React from "react";
import ServerItem from './ServerItem.js';

function SelectedServerItem({ selectedItem }) {
    return (
        <>
            <div className={`selected-item ${selectedItem ? 'selected' : ''}`}>
                {selectedItem ? (
                    <ServerItem data={selectedItem} />
                ) : (
                    <p>No image selected!</p>
                )}
            </div>
        </>

    );
}

export default SelectedServerItem;