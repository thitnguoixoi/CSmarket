import './styles/Body.css';
import { Routes, Route } from 'react-router-dom';
import Slider from './Slider.js';
import Opencase from '../components/opencase/OpencasePage.js';
import Inventory from './Upgrade/Upgrade.js';
import CaseOpened from '../components/opencase/CaseOpened.js';
import UserProfile from './Profile/profile.js';
import AdminPanel from './AdminPanel/adminPanel.js';
import Withdraw from "./AdminPanel/WithDraw.js";
import UsersManagement from "./AdminPanel/UserManagement";
import CaseManagement from "./AdminPanel/CaseManagement";
import SkinManagement from "./AdminPanel/SkinManagement";
import NotFound from './notFound.js';
import axios from '../assets/setup/axios.js';
import { useEffect, useState } from 'react';


function Body() {
    const [data, setData] = useState([]);

    //api take cases data to rewrite url (react router)
    useEffect(() => {
        axios.get(`/api/v1/cases`)
            .then(response => {
                setData(response.data.DT)
            })
    }, []);

    //create router base on data from api
    const renderCaseOpened = () => {
        return data.map((item) => {
            return (
                <Route
                    path={item.Cases[0]?.Name.replace(/\s+/g, '').toLowerCase()}
                    element={
                        <CaseOpened id={item.Cases[0]?.id} />
                    }
                />
            )
        })
    }

    return (
        <Routes>
            {/* everyone */}
            <Route path='/' exact element={<Slider />} />
            <Route path='/opencase' exact element={<Opencase />} />
            <Route path='/upgrade' exact element={<Inventory />} />
            <Route path='/profile' exact element={<UserProfile />} />
            {/* mod + admin */}
            <Route path='/admin' exact element={<AdminPanel />} />
            {/* mod + admin*/}
            <Route path='/admin/withdraw' exact element={<Withdraw />} />
            {/* admin only */}
            <Route path='/admin/users' exact element={<UsersManagement />} />
            <Route path='/admin/cases' exact element={<CaseManagement />} />
            <Route path='/admin/skins' exact element={<SkinManagement />} />
            {renderCaseOpened()}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Body;