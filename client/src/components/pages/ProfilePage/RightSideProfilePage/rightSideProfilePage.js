import React from "react";

import BottomSectionRightProfile from "./RightProfileBottomSection/bottomSectionRightProfile";
import TopSectionRightProfile from "./RightProfileTopSection/topSectionRightProfile";

import "./rightSideProfilePage.css";

const RightSideProfilePage = ({ userPosts, profileDetails }) => {
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
        />
      </div>
    </div>
  );
};

export default RightSideProfilePage;
