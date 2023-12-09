import './styles/Body.css';
import { Routes, Route, } from 'react-router-dom';
import Slider from './Slider.js';
import Opencase from './OpencasePage.js';
import Inventory from './Upgrade/Upgrade.js';
import CaseOpened from './CaseOpened.js';
import caseData from '../assets/caseData';
import UserProfile from './Profile/profile.js';
import {userData} from '../assets/userData';
function Body() {
    const renderCaseOpened = () => {
        return caseData.map((item) => {
            return (
                <Route
                    key={item.id}
                    path={item.to}
                    element={
                        <CaseOpened caseData={item}/>
                    }
                />
            )
        })
    }

    return (
        <>
            <Routes>
                <Route path='/' exact element={<><Slider /> <Opencase/></>} />
                <Route path='/opencase' exact element={<Opencase />} />
                <Route path='/upgrade' exact element={<Inventory />} />
                <Route path='/caseOpened' exact element={<CaseOpened />} />
                <Route path='/panel' exact element={<UserProfile user={userData[0]} />} />
                {renderCaseOpened()}
            </Routes>
        </>
    )
}

export default Body;