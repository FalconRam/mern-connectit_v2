import React from "react";

const MiniProfilePicture = ({ post, handleProfile, isComment }) => {
  return (
    <>
      <div
        className=" d-flex flex-row align-items-center gap-2 likeBtn"
        onClick={handleProfile}
      >
       {
        isComment ? <> <img
        src={
          post?.profilePicture === ""
            ? post?.name?.charAt(0).toUpperCase()
            : post?.profilePicture ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        className="img-thumbnail rounded-circle miniPostProfilePic d-flex align-items-center justify-content-center"
        alt={post?.name?.charAt(0).toUpperCase()}
      ></img></>: <>
         <img
          src={
            post?.profilePicture === ""
              ? post?.name?.charAt(0).toUpperCase()
              : post?.profilePicture ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          className="img-thumbnail rounded-circle miniPostProfilePic d-flex align-items-center justify-content-center"
          alt={post?.name?.charAt(0).toUpperCase()}
        ></img>
        </>
       }
        <div>
          <h6 className="mb-0 postCreator">{post?.name}</h6>
        </div>
      </div>
    </>
  );
};

export default MiniProfilePicture;
