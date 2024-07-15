import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/home.js';

function App() {
  return (
    <BrowserRouter>
      <Home></Home>
    
    </BrowserRouter>
  );
}

export default App;
