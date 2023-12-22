import './styles/Body.css';
import { Routes, Route, } from 'react-router-dom';
import Slider from './Slider.js';
import Opencase from '../components/opencase/OpencasePage.js';
import Inventory from './Upgrade/Upgrade.js';
import CaseOpened from '../components/opencase/CaseOpened.js';
import caseData from '../assets/caseData';
import UserProfile from './Profile/profile.js';
import AdminPanel from './AdminPanel/adminPanel.js';
import Withdraw from "./AdminPanel/WithDraw.js";
import UsersManagement from "./AdminPanel/UserManagement";
import CaseManagement from "./AdminPanel/CaseManagement";
import SkinManagement from "./AdminPanel/SkinManagement";

function Body() {
    const renderCaseOpened = () => {
        return caseData.map((item) => {
            return (
                <Route
                    key={item.id}
                    path={item.to}
                    element={
                        <CaseOpened caseData={item} />
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
        </Routes>
    )
}

export default Body;