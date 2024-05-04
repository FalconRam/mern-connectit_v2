import React from "react";

import BottomSectionRightProfile from "./RightProfileBottomSection/bottomSectionRightProfile";
import TopSectionRightProfile from "./RightProfileTopSection/topSectionRightProfile";

import "./rightSideProfilePage.css";

const RightSideProfilePage = ({
  userPosts,
  savedPosts,
  profileDetails,
  isPostLoading,
  isProfileLoading,
  isLoggedInUser,
}) => {
  let postCount = userPosts?.userPosts?.length;
  return (
    <div className="">
      <div className="">
        <TopSectionRightProfile
          profileDetails={profileDetails}
          postCount={postCount}
          isProfileLoading={isProfileLoading}
        />
      </div>
      <div className="">
        <BottomSectionRightProfile
          userPosts={userPosts}
          savedPosts={savedPosts}
          profileDetails={profileDetails}
          isPostLoading={isPostLoading}
          isLoggedInUser={isLoggedInUser}
        />
      </div>
    </div>
  );
};

export default RightSideProfilePage;
