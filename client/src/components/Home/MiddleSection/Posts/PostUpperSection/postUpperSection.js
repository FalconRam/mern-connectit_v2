import React, { useState } from "react";
import moment from "moment";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteUserPost } from "../../../../../actions/posts";

import "./postUpperSection.css";
import PostEditModal from "../../SharePost/ShareModal/postEditModal";
import imgURLToBase64 from "../../../../../utils/imageURLToBase64";
import { shareOnMobile } from "react-mobile-share";

const PostUpperSection = ({ post, profileDetails }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("profile"));

  let isCreator = post?.creator === user?.id;

  let isProfilePage = window.location.pathname === "/profile/details";

  const handleCopy = () =>
    navigator.clipboard.writeText(
      `${window.location.origin}/post?postId=${post._id}`
    );

  const handleShare = async () => {
    const imgBase64 = await imgURLToBase64(post.selectedFile);

    const data = {
      text: `Hey checkout out ${post.name}'s Post`,
      url: `${window.location.origin}/post?postId=${post._id}`,
      title: `${post.title}`,
      images: [imgBase64],
    };
    try {
      shareOnMobile(data, handleCopy);
    } catch (error) {
      handleCopy();
    }
    return;
  };

  const handleProfile = () => {
    history.push(`/profile/details?profileId=${post.creator}`);
  };

  const openPost = () => {
    history.push(`/post?postId=${post._id}`);
  };

  return (
    <>
      <div className="card-header d-flex align-items-center justify-content-between">
        <div
          className="d-flex flex-row align-items-center gap-2 likeBtn"
          data-bs-dismiss="modal"
          onClick={handleProfile}
        >
          <img
            src={
              post?.profilePicture === "" ||
              profileDetails?.userDetails?.profilePicture === ""
                ? post?.name?.charAt(0).toUpperCase()
                : post?.profilePicture ||
                  profileDetails?.userDetails?.profilePicture ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="img-thumbnail rounded-circle postProfilePic d-flex align-items-center justify-content-center"
            alt={post?.name?.charAt(0).toUpperCase()}
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
              {!isProfilePage && isCreator && (
                <li
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target={`#backdropEditPost${post._id}`}
                >
                  <a className="dropdown-item">
                    <button className="btn dropdown-item-custom">Edit</button>
                  </a>
                </li>
              )}
              {isCreator && (
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
              )}
              <li>
                <a className="dropdown-item">
                  <button
                    className="btn dropdown-item-custom"
                    onClick={handleCopy}
                  >
                    Copy Link
                  </button>
                </a>
              </li>
              <li>
                <a className="dropdown-item">
                  <button
                    className="btn dropdown-item-custom"
                    onClick={handleShare}
                  >
                    Share
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <PostEditModal post={post} />
    </>
  );
};

export default PostUpperSection;
