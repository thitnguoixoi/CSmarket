// ServerInventory.js

import React from "react";
import Item from './Item.js';

class ServerInventory extends React.Component {
    render() {
        const { serverItems, selectedServerItem, handleServerItemClick } = this.props;

        return (
            <div className="server-inventory">
                <h2>Server Inventory</h2>
                <ul>
                    {serverItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleServerItemClick(item)}
                            className={selectedServerItem === item ? "selected" : ""}
                        >
                            <Item itemData={item} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ServerInventory;
