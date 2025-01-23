import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Landing from './components/Landing.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Ulasan from './components/Ulasan.jsx'
import Pesan from './components/Pesan.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Landing />
        }>
        </Route>
        <Route path='/register' element={
          <SignUp />
        }>
        </Route>
        <Route path='/login' element={
          <Login />
        }>
        </Route>
        <Route path='/home' element={
          <Home />
        }>
        </Route>
        <Route path='/ulasan' element={
          <Ulasan />
        }>
        </Route>
        <Route path='/pesan' element={
          <Pesan />
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
