import React from 'react';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Body from './component/Body';

function App() {
  return (
    <div className='App'>
      <Header></Header>
      <Body name='sanjay'></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
