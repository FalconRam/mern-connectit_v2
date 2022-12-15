import React from "react";

import { useHistory } from "react-router-dom";

import "./home.css";
import LeftSection from "./LeftSection/leftSection";
import MiddleSection from "./MiddleSection/middleSection";
import RightSection from "./RightSection/rightSection";

const Home = () => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    history.push("/auth");
  }
  return (
    <>
      <div className="container-md customMargin d-flex justify-content-around flex-column flex-sm-row mx-auto">
        <LeftSection />
        <MiddleSection />
        <RightSection />
      </div>
    </>
  );
};

export default Home;
