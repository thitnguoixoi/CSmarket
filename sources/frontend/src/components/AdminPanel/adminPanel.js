import React from "react";
import { Link } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
    return (
        <div className="admin-panel">
            <nav>
                <ul>
                    <li>
                        <img src={require("../../assets/logo/dashboard.png")} alt="dashboard"></img>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <img src={require("../../assets/logo/User.png")} alt="users"></img>
                        <Link to="/admin/users">Users</Link>
                    </li>
                    <li>
                        <img src={require("../../assets/logo/case.png")} alt="cases"></img>
                        <Link to="/admin/cases">Cases</Link>
                    </li>
                    <li>
                        <img src={require("../../assets/logo/skins.png")} alt="skins"></img>
                        <Link to="/admin/skins">Skins</Link>
                    </li>
                    <li>
                        <img src={require("../../assets/logo/skins.png")} alt="skins"></img>
                        <Link to="/admin/userskins">User Skins</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminPanel;
