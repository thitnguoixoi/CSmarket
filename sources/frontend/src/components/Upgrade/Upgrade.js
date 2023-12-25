import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/Upgrade.css';
import SelectedItem from './SelectedItem';
import Item from "./Item.js";
import ServerItem from "./ServerItem.js";
import axios from '../../assets/setup/axios';
import ServerSelectedItem from "./ServerSelectedItem.js";
import Swal from 'sweetalert2';



function Inventory() {
    const [userItems, setUserItems] = useState([]);
    const [serverItems, setServerItems] = useState([]);
    const navigate = useNavigate();
    // State for selected user and server items
    const [selectedUserItem, setSelectedUserItem] = useState(null);
    const [selectedServerItem, setSelectedServerItem] = useState(null);
    // State for upgrade success rate
    const [upgradeSuccessRate, setUpgradeSuccessRate] = useState(0.0);
    // State for search term
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const [serverSearchTerm, setServerSearchTerm] = useState("");
    const [filteredUserItems, setFilteredUserItems] = useState(userItems);
    const [filteredServerItems, setFilteredServerItems] = useState(serverItems);

    useEffect(() => {
        calculateRate();
        //get userskins
        axios.get(`/api/v1/users/skins`)
            .then(response => {
                setUserItems(response.data.DT);
                setFilteredUserItems(response.data.DT);
            })
            .catch(error => {
                console.error('Error get skin:', error);
                if (error.response.data.EM === 'User is not authenticate') {
                    navigate('/');
                }
            });

        //get serverskin
        axios.get(`/api/v1/skins`)
            .then(response => {
                setServerItems(response.data.DT);
                setFilteredServerItems(response.data.DT);
            })
            .catch(error => {
                console.error('Error get skin:', error);
                if (error.response.data.EM === 'User is not authenticate') {
                    navigate('/');
                }
            });
    }, []);

    useEffect(() => {
        // Calculate rate whenever selectedUserItem or selectedServerItem changes
        calculateRate();
    }, [selectedUserItem, selectedServerItem]);
    const refreshData = () => {
        // Refresh user inventory
        axios.get(`/api/v1/users/skins`)
            .then(response => {
                setUserItems(response.data.DT);
                setFilteredUserItems(response.data.DT);
            })
            .catch(error => {
                console.error('Error getting user skin:', error);
            });

        // Refresh server inventory
        axios.get(`/api/v1/skins`)
            .then(response => {
                setServerItems(response.data.DT);
                setFilteredServerItems(response.data.DT);
            })
            .catch(error => {
                console.error('Error getting server skin:', error);
            });
        setSelectedServerItem(null);
        setSelectedUserItem(null);
    };
    // Handler for user item click
    const handleUserItemClick = (item) => {
        setSelectedUserItem(item);
        filterServerItemsByPrice(item.Skin.Price);
        calculateRate();
    };
    const filterServerItemsByPrice = (userItemPrice) => {
        // Filter server items based on the price of the selected user item
        const filteredServer = serverItems.filter(
            (serverItem) => serverItem.Price >= userItemPrice
        );
        // Update filteredServerItems
        setFilteredServerItems(filteredServer);
    };
    // Handler for server item click
    const handleServerItemClick = (item) => {
        setSelectedServerItem(item);
        filterUserItemsByPrice(item.Price);
        calculateRate();
    };
    const filterUserItemsByPrice = (serverItemPrice) => {
        // Filter user items based on the price of the selected server item
        const filteredUser = userItems.filter(
            (userItem) => userItem.Skin.Price <= serverItemPrice
        );
        // Update filteredUserItems
        setFilteredUserItems(filteredUser);
    };
    const handleUserSearchChange = (event) => {
        const term = event.target.value;
        setUserSearchTerm(term);

        // Filter user items based on the search term
        const filteredUser = userItems.filter(
            (item) => item.Skin.Name.toLowerCase().includes(term.toLowerCase())
        );
        // Update filteredUserItems only if there's a search term, otherwise, keep all items
        setFilteredUserItems(term ? filteredUser : userItems);
    };
    const calculateRate = () => {
        const userPrice = selectedUserItem?.Skin.Price || 0;
        const serverPrice = selectedServerItem?.Price || 0;

        // Replace this with your actual calculation logic
        let rate = userPrice > 0 && serverPrice > 0 ? (userPrice / serverPrice) * 100 : 0;

        // Ensure rate does not exceed 100
        rate = Math.min(rate, 100);

        setUpgradeSuccessRate(rate);
    };

    // Handler for server inventory search term change
    const handleServerSearchChange = (event) => {
        const term = event.target.value;
        setServerSearchTerm(term);

        // Filter server items based on the search term
        const filteredServer = serverItems.filter(
            (item) => {
                return item.Name.toLowerCase().includes(term.toLowerCase());
            }
        );
        // Update filteredServerItems only if there's a search term, otherwise, keep all items
        setFilteredServerItems(term ? filteredServer : serverItems);
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
    const sendUpdate = () => {
        console.log(selectedUserItem.id, selectedServerItem.id);
        const dataUpgrade = {
            userskinid: selectedUserItem.id,
            serverskinid: selectedServerItem.id
        }
        axios.put(`/api/v1/users/skins/upgrade`, dataUpgrade)
            .then(response => {
                console.log(response.data.EM);
                if ((response.data.EM) === "Skin upgraded fail") {
                    Swal.fire({
                        title: "Fail",
                        text: "You lost your skin!",
                        icon: "error"
                    });
                }
                if ((response.data.EM) === "Skin upgraded success") {
                    Swal.fire({
                        title: "Success",
                        text: "Your skin has been upgrade.",
                        icon: "success"
                    });
                }
                if ((response.data.EM) === "Can not upgrade this skin") {
                    Swal.fire({
                        title: "Error",
                        text: "Choose another skin",
                        icon: "warning"
                    });
                }

            })
            .catch(error => {
                console.log('error upgrade', error);
            })
        refreshData();
    }
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
                    <button id="upgrade-button" onClick={() => {sendUpdate();refreshData();}}>Upgrade!</button>
                    <p>Rating: {upgradeSuccessRate.toFixed(2)}%</p>
                </div>

                {/* Server Selected Item */}
                <div className="Server-select">
                    <h2>Server Selected Item</h2>
                    <div className="items">
                        <ServerSelectedItem selectedItem={selectedServerItem} fixedSize />
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
                                    onClick={() => {
                                        handleUserItemClick(item)
                                    }}
                                    className={selectedUserItem === item ? "selected" : "unselected"}
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
                            {filteredServerItems.map((item, index) => {
                                // console.log(item); 
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            handleServerItemClick(item);
                                        }}
                                        className={selectedServerItem === item ? "selected" : ""}
                                    >
                                        <ServerItem data={item} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Inventory;
