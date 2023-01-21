import React from "react";

import { useHistory } from "react-router-dom";

const Notification = () => {
  const history = useHistory();

  let user = JSON.parse(localStorage.getItem("profile"));
  if (!user) {
    history.push("/auth");
  }
  return (
    <>
      <div className="customMargin">Comming Soon...</div>
    </>
  );
};

export default Notification;
