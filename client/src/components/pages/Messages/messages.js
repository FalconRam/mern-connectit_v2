import React from "react";

import { useHistory } from "react-router-dom";
import LeftSideProfilePage from "../ProfilePage/LeftSideProfilePage/leftSideProfilePage";
import LeftSideMessageSection from "./LeftSideMessageSection/leftSideMessageSection";
import RightSideMessageSection from "./RightSideMessageSection/rightSideMessageSection";
import ShareModal from "../../Home/MiddleSection/SharePost/ShareModal/shareModal";
const Messages = () => {
  const history = useHistory();

  let user = JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    if (window.location.pathname !== "/auth") history.push("/auth");
  }

  return (
    <>
      <div className="">
        <div className="col-sm-1 col-md-1 col-lg-2 d-none d-sm-block bg-white customSideNav">
          <LeftSideProfilePage />
        </div>
        <div className="container customMargin px-3">
          <div className="row align-items-start jusitfy-conent-between offset-md-1 offset-lg-2 customOffset gap-3">
            {/* Left Side - Chat Profile List */}
            <LeftSideMessageSection />

            {/* Rigt Side - Chat Section */}
            <RightSideMessageSection />
          </div>
        </div>
      </div>
      <ShareModal />
    </>
  );
};

export default Messages;
