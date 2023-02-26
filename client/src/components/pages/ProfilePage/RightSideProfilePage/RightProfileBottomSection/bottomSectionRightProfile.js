import React from "react";
import Loader from "../../../../Shared/utils/loader";

import "./bottomSectionRightProfile.css";
import UserPost from "./UserPost/userPost";

const BottomSectionRightProfile = ({
  userPosts,
  profileDetails,
  isPostLoading,
}) => {
  return (
    <>
      <div>
        {/* Content Navigator */}
        <ul className="nav nav-tabs text-center" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="post-tab"
              data-bs-toggle="tab"
              data-bs-target="#post-tab-pane"
              type="button"
              role="tab"
              aria-controls="post-tab-pane"
              aria-selected="true"
            >
              Post
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="saved-tab"
              data-bs-toggle="tab"
              data-bs-target="#saved-tab-pane"
              type="button"
              role="tab"
              aria-controls="saved-tab-pane"
              aria-selected="false"
            >
              Saved
            </button>
          </li>
        </ul>

        {/* Content - User Post */}
        {isPostLoading ? (
          <Loader />
        ) : (
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="post-tab-pane"
              role="tabpanel"
              aria-labelledby="post-tab"
              tabIndex="0"
            >
              <div className="container mt-3">
                <div className="row">
                  <div className="d-flex justify-content-center flex-wrap gap-3">
                    {userPosts?.userPosts?.map((post, i) => (
                      <UserPost
                        key={i}
                        post={post}
                        profileDetails={profileDetails}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="saved-tab-pane"
              role="tabpanel"
              aria-labelledby="saved-tab"
              tabIndex="0"
            >
              Saved
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BottomSectionRightProfile;
