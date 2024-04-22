import React from "react";
import Loader from "./loader";

const LoaderHOC = (CustomComponent) => {
  return (props) => {
    return (
      <>
        <CustomComponent {...props} />
        <Loader />
      </>
    );
  };
};

export default LoaderHOC;
