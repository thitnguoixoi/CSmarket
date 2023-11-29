import React from 'react';

import './styles/Opencase.css';
import Case from './Case';



class Opencase extends React.Component {
    render() {
        return (
            <>
                <div className='case' id='free'>
                    <h1 className="title">Free case</h1>
                    <div className="case_img">
                        <Case name="Freecase1" image={require('../assets/case/freecase1.png')} price="$0.00" />
                        <Case name="Freecase2" image={require('../assets/case/freecase2.png')} price="$0.00" />
                    </div>
                </div>

                <div className='case' id='common'>
                    <h1 className="title">Common case</h1>
                    <div className="case_img">
                        <Case image={require('../assets/case/commoncase1.png')} price="$5.00" />
                        <Case image={require('../assets/case/commoncase2.png')} price="$5.00" />
                        <Case image={require('../assets/case/commoncase2.png')} price="$5.00" />
                    </div>
                </div>

                <div className='case' id='epic'>
                    <h1 className="title">Common case</h1>
                    <div className="case_img">
                        <Case image={require('../assets/case/epiccase1.png')} price="$10.00" />
                        <Case image={require('../assets/case/epiccase2.png')} price="$10.00" />
                        <Case image={require('../assets/case/epiccase3.png')} price="$10.00" />
                    </div>
                </div>

                <div className='case' id='vip'>
                    <h1 className="title">Common case</h1>
                    <div className="case_img">
                        <Case image={require('../assets/case/vipcase1.png')} price="$100.00" />
                    </div>
                </div>
            </>
        );
    }
}

export default Opencase;