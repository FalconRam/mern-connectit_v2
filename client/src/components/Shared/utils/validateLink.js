import React from "react";
import Loader from "./loader";

const ValidateLink = ({ customText }) => {
  return (
    <>
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h5 className="text-muted mb-0">Validting the {customText}...</h5>
        <Loader />
      </div>
    </>
  );
};

export default ValidateLink;
