import React from 'react';
import './App.css'; 
import Home from './app/screen/home/home.tsx';
import RegisterPage from './app/screen/auth/register/register.tsx';
import LoginPage from './app/screen/auth/login/login.tsx';
import Clinics from './app/screen/clinics/clinics.tsx';
import Contact from './app/screen/contact/contact.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { Header } from './app/components/header/header.tsx';
import MapPage from './app/map/hotels.tsx';
import AdminHome  from './app/admin/home/adminHomePage.tsx';
import SuperAdmin from './app/superAdmin/superAdmin.tsx';

function App() {
  return (
    <Router>
      <Header/>
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/clinics' element={<Clinics/>} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/hotels' element={<MapPage/>} />
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/superAdmin' element={<SuperAdmin/>} />
      </Routes>
    </Router>
  );
}

export default App;
