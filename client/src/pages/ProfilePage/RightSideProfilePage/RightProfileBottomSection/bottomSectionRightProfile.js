import React, { useEffect, useState } from "react";
import Loader from "../../../../components/Shared/utils/loader";

import "./bottomSectionRightProfile.css";
import UserPost from "./UserPost/userPost";

const BottomSectionRightProfile = ({
  userPosts,
  savedPosts,
  profileDetails,
  isPostLoading,
}) => {
  const [tab, setTab] = useState("");

  const url = new URL(window.location.href);
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");

  useEffect(() => {
    if (type === "my-items") setTab("my-items");
    else setTab("");
  }, [type]);

  const handleSwtichTab = () => {
    let type = url.searchParams.get("type");
    if (!type) {
      url.searchParams.set("type", "my-items");
      window.history.pushState(null, "", url.toString());
    } else if (type) {
      url.searchParams.delete("type", "my-items");
      window.history.pushState(null, "", url.toString());
    }
    // else if (type !== "my-items") {
    //   url.searchParams.delete("type", type);
    //   window.history.pushState(null, "", url.toString());
    // }
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
            {/* Saved Posts */}
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
                    {savedPosts?.map((savedPost, i) => (
                      <UserPost key={i} post={savedPost} isSaved={true} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BottomSectionRightProfile;
