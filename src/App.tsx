import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginContainer from "./Containers/Login";
import { createGlobalStyle } from "styled-components";
import SignupContainer from "./Containers/Signup";
import Dashboard from "./Containers/Dashboard";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import { RootState } from "./Reducer";
import { ConfigsReducer } from "./Action/types";

function Navigator() {
  const { signedIn } = useSelector<RootState>(
    (state) => state.Configs
  ) as ConfigsReducer;

  return (
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
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Navigator />
      </PersistGate>
    </Provider>
  );
};

const GlobalStyle = createGlobalStyle`
  body{
    margin:unset;
    font-size: 20px;
  }
`;

export default App;
