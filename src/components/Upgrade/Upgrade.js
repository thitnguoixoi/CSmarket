import React, { useState } from "react";
import './styles/Upgrade.css';
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
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier2", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier3", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier4", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier5", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        // Add more items if needed
    ];

    const serverItems = [
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier2", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier3", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier4", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier5", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10,type:"FT",float: 0.0009 },
        // Add more items if needed
    ];

    return (
        <div className="inventory-container">
            <div className="selected-items">
                <div className="User-select">
                    <h2>User Selected Item</h2>
                    <SelectedItem selectedItem={selectedUserItem} fixedSize />
                </div>

                <UpgradeSection
                    upgradeSuccessRate={upgradeSuccessRate}
                />

                <div className="Server-select">
                    <h2>Server Selected Item</h2>
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
