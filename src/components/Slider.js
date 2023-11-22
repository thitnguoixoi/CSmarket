import './styles/Slider.css';

function Slider(){
    var counter = 1;
    setInterval(function(){
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if(counter > 4){counter = 1;}}, 5000);

        function login_done(){
          window.location.href="./main_page.html";
        }
    return(
        <div className="slider">
            <div className="slides">
                <input type="radio" name="radio-btn" id="radio1"/>
                <input type="radio" name="radio-btn" id="radio2"/>
                <input type="radio" name="radio-btn" id="radio3"/>
                <input type="radio" name="radio-btn" id="radio4"/>
                <div className="slide first">
                    <img src={require('../assets/slide/2.png')} alt="slide images"/>
                </div>
                <div className="slide">
                    <img src={require('../assets/slide/3.png')} alt="slide images"/>
                </div>
                <div className="slide">
                    <img src={require('../assets/slide/1.png')} alt="slide images"/>
                </div>
                <div className="slide">
                    <img src={require('../assets/slide/4.webp')} alt="slide images"/>
                </div>
                <div className="navigation-auto">
                    <div className="auto-btn1"></div>
                    <div className="auto-btn2"></div>
                    <div className="auto-btn3"></div>
                    <div className="auto-btn4"></div>
                </div>
            </div>
            <div className="navigation-manual">
            <label for="radio1" className="manual-btn"></label>
            <label for="radio2" className="manual-btn"></label>
            <label for="radio3" className="manual-btn"></label>
            <label for="radio4" className="manual-btn"></label>
            </div>
        </div>
    )

}
export default Slider;