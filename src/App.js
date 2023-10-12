import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import ForgotPassword from "./component/ForgotPassword";
import LoginPage from "./component/LoginPage";
import SignUp from "./component/SignUp";
import Form from "./component/Form";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/loginPage" element={<LoginPage />}></Route>
        <Route path="/Signup" element={<SignUp />}></Route>
        <Route path="/UserDetails" element={<Form />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
