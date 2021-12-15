import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginContainer from "./Containers/Login";
import styled, { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginContainer />} />
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
