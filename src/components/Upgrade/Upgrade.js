import React, { useEffect, useState } from "react";
import './styles/Upgrade.css';
import SelectedItem from './SelectedItem';
import Item from "./Item";
import SkinData from "../../assets/SkinData";

function Inventory() {
    // State for selected user and server items
    const [selectedUserItem, setSelectedUserItem] = useState(null);
    const [selectedServerItem, setSelectedServerItem] = useState(null);
    const [rateUser, setRateUser] = useState(0.0);
    const [rateServer, setRateServer] = useState(0.0);
    // State for upgrade success rate
    const [upgradeSuccessRate, setUpgradeSuccessRate] = useState(0.0);
    console.log(rateServer, rateUser, upgradeSuccessRate);
    useEffect(() => {
        console.log(selectedUserItem?.tier ||null, selectedServerItem?.tier||null);
        rateUpgrade();
    });
    // Handler for user item click
    const handleUserItemClick = (item) => {
        setSelectedUserItem(item);
        setRateUser(item.float);
    };

    // Handler for server item click
    const handleServerItemClick = (item) => {
        setSelectedServerItem(item);
        setRateServer(item.float);
    };

    // Function to calculate upgrade success rate
    const rateUpgrade = () => {
        // Access properties of selected items safely using optional chaining
        const userTier = selectedUserItem?.tier || "tier1";
        const serverTier = selectedServerItem?.tier || "tier1";
        console.log(userTier, serverTier);
        console.log(selectedServerItem, selectedUserItem);
        // Example calculation: Combine float and tier to determine success rate
        let successRate = 0;

        // Adjust the calculation logic based on your requirements
        if (userTier === serverTier && rateServer > 0.0 && rateUser > 0.0) {
            // The higher the float difference, the higher the success rate
            successRate = 100 - Math.abs(rateUser - rateServer) * 100;
        } else if (userTier !== serverTier && rateServer > 0 && rateUser > 0) {
            // If tiers are different, lower success rate
            successRate = 50 - Math.abs(rateUser - rateServer) * 50;
        }

        // Update the state with the calculated success rate
        setUpgradeSuccessRate(successRate);
    };

    // Sample data for user and server items
    const userItems = [
        // ... your userItems data
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier2", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier3", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier4", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier5", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
    ];

    const serverItems = [
        // ... your serverItems data
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier2", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier3", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier4", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier5", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
    ];

    return (
        <div className="inventory-container">
            <div className="selected-items">
                {/* User Selected Item */}
                <div className="User-select">
                    <h2>User Selected Item</h2>
                    <SelectedItem selectedItem={selectedUserItem} fixedSize />
                </div>

                {/* Upgrade Section */}
                <div className="upgrade-section">
                    <h2>Upgrade your item</h2>
                    <button>Nâng cấp</button>
                    <p>Rating: {upgradeSuccessRate.toFixed(2)}%</p>
                </div>

                {/* Server Selected Item */}
                <div className="Server-select">
                    <h2>Server Selected Item</h2>
                    <SelectedItem selectedItem={selectedServerItem} fixedSize />
                </div>
            </div>

            {/* User and Server Inventories */}
            <div className="inventory">
                {/* User Inventory */}
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

                {/* Server Inventory */}
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
