import React from "react";

import Posts from "./Posts/posts";
import "./middleSection.css";
import Loader from "../../Shared/utils/loader";

const MiddleSection = ({ posts, isPostLoading }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <>
      {isPostLoading ? (
        <Loader />
      ) : (
        <div>
          {!posts.length ? (
            <p className="text-muted text-center">
              No Posts, Connect friends to see what they are doing
            </p>
          ) : (
            posts?.map((post, i) => <Posts key={i} post={post} />)
          )}
        </div>
      )}
    </>
  );
};

export default MiddleSection;
