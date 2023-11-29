// Modify the Inventory.js file to include the styles

import React from "react";
import './styles/Inventory.css';
import UpgradeSection from './UpgradeSection';
import SelectedItem from './SelectedItem';
import Item from "./Item";

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
            new Item("Tier 1", "CC1-1_1.avif", "Item 1", 10),
            new Item("Tier 2", "CC1-1_2.avif", "Item 2", 20),
            new Item("Tier 3", "CC1-1_3.avif", "Item 3", 30),
            new Item("Tier 1", "CC1-1_1.avif", "Item 1", 10),
            new Item("Tier 2", "CC1-1_2.avif", "Item 2", 20),
            new Item("Tier 3", "CC1-1_3.avif", "Item 3", 30),
            new Item("Tier 1", "CC1-1_1.avif", "Item 1", 10),
            new Item("Tier 2", "CC1-1_2.avif", "Item 2", 20),
            new Item("Tier 3", "CC1-1_3.avif", "Item 3", 30),
            new Item("Tier 1", "CC1-1_1.avif", "Item 1", 10),
            new Item("Tier 2", "CC1-1_2.avif", "Item 2", 20),
            new Item("Tier 3", "CC1-1_3.avif", "Item 3", 30)
            // Add more items if needed
        ];

        const serverItems = [
            new Item("Tier 1", "CC1-1_1.avif", "Server Item 1", 15),
            new Item("Tier 2", "CC1-1_2.avif", "Server Item 2", 25),
            new Item("Tier 3", "CC1-1_3.avif", "Server Item 3", 35),
            new Item("Tier 1", "CC1-1_1.avif", "Server Item 1", 15),
            new Item("Tier 2", "CC1-1_2.avif", "Server Item 2", 25),
            new Item("Tier 3", "CC1-1_3.avif", "Server Item 3", 35),
            new Item("Tier 1", "CC1-1_1.avif", "Server Item 1", 15),
            new Item("Tier 2", "CC1-1_2.avif", "Server Item 2", 25),
            new Item("Tier 3", "CC1-1_3.avif", "Server Item 3", 35),
            new Item("Tier 1", "CC1-1_1.avif", "Server Item 1", 15),
            new Item("Tier 2", "CC1-1_2.avif", "Server Item 2", 25),
            new Item("Tier 3", "CC1-1_3.avif", "Server Item 3", 35),
            // Add more items if needed
        ];

        const { selectedUserItem, selectedServerItem, upgradeSuccessRate } = this.state;

        return (
            <div className="inventory-container">
                <div className="selected-items">
                    <div className="User-select">
                        <h3>Selected Item</h3>
                        <SelectedItem selectedItem={selectedUserItem} fixedSize />
                    </div>

                    <UpgradeSection
                        handleUpgradeClick={this.handleUpgradeClick}
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
                                        onClick={() => this.handleUserItemClick(item)}
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
                                        onClick={() => this.handleServerItemClick(item)}
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
}

export default Inventory;
