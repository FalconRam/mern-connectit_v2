import React from "react";

import BottomSectionRightProfile from "./RightProfileBottomSection/bottomSectionRightProfile";
import TopSectionRightProfile from "./RightProfileTopSection/topSectionRightProfile";

import "./rightSideProfilePage.css";

const RightSideProfilePage = ({ userPosts, profileDetails, isLoading }) => {
  let postCount = userPosts?.userPosts?.length;
  return (
    <div className="">
      <div className="">
        <TopSectionRightProfile
          profileDetails={profileDetails}
          postCount={postCount}
        />
      </div>
      <div className="">
        <BottomSectionRightProfile
          userPosts={userPosts}
          profileDetails={profileDetails}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default RightSideProfilePage;
