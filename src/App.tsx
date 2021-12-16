import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginContainer from "./Containers/Login";
import { createGlobalStyle } from "styled-components";
import SignupContainer from "./Containers/Signup";
import MainPage from "./Containers/MainPage";

function App() {
  const signedIn = true;
  return (
    <>
      <GlobalStyle />
      <Routes>
        {signedIn ? (
          <React.Fragment>
            <Route path="/" element={<MainPage />} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route path="/" element={<LoginContainer />} />
            <Route path="/register" element={<SignupContainer />} />
          </React.Fragment>
        )}
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
