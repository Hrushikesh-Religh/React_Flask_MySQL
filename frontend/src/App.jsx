import { Routes, Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import Home from './components/Home';
import Userhomepage from './components/Userhomepage';
import './App.css';
//-----

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
