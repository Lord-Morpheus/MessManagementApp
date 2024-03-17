import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Form from './components/pages/formPage';
import Navbar from './components/pages/Navbar';
import Login from './components/pages/loginPage';
import Home from './components/pages/HomePage';
import Signup from './components/pages/signupPage';
import GetOTP from "./components/pages/getOTP";
import Mess from './components/pages/MessDetail';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="form" element={<Form />} />
            <Route path="signup" element={<Signup />} />
            <Route path="getOTP" element={<GetOTP />} />
            <Route path="mess" element={<Mess />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
