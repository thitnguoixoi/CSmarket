import React from "react";
import './profile.css';
import Item from "../Upgrade/Item";
import SkinData from "../../assets/SkinData";
import SteamProfileButton from "./steamprofile";
import Swal from 'sweetalert2';

function userProfile({ user }) {
    const userItems = [
        // ... your userItems data
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0129 },
        { tier: "tier2", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier3", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0129 },
        { tier: "tier2", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier3", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0129 },
        { tier: "tier2", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier3", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
        { tier: "tier1", context: SkinData.glockOxideBlaze.imgUrl, name: SkinData.glockOxideBlaze.name, price: 10, type: "FT", float: 0.0009 },
    ];
    const PopupSell = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result.value);
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    return (
        //information
        <div className="content-user-profile">
            <div className="user-profile">
                <div className="ava-link">
                    <div className="user-avatar">
                        <img src={user.avatarfull} alt="avatar" />
                    </div>

                    <div className="infor">
                        <h3>Name: {user.personaname}</h3>
                        <h5>SteamID64: {user.steamid}</h5>
                        <h5>Balance: {user.balance}$</h5>
                        <SteamProfileButton steamID={user.steamid} />
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

            <div className="user-profile-inventory">
                <h2>User Inventory</h2>
                <div className="user-profile-inventory-items">
                    <ul>
                        {userItems.map((item) => (
                            <li>
                                <Item itemData={item} />
                                <div className="user-inventory-button">
                                    <button onClick={PopupSell}>Sell</button>
                                    <button onClick={PopupSell}>Withdraw</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>


    );
}

export default userProfile;