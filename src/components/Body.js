import './styles/Body.css';
import { Routes, Route, } from 'react-router-dom';
import Slider from './Slider.js';
import Opencase from './Opencase.js';
import Inventory from './Upgrade/Upgrade.js';

function Body(){
    return(
        <>
            <Routes>
                <Route path='/home' exact element={<><Slider></Slider><Opencase></Opencase></>}></Route>
                <Route path='/OpenCase' exact element={<Opencase/>}></Route>
                <Route path='/Upgrade' exact element={<Inventory></Inventory>}></Route>
            </Routes>
        </>
    )
}

export default Body;