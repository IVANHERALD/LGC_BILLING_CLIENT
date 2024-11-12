import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import Invoice from './Invoice/Invoice';
import Customer from './Customer/Customer.js'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NumberToWords from './Wordgen/wordgen';
import Casting from './Casting/Casting.js';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/casting" element={<Casting />} />
      </Routes>
      
      </Router>
    </div>
  );
}

export default App;
