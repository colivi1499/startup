import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  function NotFound() {
    return (
      <main className="container-fluid bg-secondary text-center d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <h1 className="text-white">404: Return to sender. Address unknown.</h1>
      </main>
    );
  }
  

export default App;