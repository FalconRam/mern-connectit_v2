import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails } from "../../actions/profile";

import "./home.css";
import LeftSection from "./LeftSection/leftSection";
import MiddleSection from "./MiddleSection/middleSection";
import RightSection from "./RightSection/rightSection";
import ShareCard from "./MiddleSection/SharePost/ShareCard/shareCard";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user?.result?._id;

  const history = useHistory();
  const dispatch = useDispatch();

  const { profileDetails } = useSelector((state) => state.profile);
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!user) {
    history.push("/auth");
  }

  useEffect(() => {
    dispatch(getProfileDetails(id));
  }, []);

  return (
    <>
      <div className="container-md customMargin">
        <div className="row">
          <div className="col-sm-12 col-md-4 mb-3 col-lg-3">
            <LeftSection profileDetails={profileDetails} />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-6">
            <ShareCard profileDetails={profileDetails} />
            <MiddleSection posts={posts} isLoading={isLoading} />
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
