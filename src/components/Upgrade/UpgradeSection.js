// UpgradeSection.js

import React from "react";
import Item from './Item.js';

class UpgradeSection extends React.Component {
    render() {
        const { handleUpgradeClick, upgradeSuccessRate } = this.props;

        return (
            <div className="upgrade-section">
                <h2>Upgrade Section</h2>
                <button onClick={handleUpgradeClick}>Nâng cấp</button>
                <p>Tỷ lệ nâng cấp thành công: {upgradeSuccessRate.toFixed(2)}%</p>
            </div>
        );
    }
}

export default UpgradeSection;
