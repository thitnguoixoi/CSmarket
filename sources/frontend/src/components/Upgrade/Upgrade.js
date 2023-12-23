import React, { useEffect, useState } from "react";
import './styles/Upgrade.css';
import SelectedItem from './SelectedItem';
import Item from "./Item";
import axios from '../../assets/setup/axios';

function Inventory() {
    const [userItems, setUserItems] = useState([]);
    const [serverItems, setServerItems] = useState([]);

    // State for selected user and server items
    const [selectedUserItem, setSelectedUserItem] = useState(null);
    const [selectedServerItem, setSelectedServerItem] = useState(null);
    const [rateUser, setRateUser] = useState(0.0);
    const [rateServer, setRateServer] = useState(0.0);
    // State for upgrade success rate
    const [upgradeSuccessRate, setUpgradeSuccessRate] = useState(0.0);
    // State for search term
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const [serverSearchTerm, setServerSearchTerm] = useState("");
    const [filteredUserItems, setFilteredUserItems] = useState(userItems);
    const [filteredServerItems, setFilteredServerItems] = useState(serverItems);
    useEffect(() => {
        rateUpgrade();
        axios.get(`/api/v1/users/skins`)
            .then(response => {
                console.log(response);
                setUserItems(response.data.DT);
                setFilteredUserItems(response.data.DT);
                setServerItems(response.data.DT);
                setFilteredServerItems(response.data.DT);
            })
            .catch(error => {
                console.error('Error get skin:', error);
            });
    }, []);
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
    const handleUserSearchChange = (event) => {
        const term = event.target.value;
        setUserSearchTerm(term);

        // Filter user items based on the search term
        const filteredUser = userItems.filter(
            (item) => item.name.toLowerCase().includes(term.toLowerCase())
        );

        // Update filteredUserItems only if there's a search term, otherwise, keep all items
        setFilteredUserItems(term ? filteredUser : userItems);
    };

    // Handler for server inventory search term change
    const handleServerSearchChange = (event) => {
        const term = event.target.value;
        setServerSearchTerm(term);

        // Filter server items based on the search term
        const filteredServer = serverItems.filter(
            (item) => item.name.toLowerCase().includes(term.toLowerCase())
        );

        // Update filteredServerItems only if there's a search term, otherwise, keep all items
        setFilteredServerItems(term ? filteredServer : serverItems);
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


    const userSearchBar = (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search User Inventory"
                value={userSearchTerm}
                onChange={handleUserSearchChange}
            />
        </div>
    );
    const serverSearchBar = (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Server Inventory"
                value={serverSearchTerm}
                onChange={handleServerSearchChange}
            />
        </div>
    );



    return (
        <div className="inventory-container">
            <div className="selected-items">
                {/* User Selected Item */}
                <div className="User-select">
                    <h2>User Selected Item</h2>
                    <div className="items">
                        <SelectedItem selectedItem={selectedUserItem} fixedSize />
                    </div>
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
                    <div className="items">
                        <SelectedItem selectedItem={selectedServerItem} fixedSize />
                    </div>
                </div>
            </div>

            {/* User and Server Inventories */}
            <div className="inventory">
                {/* User Inventory */}
                <div className="user-inventory">
                    <h2>User Inventory</h2>
                    {userSearchBar}
                    <div className="user">
                        <ul>
                            {filteredUserItems.map((item, index) => (
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
                    {serverSearchBar}
                    <div className="server">
                        <ul>
                            {filteredServerItems.map((item, index) => (
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
