import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AdminRegister from './components/admin/AdminRegister';
import UserRegister from './components/user/UserRegister';
import AdminLogin from './components/admin/AdminLogin';
import UserLogin from './components/user/UserLogin';
import AdminHome from './components/admin/AdminHome';
import UserHome from './components/user/UserHome';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/user/home" element={<UserHome />} />
      </Routes>
    </Router>
  );
};

export default App;
