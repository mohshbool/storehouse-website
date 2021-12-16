import React from "react";
import LineChart from "../Components/LineChart";

const MainPage = () => {
  return (
    <React.Fragment>
      <LineChart title={"Users"} />
      <LineChart title={"Products"} />
      <LineChart title={"Categories"} />
    </React.Fragment>
  );
};

export default MainPage;
