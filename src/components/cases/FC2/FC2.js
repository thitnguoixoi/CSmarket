import React from "react";
import './FC2.css'

class FC2 extends React.Component {
    render() {
        return (
            <>
                <div className="opencase" id='free1'>
                    <h1>Freecase2</h1>
                    <img src={require('../../../assets/case/freecase2.png')} alt="" />
                    <button>Open $0.00</button>
                </div>

                <div className="case_item">
                    <div className="image-container">
                        <img src={require('../../../assets/skin/Freecase2/tier1/FC2-1_1.avif')} className="tier1" />
                        <img src={require('../../../assets/skin/Freecase2/tier1/FC2-1_2.avif')} className="tier1" />

                        <img src={require('../../../assets/skin/Freecase2/tier2/FC2-2_1.avif')} className="tier2" />
                        <img src={require('../../../assets/skin/Freecase2/tier2/FC2-2_2.avif')} className="tier2" />
                        <img src={require('../../../assets/skin/Freecase2/tier2/FC2-2_3.avif')} className="tier2" />

                        <img src={require('../../../assets/skin/Freecase2/tier3/FC2-3_1.avif')} className="tier3" />
                        <img src={require('../../../assets/skin/Freecase2/tier3/FC2-3_2.avif')} className="tier3" />
                        <img src={require('../../../assets/skin/Freecase2/tier3/FC2-3_3.avif')} className="tier3" />

                        <img src={require('../../../assets/skin/Freecase2/tier4/FC2-4_1.avif')} className="tier4" />
                        <img src={require('../../../assets/skin/Freecase2/tier4/FC2-4_2.avif')} className="tier4" />

                        <img src={require('../../../assets/skin/Freecase2/tier5/FC2-5_1.avif')} className="tier5" />
                        <img src={require('../../../assets/skin/Freecase2/tier5/FC2-5_2.avif')} className="tier5" />
                    </div>
                </div>
            </>
        );
    }
}

export default FC2;