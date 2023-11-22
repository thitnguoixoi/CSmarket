import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';
import Freecase from './components/Freecase.js';
function App() {
  return (
    <div className="content">
      <Header></Header>
      <Freecase></Freecase>
      <Body></Body>
    </div>
  );
}

export default App;
