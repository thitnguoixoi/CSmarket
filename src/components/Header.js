import './styles/Header.css';

function Header() {
    return (
      <>
        <div className="header">
        <a href="#"><img src={require('../assets/logo/demo2.png')}/></a>  
        <a href="#" className="btn">Login via steam</a>
      </div>
      </>
      
    );
}
  
  export default Header;