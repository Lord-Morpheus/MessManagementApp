import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Form from "./pages/formPage";
import Navbar from "./pages/Navbar";
import Login from "./pages/loginPage";
import Home from "./pages/HomePage";
import Signup from "./pages/signupPage";
import GetOTP from "./pages/getOTP";
import Mess from "./pages/MessDetail";
import Feedback from "./pages/Feedback";
import { StudentsPage } from "./pages/StudentsPage";

function App() {
  // const token = localStorage.getItem("token");

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
            <Route path="feedback" element={<Feedback />} />
            <Route path="student" element={<StudentsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
