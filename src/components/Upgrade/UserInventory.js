// UserInventory.js

import React from "react";
import Item from './Item.js';

class UserInventory extends React.Component {
    render() {
        const { userItems, selectedUserItem, handleUserItemClick } = this.props;

        return (
            <div className="user-inventory">
                <h2>User Inventory</h2>
                <ul>
                    {userItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleUserItemClick(item)}
                            className={selectedUserItem === item ? "selected" : ""}
                        >
                            <Item itemData={item} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserInventory;
