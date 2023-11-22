import './styles/Opencase.css';
import freecase1 from '../assets/case/freecase1.png'
import freecase2 from '../assets/case/freecase2.png'
import common1 from '../assets/case/commoncase1.png'
import common2 from '../assets/case/commoncase2.png'
import common3 from '../assets/case/commoncase3.png'
import epic1 from '../assets/case/epiccase1.png'
import epic2 from '../assets/case/epiccase2.png'
import epic3 from '../assets/case/epiccase3.png'
import vip1 from '../assets/case/vipcase1.png'
import Case from './Case';




function Opencase(){
    return (
        <>
            <div className='case' id='free'>
                <h1 className="title">Free case</h1>
                <div className="case_img">
                    <Case image={freecase1} price="$0.00" />
                    <Case image={freecase2} price="$0.00" />
                </div>
            </div>

            <div className='case' id='common'>
                <h1 className="title">Common case</h1>
                <div className="case_img">
                    <Case image={common1} price="$5.00" />
                    <Case image={common2} price="$5.00" />
                    <Case image={common3} price="$5.00" />
                </div>
            </div>

            <div className='case' id='epic'>
                <h1 className="title">Common case</h1>
                <div className="case_img">
                    <Case image={epic1} price="$10.00" />
                    <Case image={epic2} price="$10.00" />
                    <Case image={epic3} price="$10.00" />
                </div>
            </div>

            <div className='case' id='vip'>
                <h1 className="title">Common case</h1>
                <div className="case_img">
                    <Case image={vip1} price="$100.00" />
                </div>
            </div>
        </>     
      );
}

export default Opencase;