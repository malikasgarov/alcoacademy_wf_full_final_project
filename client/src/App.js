import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header.js';
import Begin from './components/begin.js';
import Counters from './components/Counters.js';
import Index from './components/index.js';
import Register from "./components/register.js";
import Login from "./components/login.js";
import Math from "./components/Math.js";
import Results from './components/Results.js';
import Programming from "./components/Programming.js";
import History from "./components/History.js"
import Resultsforusername from './components/Resultsforusername.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}></Route>
        <Route path='*' element={<Index />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/math' element={<Math />}></Route>
        <Route path='/result/:id' element={<Results />}></Route>
        <Route path='/programming' element={<Programming />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/resultsforusername/:namee' element={<Resultsforusername />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
