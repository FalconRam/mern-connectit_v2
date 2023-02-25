import React from "react";

import Posts from "./Posts/posts";
import "./middleSection.css";
import Loader from "../../Shared/utils/loader";

const MiddleSection = ({ posts, isLoading }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {posts?.map((post, i) => (
            <Posts key={i} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default MiddleSection;
