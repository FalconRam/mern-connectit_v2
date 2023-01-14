import React from "react";
import LowerPart from "./LowerPart/lowerPart";

import "./rightSection.css";
import UpperPart from "./UpperPart/upperPart";

const RightSection = () => {
  return (
    <>
      <div className="d-flex flex-column gap-3 h-50">
        <div className="h-auto">
          <UpperPart />
        </div>
        <div className="text-primary">
          <hr className="m-0" />
        </div>

        <div className="sticky-md-top sticky-lg-top position-sticky-top h-auto">
          <LowerPart />
        </div>
      </div>
    </>
  );
};

export default RightSection;
