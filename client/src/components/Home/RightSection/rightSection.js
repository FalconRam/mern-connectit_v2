import React from "react";

import "./rightSection.css";

const RightSection = () => {
  return (
    <>
      <div className="d-flex flex-column gap-3 h-50">
        <div className="border border-secondary h-auto">
          Upper Part
          <div className="m-5">News</div>
        </div>
        <div className="border border-secondary sticky-md-top sticky-lg-top position-sticky-top h-auto">
          Lower Part
        </div>
      </div>
    </>
  );
};

export default RightSection;
