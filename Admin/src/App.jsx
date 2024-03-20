import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Form from "./pages/formPage";
import Navbar from "./pages/Navbar";
import Login from "./pages/loginPage";
import Home from "./pages/HomePage";
import Signup from "./pages/signupPage";
import GetOTP from "./pages/getOTP";
import Mess from "./pages/MessDetail";
import Cards from "./components/MessCard";
import GiveFeedback from "./pages/GiveFeedback";
import ViewFeedback from "./pages/viewFeedback";
import { StudentsPage } from "./pages/StudentsPage";
import Sidebar from "./pages/sidebar";
import { MessMenu } from "./pages/MessMenu";

function App() {
  // const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/getOTP" element={<GetOTP />} />
          <Route exact path="/mess" element={<Mess />} />
          <Route exact path="/cards" element={<Cards />} />
          <Route exact path="/giveFeedback" element={<GiveFeedback />} />
          <Route exact path="/viewFeedback" element={<ViewFeedback />} />
          <Route exact path="/student" element={<StudentsPage />} />
          <Route path="menu" element={<MessMenu />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
