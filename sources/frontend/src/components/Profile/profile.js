import React from "react";
import './profile.css';
function userProfile({ user }) {
    return (
        //information
        <div className="user-profile">
            <div className="ava-link">
                <div className="user-avatar">
                    <img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" alt="avatar" />
                </div>

                <div className="infor">
                    <h3>Name: {user.name}</h3>
                    <h5>SteamID64: {user.id}</h5>
                    <h5>Balance: {user.balance}$</h5>
                    <button>Steam Profile</button>
                </div>
            </div>


            <div className="properties">
                <div className="user-case-count">
                    <h4>Case opened:</h4>
                    <span>
                        <img src={require('../../assets/logo/opencase.png')} alt="case_count" />
                        <h5>{user.casecount}</h5>
                    </span>
                </div>

                <div className="user-upgrade-count">
                    <h4>Skin upgraded:</h4>
                    <span>
                        <img src={require('../../assets/logo/upgrade.png')} alt="upgrade_count" />
                        <h5>{user.upgradecount}</h5>
                    </span>
                </div>
            </div>
        </div>

    );
}

export default userProfile;