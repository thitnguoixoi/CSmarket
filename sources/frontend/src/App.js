import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';
import Footer from './components/Footer.js'

function App() {
  return (
    <div className="content">
      <Header></Header>
      <div className='body'>
        <Body></Body>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
