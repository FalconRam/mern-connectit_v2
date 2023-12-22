import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProfileDetails } from "../../actions/profile";
import LeftSection from "../../components/Home/LeftSection/leftSection";
import PostDetails from "../../components/Shared/PostDetails/postDetails";

import "../../components/Shared/PostDetails/postDetails.css";
import {
  getCommentsWithProfilePicture,
  getPostById,
} from "../../actions/posts";
import Loader from "../../components/Shared/utils/loader";

const PostDetailsWithProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    if (window.location.pathname !== "/auth") history.push("/auth");
  }

  const { post, isPostLoading } = useSelector((state) => state.posts);
  const { profileDetails, isProfileLoading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getPostById(id));
    dispatch(getCommentsWithProfilePicture(id, true));
  }, []);

  let profileId = post?.creator;

  useEffect(() => {
    if (profileId !== undefined)
      dispatch(getProfileDetails(post?.creator, false));
  }, [profileId]);

  const openProfile = (profileId) =>
    history.push(`/profile/details?profileId=${profileId}`);

  return (
    <>
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="container d-flex align-items-center customMargin gap-3">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block d-xl-block d-xxl-block">
              <LeftSection
                userProfileDetails={profileDetails}
                isProfileLoading={isProfileLoading}
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
      )}
    </>
  );
};

export default PostDetailsWithProfile;