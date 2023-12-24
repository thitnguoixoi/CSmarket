import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/Upgrade.css';
import SelectedItem from './SelectedItem';
import Item from "./Item.js";
import ServerItem from "./ServerItem.js";
import axios from '../../assets/setup/axios';
import ServerSelectedItem from "./ServerSelectedItem.js";



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
    // Handler for user item click
    const handleUserItemClick = (item) => {
        setSelectedUserItem(item);
    };

    // Handler for server item click
    const handleServerItemClick = (item) => {
        setSelectedServerItem(item);
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

    // Handler for server inventory search term change
    const handleServerSearchChange = (event) => {
        // const term = event.target.value;
        // setServerSearchTerm(term);

        // // Filter server items based on the search term
        // const filteredServer = serverItems.filter(
        //     (item) => item.Skin.Name.toLowerCase().includes(term.toLowerCase())
        // );

        // // Update filteredServerItems only if there's a search term, otherwise, keep all items
        // setFilteredServerItems(term ? filteredServer : serverItems);
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
                    <button id="upgrade-button">Upgrade!</button>
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
                                    onClick={() => handleUserItemClick(item)}
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
                                        onClick={() => handleServerItemClick(item)}
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
