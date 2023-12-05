import './styles/Footer.css';
import User from '../assets/logo/User.png';
import Online from '../assets/logo/online.png';
import Opencase from '../assets/logo/opencase.png';
import upgrade from '../assets/logo/upgrade.png';
import csmarket from '../assets/logo/csmarket.png';
import fb from '../assets/logo/facebook.webp';
import dis from '../assets/logo/discord.webp';
import steam from '../assets/logo/steam.webp';
import Modal from './Popup';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <>
            <div id='live_div'>
                <div className='logo'>
                    <div id='logo_big'>
                        <img src={csmarket}  alt="" />
                    </div>
                    <div id='logo_small'>
                        <Link to='https://www.facebook.com/thanh.lam.0907/'><img className='logo' src={fb} alt='facebook' /></Link>
                        <Link to='https://discord.gg/langmin'><img className='logo' src={dis} alt='discord' /></Link>
                        <Link to='https://steamcommunity.com/profiles/76561198359187274/'><img className='logo' src={steam} alt='steam' /></Link>
                    </div>
                </div>
                <div className='live' id='online'>
                    <img src={Online} alt="" />
                    <div className='live_txt'>
                        <h3>0</h3>
                        <h3>Online</h3>
                    </div>
                </div>
                <div className='live' id='User'>
                    <img src={User} alt="" />
                    <div className='live_txt'>
                        <h3>0</h3>
                        <h3>User</h3>
                    </div>
                </div>
                <div className='live' id='Opened Case'>
                    <img src={Opencase} alt="" />
                    <div className='live_txt'>
                        <h3>0</h3>
                        <h3>Opened</h3>
                    </div>
                </div>
                <div className='live' id='Upgrade'>
                    <img src={upgrade} alt="" />
                    <div className='live_txt'>
                        <h3>0</h3>
                        <h3>Upgraded</h3>
                    </div>
                </div>
            </div>

            <div className="footer_terms">
                <ul>
                    <li>© No copyright</li>
                    <li><Modal text={"Giới thiệu về CSMarket"}/></li>
                    <li><Modal text={"Câu hỏi thường gặp"}/></li>
                    <li><Modal text={"Điều khoản dịch vụ"}/></li>
                    <li><Modal text={"Chính sách bảo mật"}/></li>
                    <li><Modal text={"Chính sách Cookie"}/></li>
                </ul>
            </div>
        </>
    );
}

export default Footer;