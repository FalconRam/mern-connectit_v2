import React, { useEffect, useState } from "react";
import Loader from "../../../../components/Shared/utils/loader";

import "./bottomSectionRightProfile.css";
import UserPost from "./UserPost/userPost";

const BottomSectionRightProfile = ({
  userPosts,
  savedPosts,
  profileDetails,
  isPostLoading,
  isLoggedInUser,
}) => {
  const [tab, setTab] = useState("");

  const url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);
  const type = urlParams.get("type");

  useEffect(() => {
    if (type === "my-items" && isLoggedInUser) setTab("my-items");
    else {
      // If Not loggedin User profile & invalid type's value
      setTab("");
      url.searchParams.delete("type");
      window.history.pushState(null, "", url.toString()); // push to page, without reload
    }
  }, [url]);

  const handleSwtichTab = () => {
    // let currentType = url.searchParams.get("type");
    if (!type) {
      // If there is no type, set type as my-items, to active Saved Tab
      url.searchParams.set("type", "my-items");
    } else {
      // Delete type, since User Post tab should be active
      url.searchParams.delete("type");
    }
    window.history.pushState(null, "", url.toString());
  };

  return (
    <>
      <div>
        {/* Content Navigator */}
        <ul className="nav nav-tabs text-center" id="myTab" role="tablist">
          <li
            className="nav-item"
            role="presentation"
            onClick={handleSwtichTab}
          >
            <button
              className={tab !== "my-items" ? "nav-link active" : "nav-link"}
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
          {isLoggedInUser && (
            <li
              className="nav-item"
              role="presentation"
              onClick={handleSwtichTab}
            >
              <button
                className={tab === "my-items" ? "nav-link active" : "nav-link"}
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
          )}
        </ul>

        {/* Content - User Post */}
        {isPostLoading ? (
          <Loader />
        ) : (
          <div className="tab-content" id="myTabContent">
            <div
              className={
                tab !== "my-items"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="post-tab-pane"
              role="tabpanel"
              aria-labelledby="post-tab"
              tabIndex="0"
            >
              <div className="container mt-3">
                <div className="row">
                  <div className="d-flex justify-content-center flex-wrap gap-3">
                    {!userPosts?.userPosts?.length ? (
                      <p className="text-muted">
                        No Posts, Connect friends to see what they are doing
                      </p>
                    ) : (
                      userPosts?.userPosts?.map((post, i) => (
                        <UserPost
                          key={i}
                          post={post}
                          profileDetails={profileDetails}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Saved Posts */}
            {isLoggedInUser && (
              <div
                className={
                  tab === "my-items"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="saved-tab-pane"
                role="tabpanel"
                aria-labelledby="saved-tab"
                tabIndex="0"
              >
                <div className="container mt-3">
                  <div className="row">
                    <div className="d-flex justify-content-center flex-wrap gap-3">
                      {savedPosts?.length === 0 ? (
                        <p className="text-muted">No Saved Posts</p>
                      ) : (
                        savedPosts?.map((savedPost, i) => (
                          <UserPost key={i} post={savedPost} isSaved={true} />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BottomSectionRightProfile;
