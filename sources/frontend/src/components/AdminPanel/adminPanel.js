import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        console.log(isAdmin);
        console.log(sessionStorage.getItem('steamprofile'));
    });
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
