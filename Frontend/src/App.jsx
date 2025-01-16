import React from 'react';
import './App.css'// Optional: You can create an external CSS file
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx';
import Ufooter from './components/Ufooter.jsx';

function App() {
  return (
    <>
   <NavBar></NavBar>
   <Home></Home>
    <Ufooter></Ufooter>
</>
  );
}

export default App