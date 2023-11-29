import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';
import Opencase from './components/Opencase.js';
import Footer from './components/Footer.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="content">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
