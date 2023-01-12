// import { useEffect } from 'react';
// import { useRef } from 'react';
// import { useState } from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
// import Login from './components/Login';
// import Register from './components/Register'
import AddTask from './components/AddTask'
import Default from './components/Default';
import Home from './components/Home';
import Userhomepage from './components/Userhomepage';


function App() {
  return (
      <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<AddTask />} path="/addtask/:user" />
          <Route element={<Userhomepage />} path="/userhome/:user" />
      </Routes>
  );
}

export default App;
