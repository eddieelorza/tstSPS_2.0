import Home from '../pages/home/home.jsx';
import Login from '../pages/login/login.jsx';
import Signup from '../pages/signup/signup.jsx';
import OrderAside from '../components/orderAside/orderAside.jsx';
import './main.scss';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  




  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Home />
          } />
          </Routes>
        </div>
      </Router>

  );
}


export default App;
