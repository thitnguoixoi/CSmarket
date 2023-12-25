import './styles/Footer.css';
import User from '../assets/logo/User.png';
import Online from '../assets/logo/online.png';
import Opencase from '../assets/logo/opencase.png';
import upgrade from '../assets/logo/upgrade.png';
import csmarket from '../assets/logo/csmarket.png';
import fb from '../assets/logo/facebook.webp';
import dis from '../assets/logo/discord.webp';
import steam from '../assets/logo/steam.webp';
import Modal from './Popup.js';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "../assets/setup/axios"
function Footer() {
    const [live, setLive] = useState(0);
    const [countOpen, setCountOpen] = useState(0);
    const [countUp, setCountUp] = useState(0);
    useEffect(() => {
        axios.get(`/api/v1/users/quantity`)
            .then(response => {
                setLive(response.data.DT);
            })
        axios.get(`/api/v1/users/opened/quantity`)
            .then(response => {
                setCountOpen(response.data.DT);
            })
        axios.get(`/api/v1/users/upgraded/quantity`)
            .then(response => {
                setCountUp(response.data.DT);
            })
    }, []);

    return (
        <div className='footer'>
            <div id='live_div'>
                <div className='logo'>
                    <div id='logo_big'>
                        <img src={csmarket} alt="" />
                    </div>
                    <div id='logo_small'>
                        <Link to='https://www.facebook.com/thanh.lam.0907/'><img className='logo' src={fb} alt='facebook' /></Link>
                        <Link to='https://discord.gg/langmin'><img className='logo' src={dis} alt='discord' /></Link>
                        <Link to='https://steamcommunity.com/profiles/76561198359187274/'><img className='logo' src={steam} alt='steam' /></Link>
                    </div>
                </div>

                <div className='live' id='User'>
                    <img src={User} alt="" />
                    <div className='live_txt'>
                        <h3>{live}</h3>
                        <h3>User</h3>
                    </div>
                </div>
                <div className='live' id='Opened Case'>
                    <img src={Opencase} alt="" />
                    <div className='live_txt'>
                        <h3>{countOpen}</h3>
                        <h3>Opened</h3>
                    </div>
                </div>
                <div className='live' id='Upgrade'>
                    <img src={upgrade} alt="" />
                    <div className='live_txt'>
                        <h3>{countUp}</h3>
                        <h3>Upgraded</h3>
                    </div>
                </div>
            </div>

            <div className="footer_terms">
                <ul>
                    <li id="copyright">© No copyright</li>
                    <li><Modal text={"About us"} /></li>
                    <li><Modal text={"Usual question"} /></li>
                    <li><Modal text={"Terms and services"} /></li>
                    <li><Modal text={"Policies"} /></li>
                    <li><Modal text={"Cookie policies"} /></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;