import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.js';
import Body from './components/Body.js';
import Footer from './components/Footer.js'

function App() {
  const [user, setUser] = useState(null);
  const handleUser = (value) => {
    setUser(value);
  }
  return (
    <div className="content">
      <Header user={user} setUser={handleUser}></Header>
      <div className='body'>
        <Body user={user}></Body>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
