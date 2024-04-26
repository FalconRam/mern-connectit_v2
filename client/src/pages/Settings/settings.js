import React from "react";

import { useHistory } from "react-router-dom";
import ShareModal from "../../components/Home/MiddleSection/SharePost/ShareModal/shareModal";

const Settings = () => {
  const history = useHistory();
  let user = JSON.parse(localStorage.getItem("profile"));

  return (
    <>
      <div className="customMargin">Comming Soon...</div>
      <ShareModal />
    </>
  );
};

export default Settings;
