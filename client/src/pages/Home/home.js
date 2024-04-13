import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails } from "../../actions/profile";

import "../../components/Home/home.css";
import LeftSection from "../../components/Home/LeftSection/leftSection";
import MiddleSection from "../../components/Home/MiddleSection/middleSection";
import RightSection from "../../components/Home/RightSection/rightSection";
import ShareCard from "../../components/Home/MiddleSection/SharePost/ShareCard/shareCard";
import { getPostsByFollowing } from "../../actions/posts";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user?.id;

  const history = useHistory();
  const dispatch = useDispatch();

  const { isUserProfileLoading } = useSelector((state) => state.profile);
  const { posts, isPostLoading } = useSelector((state) => state.posts);

  if (!user) {
    if (window.location.pathname !== "/auth") history.push("/auth");
  }

  useEffect(() => {
    user && dispatch(getPostsByFollowing());
  }, []);

  return (
    <>
      <div className="container-md customMargin">
        <div className="row">
          <div className="col-sm-12 col-md-4 mb-3 col-lg-3">
            <LeftSection
              userProfileDetails={user}
              isUserProfileLoading={isUserProfileLoading}
            />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-6">
            <ShareCard
              userProfileDetails={user}
              isUserProfileLoading={isUserProfileLoading}
            />
            <MiddleSection posts={posts} isPostLoading={isPostLoading} />
            <div className="col-md-12 d-none d-md-block d-lg-none">
              <RightSection />
            </div>
          </div>
          <div className="col-sm-12 col-lg-3 d-block d-md-none d-lg-block">
            <RightSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
