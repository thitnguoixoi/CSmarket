import React from "react";
import { Link } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/cases">Cases</Link>
                    </li>
                    <li>
                        <Link to="/admin/skins">Skins</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminPanel;
