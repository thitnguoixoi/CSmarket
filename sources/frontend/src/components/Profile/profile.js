import React, { useEffect, useState } from "react";
import './profile.css';
import Item from "../Upgrade/Item";
import SteamProfileButton from "./steamprofile";
import Swal from 'sweetalert2';
import axios from '../../assets/setup/axios';

function UserProfile() {
    const [user, setUser] = useState({});
    const [tradeURL, setTradeURL] = useState(sessionStorage.getItem('steamprofileURL') || '');
    const [userItems, setUserItems] = useState([]);


    const refreshInventory = () => {
        axios.get(`/api/v1/users/skins`)
            .then(response => {
                setUserItems(response.data.DT);
            })
            .catch(error => {
                console.error('Error get skin:', error);
            });
    }
    useEffect(() => {
        // Send Axios request to delete item with the specified ID
        axios.get(`/api/v1/users/steamid`)
            .then(response => {
                setUser(response.data.DT);
                setTradeURL(response.data.DT?.TradeURL || '');
            })
            .catch(error => {
                console.error('Error get user profile:', error);
            });
        refreshInventory();
    }, []);

    const PopupWithDraw = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to withdraw this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, withdraw it!"
        }).then((result) => {
            withDraw(id); refreshInventory();
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Withdraw!",
                    text: "Your file has been withdraw.",
                    icon: "success"
                });
            }
        });
    }
    const withDraw = (id) => {
        const dataWithDraw = {
            userskinid: id
        }
        axios.put(`/api/v1/users/skins/withdraw`, dataWithDraw)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error withdraw skin:', error);
            });
        refreshInventory();
    }
    const PopupSell = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result);
            sell(id); refreshInventory();
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                refreshInventory();
            }
        });
    }
    const sell = (id) => {
        const dataSell = {
            userskinid: id
        }
        axios.put(`/api/v1/users/skins/sell`, dataSell)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error sell skin:', error);
            });
    }
    const handleTradeUpdate = () => {
        const key = `steamprofileURL_${user.SteamID}`;

        // Set new key with the updated tradeURL
        sessionStorage.setItem(key, tradeURL);

        axios.put(`/api/v1/users/tradeurl/update`, { steamid: user.SteamID, url: tradeURL })
            .then(response => {
            })
            .catch(error => {
                console.error('Error updating trade url:', error);
            });
    }
    return (
        //information
        <div className="content-user-profile">
            <div className="user-profile">
                <div className="ava-link">
                    <div className="user-avatar">
                        <img src={user.Avatarfull} alt="avatar" />
                    </div>

                    <div className="infor">
                        <h2>Name: {user.Personaname}</h2>
                        <h5>SteamID64: {user.SteamID}</h5>
                        <h5>Balance: {user.Wallet}$</h5>
                        <div className="inputURL">
                            <label htmlFor="tradeURL">TradeURL:</label>
                            <input
                                type="text"
                                id="tradeURL"
                                value={tradeURL}
                                onChange={(e) => setTradeURL(e.target.value)}
                            />
                            <button onClick={handleTradeUpdate}>Update TradeURL</button>
                        </div>

                        <SteamProfileButton steamID={user.SteamID} />
                    </div>
                </div>


                <div className="properties">
                    <div className="user-case-count">
                        <h4>Case opened:</h4>
                        <span>
                            <img src={require('../../assets/logo/opencase.png')} alt="case_count" />
                            <h5>{user.CountOpen}</h5>
                        </span>
                    </div>

                    <div className="user-upgrade-count">
                        <h4>Skin upgraded:</h4>
                        <span>
                            <img src={require('../../assets/logo/upgrade.png')} alt="upgrade_count" />
                            <h5>{user.CountUpgrade}</h5>
                        </span>
                    </div>
                </div>
            </div>

            <div className="user-profile-inventory">
                <h2>User Inventory</h2>
                <div className="user-profile-inventory-items">
                    <ul>
                        {userItems.map((item) => (
                            <li className="list_items">
                                <Item itemData={item} />
                                <div className="user-inventory-button">
                                    <button onClick={() => PopupSell(item.id)} id="sell">Sell</button>
                                    <button onClick={() => PopupWithDraw(item.id)} id="withdraw">Withdraw</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default UserProfile;