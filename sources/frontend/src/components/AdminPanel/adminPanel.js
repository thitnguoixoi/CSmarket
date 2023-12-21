import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './AdminPanel.css';
import axios from "../../assets/setup/axios"

function AdminPanel() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMod, setIsMod] = useState(false);

    useEffect(() => {
        // Retrieve data from sessionStorage
        const storedUser = sessionStorage.getItem('steamprofile');
        // Parse data from sessionStorage
        const tmp = JSON.parse(storedUser);

        // Send Axios request to check user's group ID
        axios.get(`/api/v1/user`, { params: { steamid: tmp.steamid } })
            .then(response => {
                console.log(tmp.steamid)
                console.log(response.data.DT.GroupID);
                if (response.data.DT.GroupID === 3) {
                    setIsAdmin(true);
                } else if (response.data.DT.GroupID === 2) {
                    setIsMod(true);
                }
            })
            .catch(error => {
                console.error('Error checking user group:', error);
            });
    }, []);

    return (
        <div className="admin-panel">
            {isAdmin ? (
                <nav>
                    <ul>
                        <li>
                            <img src={require("../../assets/logo/dashboard.png")} alt="Withdraw" />
                            <Link to="/admin/Withdraw">Withdraw</Link>
                        </li>
                        <li>
                            <img src={require("../../assets/logo/User.png")} alt="users" />
                            <Link to="/admin/users">Users</Link>
                        </li>
                        <li>
                            <img src={require("../../assets/logo/case.png")} alt="cases" />
                            <Link to="/admin/cases">Cases</Link>
                        </li>
                        <li>
                            <img src={require("../../assets/logo/skins.png")} alt="skins" />
                            <Link to="/admin/skins">Skins</Link>
                        </li>
                    </ul>
                </nav>
            ) : isMod ? (
                <nav>
                    <ul>
                        <li>
                            <img src={require("../../assets/logo/dashboard.png")} alt="Withdraw" />
                            <Link to="/admin/Withdraw">Withdraw</Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                <div className="not-admin">
                    <a>You do not have permission to access this page.</a>
                    <Link to="/">Go back to homepage</Link>
                </div>
            )}
        </div>
    );
}

export default AdminPanel;
