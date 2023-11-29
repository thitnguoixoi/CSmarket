import './styles/Body.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Slider from './Slider.js';
import Opencase from './Opencase.js';

function Body(){
    return(
        <>
            <Slider></Slider>
            <Opencase></Opencase>
        </>
    )
}

export default Body;