import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const PostDetailsWithProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const query = useQuery();
  const postId = query.get("postId");
  if (!postId) {
    history.push("/");
  }

  const user = JSON.parse(localStorage.getItem("profile"));

  const { post, isPostLoading } = useSelector((state) => state.posts);
  const { profileDetails, isProfileLoading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
      dispatch(getCommentsWithProfilePicture(postId, true));
    }
  }, [postId]);

  useEffect(() => {
    if (post?.creator !== undefined) {
      dispatch(getProfileDetails(post?.creator, false));
    }
  }, [post?.creator]);

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
                id={postId}
                profileId={post?.creator}
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
