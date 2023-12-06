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
        console.log(selectedUserItem?.tier || null, selectedServerItem?.tier || null);
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

    const mapTierToNumber = (tier) => {
        switch (tier) {
            case 'tier2':
                return 2;
            case 'tier3':
                return 3;
            case 'tier4':
                return 4;
            case 'tier5':
                return 5;
            // Add more cases as needed
            default:
                return 1; // Default to 1 if tier is not recognized
        }
    };
    // Function to calculate upgrade success rate
    const rateUpgrade = () => {
        // Access properties of selected items safely using optional chaining
        const userTier = mapTierToNumber(selectedUserItem?.tier);
        const serverTier = mapTierToNumber(selectedServerItem?.tier);
        console.log(userTier, serverTier);
        console.log(selectedServerItem, selectedUserItem);

        // Set successRate to 100% if userTier is higher than serverTier
        if (userTier > serverTier) {
            setUpgradeSuccessRate(100);
            return;
        }

        // Example calculation: Combine float and tier to determine success rate
        let successRate = 0;

        // Define rating scales for different tier ranges
        const ratingScales = {
            //tier1
            '1-1': { baseRate: 80, rateMultiplier: 40 },
            '1-2': { baseRate: 50, rateMultiplier: 40 },
            '1-3': { baseRate: 35, rateMultiplier: 40 },
            '1-4': { baseRate: 15, rateMultiplier: 40 },
            '1-5': { baseRate: 5, rateMultiplier: 40 },
            //tier 2
            '2-2': { baseRate: 80, rateMultiplier: 40 },
            '2-3': { baseRate: 50, rateMultiplier: 40 },
            '2-4': { baseRate: 35, rateMultiplier: 40 },
            '2-5': { baseRate: 15, rateMultiplier: 40 },
            //tier3
            '3-3': { baseRate: 80, rateMultiplier: 40 },
            '3-4': { baseRate: 50, rateMultiplier: 40 },
            '3-5': { baseRate: 35, rateMultiplier: 40 },
            //tier4
            '4-4': { baseRate: 80, rateMultiplier: 40 },
            '4-5': { baseRate: 50, rateMultiplier: 40 },
            //tier5
            '5-5': { baseRate: 80, rateMultiplier: 40 },
        };

        // Get the ratingScale based on user and server tiers
        const ratingScale = ratingScales[`${userTier}-${serverTier}`];

        // Check if ratingScale is defined before accessing its properties
        if (ratingScale && rateServer > 0.0 && rateUser > 0.0) {
            if (userTier === serverTier) {
                // The higher the float difference, the higher the success rate
                successRate = ratingScale.baseRate - Math.abs(rateUser - rateServer) * ratingScale.rateMultiplier;
            } else {
                // If tiers are different, lower success rate
                successRate = ratingScale.baseRate - Math.abs(rateUser - rateServer) * ratingScale.rateMultiplier;
            }

            // Ensure successRate is between 0 and 100
            successRate = Math.max(0, Math.min(100, successRate));
        }

        // Update the state with the calculated success rate
        setUpgradeSuccessRate(successRate);
    };




    // Sample data for user and server items
    const userItems = [
        // ... your userItems data
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0129 },
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
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0119 },
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
