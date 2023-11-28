// Inventory.js

import React from "react";
import './styles/Inventory.css';
import UserInventory from './UserInventory';
import UpgradeSection from './UpgradeSection';
import ServerInventory from './ServerInventory';
import SelectedItem from './SelectedItem';
import Item from './Item.js';

class Inventory extends React.Component {
    state = {
        selectedUserItem: null,
        selectedServerItem: null,
        upgradeSuccessRate: 0,
    };

    handleUserItemClick = (item) => {
        const { selectedUserItem } = this.state;

        if (selectedUserItem === item) {
            this.setState({ selectedUserItem: null });
        } else {
            this.setState({ selectedUserItem: item });
        }
    };

    handleServerItemClick = (item) => {
        const { selectedServerItem } = this.state;

        if (selectedServerItem === item) {
            this.setState({ selectedServerItem: null });
        } else {
            this.setState({ selectedServerItem: item });
        }
    };

    handleUpgradeClick = () => {
        const { selectedUserItem, selectedServerItem } = this.state;

        if (selectedUserItem && selectedServerItem) {
            const upgradeSuccessRate = this.calculateUpgradeSuccessRate(
                selectedUserItem.tier,
                selectedServerItem.tier
            );

            this.setState({ upgradeSuccessRate });
        }
    };

    calculateUpgradeSuccessRate = (userTier, serverTier) => {
        const tierDifference = Math.abs(userTier - serverTier);

        const upgradeRates = {
            1: 0.25, // Từ tier 1 lên tier 2
            2: 0.05, // Từ tier 1 hoặc tier 2 lên tier 3
        };

        return upgradeRates[tierDifference] || 0;
    };

    render() {
        const userItems = [
            new Item("Tier 1", "img1.jpg", "Item 1", 10),
            new Item("Tier 2", "img2.jpg", "Item 2", 20),
            new Item("Tier 3", "img3.jpg", "Item 3", 30),
        ];

        const serverItems = [
            new Item("Tier 1", "server_img1.jpg", "Server Item 1", 15),
            new Item("Tier 2", "server_img2.jpg", "Server Item 2", 25),
            new Item("Tier 3", "server_img3.jpg", "Server Item 3", 35),
        ];

        const { selectedUserItem, selectedServerItem, upgradeSuccessRate } = this.state;

        return (
            <div className="inventory-container">
                <div className="selected-items">
                    <h3>User Item</h3>
                    <SelectedItem selectedItem={selectedUserItem} fixedSize />
                </div>

                <UserInventory
                    userItems={userItems}
                    selectedUserItem={selectedUserItem}
                    handleUserItemClick={this.handleUserItemClick}
                />

                <UpgradeSection
                    handleUpgradeClick={this.handleUpgradeClick}
                    upgradeSuccessRate={upgradeSuccessRate}
                />
                <div className="selected-items">
                    <h3>Server Item</h3>
                    <SelectedItem selectedItem={selectedServerItem} fixedSize />
                </div>
                <ServerInventory
                    serverItems={serverItems}
                    selectedServerItem={selectedServerItem}
                    handleServerItemClick={this.handleServerItemClick}
                />
            </div>
        );
    }
}

export default Inventory;
