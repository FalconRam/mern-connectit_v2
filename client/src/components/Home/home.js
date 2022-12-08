import React from "react";

import { useHistory } from "react-router-dom";

import "./home.css";
import LeftSection from "./LeftSection/leftSection";
import MiddleSection from "./MiddleSection/middleSection";
import RightSection from "./RightSection/rightSection";

const Home = () => {
  const history = useHistory();

  let user = false;

  if (!user) {
    history.push("/auth");
  }
  return (
    <>
      <div className="container">
        <LeftSection />
        <MiddleSection />
        <RightSection />
      </div>
    </>
  );
};

export default Home;
