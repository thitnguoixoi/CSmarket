import './styles/Body.css';
import {
    Routes,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import Slider from './Slider.js';
import Opencase from './Opencase.js';
import Inventory from './Upgrade/Upgrade.js';

function Body(){
    return(
        <>
            <Routes>
                <Route path='/home' exact element={<Opencase/>}></Route>
                <Route path='/Upgrade' exact component={Inventory}></Route>
            </Routes>
        </>
    )
}

export default Body;