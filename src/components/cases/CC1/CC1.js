import React from "react";
import './CC1.css'

class CC1 extends React.Component {
    render() {
        return (
            <>
                <div className="opencase" id='free1'>
                    <h1>Common1</h1>
                    <img src={require('../../../assets/case/commoncase1.png')} alt="" />
                    <button>Open $5.00</button>
                </div>

                <div className="case_item">
                    <div className="image-container">
                        <img src={require('../../../assets/skin/common1/tier1/CC1-1_1.avif')} className="tier1" />
                        <img src={require('../../../assets/skin/common1/tier1/CC1-1_2.avif')} className="tier1" />
                        <img src={require('../../../assets/skin/common1/tier1/CC1-1_3.avif')} className="tier1" />
                        <img src={require('../../../assets/skin/common1/tier1/CC1-1_4.avif')} className="tier1" />
                        
                        <img src={require('../../../assets/skin/common1/tier2/CC1-2_1.avif')} className="tier2" />
                        <img src={require('../../../assets/skin/common1/tier2/CC1-2_2.avif')} className="tier2" />
                        <img src={require('../../../assets/skin/common1/tier2/CC1-2_3.avif')} className="tier2" />

                        <img src={require('../../../assets/skin/common1/tier3/CC1-3_1.avif')} className="tier3" />
                        <img src={require('../../../assets/skin/common1/tier3/CC1-3_2.avif')} className="tier3" />
                        <img src={require('../../../assets/skin/common1/tier3/CC1-3_3.avif')} className="tier3" />

                        <img src={require('../../../assets/skin/common1/tier4/CC1-4_1.avif')} className="tier4" />

                        <img src={require('../../../assets/skin/common1/tier5/CC1-5_1.avif')} className="tier5" />
                    </div>
                </div>
            </>
        );
    }
}

export default CC1;