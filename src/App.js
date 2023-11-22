import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';
import Opencase from './components/Opencase.js';
import Footer from './components/Footer.js'
import Case_opened from './components/Case_Opened.js';

function App() {
  return (
    <div className="content">
      <Header></Header>
      <Opencase></Opencase>
      <Case_opened></Case_opened>
      <Footer></Footer>
    </div>
  );
}

export default App;
