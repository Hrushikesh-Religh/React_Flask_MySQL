import { Routes, Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import Home from './components/Home';
import Userhomepage from './components/Userhomepage';
import Auth from './components/Auth'
import './App.css';
//-----

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Auth/>}>
        <Route element={<AddTask />} path="/addtask/:user" />
        <Route element={<Userhomepage />} path="/userhome/:user" />
      </Route>
    </Routes>
  );
}

export default App;
