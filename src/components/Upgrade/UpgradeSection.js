// UpgradeSection.js

import React from "react";

class UpgradeSection extends React.Component {
    render() {
        const { handleUpgradeClick, upgradeSuccessRate } = this.props;

        return (
            <div className="upgrade-section">
                <h2>Upgrade your item</h2>
                <button onClick={handleUpgradeClick}>Nâng cấp</button>
                <p>Rating: {upgradeSuccessRate.toFixed(2)}%</p>
            </div>
        );
    }
}

export default UpgradeSection;
