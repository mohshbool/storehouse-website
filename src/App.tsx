import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginContainer from "./Containers/Login";
import { createGlobalStyle } from "styled-components";
import SignupContainer from "./Containers/Signup";
import Dashboard from "./Containers/Dashboard";
import { Provider } from "react-redux";
import { persistor, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const signedIn = true;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Routes>
          {signedIn ? (
            <React.Fragment>
              <Route path="/*" element={<Dashboard />} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path="/" element={<LoginContainer />} />
              <Route path="/register" element={<SignupContainer />} />
            </React.Fragment>
          )}
        </Routes>
      </PersistGate>
    </Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    margin:unset;
    font-size: 20px;
  }
`;

export default App;
