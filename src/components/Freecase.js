import './styles/Freecase.css';
import freecase1 from '../assets/case/freecase1.png'
import freecase2 from '../assets/case/freecase2.png'

function Freecase(){
    return (
        <>
            <div className='Freecase'>
                <h1 className="title">Free case</h1>
                <div className="case_img">
                    <a href="#">
                        <div className="img_box">
                            <img src={freecase1} />
                        </div>
                        <h3>$0.00</h3>
                    </a>
                    <a href="#">
                        <div className="img_box">
                            <img src={freecase2} />
                        </div>
                        <h3>$0.00</h3>
                    </a>
                </div>
            </div>
        </>     
      );
}

export default Freecase;