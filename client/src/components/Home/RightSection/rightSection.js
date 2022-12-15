import React from "react";

import "./rightSection.css";

const RightSection = () => {
  return (
    <>
      <div className="col-sm-12 col-md-3 d-flex flex-column gap-3">
        <div className="border border-secondary h-50">Upper Part</div>
        <div className="border border-secondary sticky-md-top sticky-lg-top position-sticky-top">
          Lower Part
        </div>
      </div>
    </>
  );
};

export default RightSection;
