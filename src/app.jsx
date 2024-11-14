import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Group from './group'
import Home from './home'
import Login from './login'

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/group" element={<Group />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
  

export default App;