import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  commentPost,
  commentPostWithUserDetails,
} from "../../../../../actions/posts";
import PostLikeSection from "../PostLikeSection/postLikeSection";

import "./postLowerSection.css";
import PostCaption from "./PostCaption/postCaption";

const PostLowerSection = ({ post }) => {
  const dispatch = useDispatch();

  const [isPostSaved, setIsPostSaved] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));

  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.post?.commentsInfo);

  let postComment = [];
  let [commenterId, commenterName] = [user.result._id, user.result.name];
  postComment[0] = { commenterId, commenterName, comment };
  const resultComment = { postComment };

  const handleComment = async () => {
    setIsPostingComment(true);
    const updatedPostWithComment = await dispatch(
      commentPostWithUserDetails(post?.post?._id, resultComment)
    );
    setComment("");
    setIsPostingComment(false);
    setComments(updatedPostWithComment);
  };

  let sortedComment = comments.postComment
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 1);

  const handleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <div className="card-body p-2">
        {/* Like,Comment,Save */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            {/* Mini Profile Picture */}
            <div className=" d-flex flex-row align-items-center gap-2">
              <img
                src={
                  post?.creatorProfilePicture === ""
                    ? post?.post?.name.charAt(0).toUpperCase()
                    : post?.creatorProfilePicture ||
                      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                className="img-thumbnail rounded-circle miniPostProfilePic d-flex align-items-center justify-content-center"
                alt={post?.post?.name.charAt(0).toUpperCase()}
              ></img>
              <div>
                <h6 className="mb-0 postCreator">{post?.post?.name}</h6>
              </div>
            </div>
            <PostLikeSection post={post} />
            <span className="d-flex align-items-center gap-1">
              <i class="bi bi-chat-left likeIcon"></i>
              <p className="mb-0 p-like">Comment</p>
            </span>
            <span className="d-flex align-items-center gap-1">
              <i class="bi bi-send"></i>
              <p className="mb-0 p-like">Share</p>
            </span>
          </div>
          <span>
            {!isPostSaved ? (
              <i class="bi bi-bookmark likeIcon"></i>
            ) : (
              <i class="bi bi-bookmark-fill likeIcon"></i>
            )}
          </span>
        </div>
        <div class="divider custom-divider bg-light"></div>
        {/* Caption */}
        <div
          className={
            isReadMore
              ? "card-text postContent-scrollInView"
              : "card-text postContent"
          }
        >
          <h6 className="mt-1 mb-0 title">{post?.post?.title}</h6>
          <PostCaption
            post={post}
            isReadMore={isReadMore}
            handleReadMore={handleReadMore}
          />
        </div>
      </div>

      {/* Comment Section */}
      <div className="card-footer p-1 pt-1">
        <div>
          {!sortedComment.length ? (
            <p className="text-start text-muted ms-2 mb-0 pb-1 p-like">
              Be first to comment...
            </p>
          ) : (
            <>
              <div className="d-flex align-items-center ms-1 gap-2 ">
                <i class="bi bi-chat-left likeIcon text-success "></i>
                <h5 className="mb-0 commenterName">
                  {sortedComment.map((comment) => comment.commenterName)}
                </h5>
                <p className="mb-0 commenterCmt">
                  {sortedComment.map((comment) => comment.comment)}
                </p>
              </div>
            </>
          )}
        </div>
        <div class="input-group">
          <input
            disabled={isPostingComment}
            type="text"
            className={
              isPostingComment
                ? "form-control form-control-sm form-control-comment ms-2 text-muted"
                : "form-control form-control-sm form-control-comment ms-2"
            }
            placeholder="Post your Comment..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={isPostingComment || !comment.length}
            className={
              isPostingComment || !comment.length
                ? "input-group-text text-success eyeButton commentIcon me-2 text-muted commentIconHold"
                : "input-group-text text-success eyeButton commentIcon me-2"
            }
            id="basic-addon1"
            onClick={handleComment}
          >
            <i class="bi bi-plus-circle commentIcon"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default PostLowerSection;
