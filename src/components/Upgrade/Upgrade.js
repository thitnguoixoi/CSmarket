import React, { useState } from "react";
import './styles/Inventory.css';
import UpgradeSection from './UpgradeSection';
import SelectedItem from './SelectedItem';
import Item from "./Item";
import SkinData from "../../assets/SkinData"

function Inventory() {
    const [selectedUserItem, setSelectedUserItem] = useState(null);
    const [selectedServerItem, setSelectedServerItem] = useState(null);
    const [upgradeSuccessRate, setUpgradeSuccessRate] = useState(0);

    const handleUserItemClick = (item) => {
        if (selectedUserItem === item) {
            setSelectedUserItem(null);
        } else {
            setSelectedUserItem(item);
        }
    };

    const handleServerItemClick = (item) => {
        if (selectedServerItem === item) {
            setSelectedServerItem(null);
        } else {
            setSelectedServerItem(item);
        }
    };

    const userItems = [
        { tier: "Tier 1", context: SkinData.glockOxideBlaze.imgUrl, name: "Item 1", price: 10 },
        { tier: "Tier 2", context: "CC1-1_2.avif", name: "Item 2", price: 20 },
        { tier: "Tier 3", context: "CC1-1_3.avif", name: "Item 3", price: 30 },
        { tier: "Tier 1", context: "CC1-1_1.avif", name: "Item 1", price: 10 },
        { tier: "Tier 2", context: "CC1-1_2.avif", name: "Item 2", price: 20 },
        // Add more items if needed
    ];

    const serverItems = [
        { tier: "Tier 1", context: "CC1-1_1.avif", name: "Server Item 1", price: 15 },
        { tier: "Tier 2", context: "CC1-1_2.avif", name: "Server Item 2", price: 25 },
        { tier: "Tier 3", context: "CC1-1_3.avif", name: "Server Item 3", price: 35 },
        // Add more items if needed
    ];

    return (
        <div className="inventory-container">
            <div className="selected-items">
                <div className="User-select">
                    <h3>Selected Item</h3>
                    <SelectedItem selectedItem={selectedUserItem} fixedSize />
                </div>

                <UpgradeSection
                    upgradeSuccessRate={upgradeSuccessRate}
                />

                <div className="Server-select">
                    <h3>Selected Item</h3>
                    <SelectedItem selectedItem={selectedServerItem} fixedSize />
                </div>
            </div>

            <div className="inventory">
                <div className="user-inventory">
                    <h2>User Inventory</h2>
                    <div className="user">
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
                </div>

                <div className="server-inventory">
                    <h2>Server Inventory</h2>
                    <div className="server">
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
                </div>
            </div>
        </div>
    );
}

export default Inventory;
