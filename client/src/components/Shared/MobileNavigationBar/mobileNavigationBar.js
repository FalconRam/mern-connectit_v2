import React from "react";
import LeftSideProfilePage from "../../pages/ProfilePage/LeftSideProfilePage/leftSideProfilePage";

const MobileNavigationBar = () => {
  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="col-sm-12 d-md-none d-sm-block bg-white customMargin fixed-bottom">
        <LeftSideProfilePage />
      </div>
    </>
  );
};

export default MobileNavigationBar;
