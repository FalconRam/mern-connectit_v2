import React from "react";
import moment from "moment";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deletePost, deleteUserPost } from "../../../../../actions/posts";

import "./postUpperSection.css";

const PostUpperSection = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEdit = () => {
    history.push("/");
  };

  return (
    <>
      <div className="card-header d-flex align-items-center justify-content-between">
        <div className=" d-flex flex-row align-items-center gap-2">
          <img
            src={
              post?.profilePicture === ""
                ? post?.name.charAt(0).toUpperCase()
                : post?.profilePicture ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="img-thumbnail rounded-circle postProfilePic d-flex align-items-center justify-content-center"
            alt={post?.name.charAt(0).toUpperCase()}
          ></img>
          <div>
            <h6 className="mb-0 postCreator">{post?.name}</h6>
            <p className="text-muted m-0 postCreated">
              {moment(post?.createdAt).fromNow()}
            </p>
          </div>
        </div>
        {/* three dots */}
        <div>
          <div className="dropdown">
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
                <a className="dropdown-item">
                  <button
                    className="btn dropdown-item-custom"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </a>
              </li>
              <li>
                <a className="dropdown-item">
                  <button
                    className="btn dropdown-item-custom"
                    onClick={() => dispatch(deleteUserPost(post?._id))}
                  >
                    Delete
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostUpperSection;
