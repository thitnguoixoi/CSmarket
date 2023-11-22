import './styles/Footer.css';
import User from '../assets/logo/User.png';
import Online from '../assets/logo/online.png';
import Opencase from '../assets/logo/opencase.png';
import Upgrade from '../assets/logo/Upgrade.png';
import csmarket from '../assets/logo/csmarket.png';
import fb from '../assets/logo/facebook.webp';
import dis from '../assets/logo/discord.webp';
import steam from '../assets/logo/steam.webp';

function Footer(){
    return (
        <>
            <div id='live_div'>
                <div className='logo'>
                    <div id='logo_big'>
                        <img src={csmarket} width='240px'/>
                    </div>
                    <div id='logo_small'>
                        <a href='https://www.facebook.com/thanh.lam.0907/'><img className='logo' src={fb} alt='facebook'/></a>
                        <a href='https://discord.gg/langmin'><img className='logo' src={dis} alt='discord'/></a>
                        <a href='https://steamcommunity.com/profiles/76561198359187274/'><img className='logo' src={steam} alt='steam'/></a>
                    </div>
                </div>
                <div className='live' id='online'>
                    <img src={Online} />
                    <div className='live_txt'>
                        <h3>0</h3>
                        <h3>Online</h3>
                    </div>
                </div>
                <div className='live' id='User'>
                    <img src={User} />
                    <div className='live_txt'>
                        <h3>0</h3>
                        <h3>User</h3>
                    </div>
                </div>
                <div className='live' id='Opened Case'>
                    <img src={Opencase} />
                    <div className='live_txt'>
                        <h3>0</h3>
                        <h3>Opened</h3>
                    </div>
                </div>
                <div className='live' id='Upgrade'>
                    <img src={Upgrade} />
                    <div className='live_txt'>
                        <h3>0</h3>
                        <h3>Upgraded</h3>
                    </div>
                </div>
            </div>

            <div class="footer_terms">
                <ul>
                    <li>© No copyright</li>
                    <li><a href="./GioiThieu.html">Giới thiệu về CsMarket</a></li>
                    <li><a href="./FAQ.html">Câu hỏi thường gặp</a></li>
                    <li><a href="./service.html">Điều khoản dịch vụ</a></li>
                    <li><a href="./policy_personal.html">Chính sách quyền riêng tư</a></li>
                    <li><a href="./policy_cookie.html">Chính sách cookie</a></li>
                </ul>
            </div>
        </>
    );
}

export default Footer;