import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = (CustomComponent) => {
  return (props) => {
    const user = JSON.parse(localStorage.getItem("profile"));

    const redirectPath = props.location.pathname + props.location.search;

    if (!user) {
      localStorage.setItem("redirectURL", redirectPath);
      return (
        <Redirect
          to={`/auth?redirectURL=${encodeURIComponent(`${redirectPath}`)}`}
        />
      );
    }
    return <CustomComponent {...props} />;
  };
};

export default ProtectedRoute;
