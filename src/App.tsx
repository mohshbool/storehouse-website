import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginContainer from "./Containers/Login";
import { createGlobalStyle } from "styled-components";
import SignupContainer from "./Containers/Signup";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route path="/register" element={<SignupContainer />} />
      </Routes>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    margin:unset;
    font-size: 20px;
  }
`;

export default App;
