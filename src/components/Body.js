import './styles/Body.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Slider from './Slider.js';
import Opencase from './Opencase.js';
import FC1 from './cases/FC1/FC1.js';
import FC2 from './cases/FC2/FC2.js';
import CC1 from './cases/CC1/CC1.js';
function Body(){
    return(
        <>
            <Slider></Slider>
            <Opencase></Opencase>
            <FC1 />
            <FC2 />
            <CC1 />
        </>
    )
}

export default Body;