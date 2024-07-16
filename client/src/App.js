import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header.js';
import Begin from './components/begin.js';
import Counters from './components/Counters.js';
import Index from './components/index.js';
import Register from "./components/register.js";
import Login from "./components/login.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path='*' element={<Index />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
