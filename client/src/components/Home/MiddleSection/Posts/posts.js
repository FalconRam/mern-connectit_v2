import React from "react";
import moment from "moment";

import { useHistory } from "react-router-dom";

import "./posts.css";

const Posts = ({ post }) => {
  const history = useHistory();
  const handleprofileDetails = (postId) => {
    history.push("/");
  };
  const handleEdit = () => {
    history.push("/");
  };
  const handleDelete = () => {
    history.push("/");
  };
  return (
    <>
      <div className="card mb-3 mx-auto">
        {/* Creator Details & More Option */}
        <div className="card-header d-flex align-items-center justify-content-between">
          <div className=" d-flex flex-row align-items-center gap-2">
            <img
              src={
                post?.creatorProfilePicture === ""
                  ? post?.post?.name.charAt(0).toUpperCase()
                  : post?.creatorProfilePicture ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              className="img-thumbnail rounded-circle postProfilePic d-flex align-items-center justify-content-center"
              alt={post?.post?.name.charAt(0).toUpperCase()}
            ></img>
            <div>
              <h6 className="mb-0 postCreator">{post?.post?.name}</h6>
              <p className="text-muted m-0 postCreated">
                {moment(post?.post?.createdAt).fromNow()}
              </p>
            </div>
          </div>
          {/* three dots */}
          <div>
            <div className="d-md-none dropdown">
              <button
                className="btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-custom text-center">
                <li>
                  <a className="dropdown-item" href="/">
                    <button
                      className="btn dropdown-item-custom"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    <button
                      className="btn dropdown-item-custom"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Image */}
        <div onClick={() => handleprofileDetails(post?.post?._id)}>
          <img
            src={
              post?.post?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="card-img-top postImage"
            alt="Post Picture"
          ></img>
        </div>
        {/* Caption & Comment */}
        <div className="card-body">
          <p className="card-text">{post?.post?.title}</p>
        </div>
        <div className="card-footer">2 days ago</div>
      </div>
    </>
  );
};

export default Posts;
