import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProfileDetails } from "../../../actions/profile";
import LeftSection from "../../Home/LeftSection/leftSection";
import PostDetails from "../../Shared/PostDetails/postDetails";

import "../../Shared/PostDetails/postDetails.css";
import { getPostById } from "../../../actions/posts";

const PostDetailsWithProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    history.push("/auth");
  }

  const { post, isLoading } = useSelector((state) => state.posts);
  const { profileDetails } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getPostById(id));
  }, []);

  let profileId = post?.creator;

  useEffect(() => {
    if (profileId !== undefined) dispatch(getProfileDetails(post?.creator));
  }, [profileId]);

  const openProfile = (profileId) =>
    history.push(`/profile/details?profileId=${profileId}`);

  return (
    <>
      <div className="container d-flex align-items-center customMargin gap-3">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block d-xl-block d-xxl-block">
            <LeftSection
              profileDetails={profileDetails}
              id={id}
              profileId={profileId}
              post={post}
            />
          </div>
          <div className="col-12 col-lg-9">
            <PostDetails post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsWithProfile;