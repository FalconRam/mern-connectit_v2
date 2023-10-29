import React, { useState } from "react";
import moment from "moment";
import MiniProfilePicture from "../MiniProfilePicture/miniProfilePicture";

import { useDispatch } from "react-redux";
import {
  getRepliesWithProfilePicture,
  likeCommentReply,
} from "../../../actions/posts";
import ReplyWidget from "./ReplyWidget/replyWidget";
import LoaderMini from "../utils/loaderMini";
import Likes from "../Likes/likes";

const CommentItem = ({ post, isModal, comment }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  const [viewReplies, setviewReplies] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [replies, setReplies] = useState({});

  const handleReplies = async () => {
    if (comment.replyComments.length && !viewReplies) {
      setIsApiLoading(true);
      let repliesResult = await dispatch(
        getRepliesWithProfilePicture(comment._id, post._id)
      );
      setReplies(repliesResult);
      setIsApiLoading(false);
      setviewReplies(true);
    } else if (viewReplies) {
      setviewReplies(false);
    }
  };

  const [isLiked, setIsLiked] = useState(
    comment?.commentLikes?.includes(user?.id)
  );
  const [likes, setLikes] = useState(comment?.commentLikes?.length);

  const likeCommentReplyParams = {
    postId: post._id,
    commentId: comment._id,
    isComment: true,
  };
  const handleCommentLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((currentLikeCount) => currentLikeCount - 1);
    } else {
      setIsLiked(true);
      setLikes((currentLikeCount) => currentLikeCount + 1);
    }
    dispatch(likeCommentReply(likeCommentReplyParams));
  };
  const handleReplyToComment = () => {
    console.log("Dipatching Reply To Comment");
  };
  return (
    <>
      <div
        className="ms-1 mb-2 py-1"
        // {...(isModal && { "data-bs-dismiss": "modal", "aria-label": "Close" })}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div
              className="likeIcon text-success"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <MiniProfilePicture isComment={true} comment={comment} />
            </div>
            <h5 className="mb-0 commenterName">{comment?.commenterName}</h5>
            <p className="mb-0 commenterCmt">{comment?.comment}</p>
          </div>
          <Likes
            isComment={true}
            isLiked={isLiked}
            likes={likes}
            likeFrom={"commentModal"}
            handleCommentLike={handleCommentLike}
          />
        </div>
        <div className="ms-3 ps-4 d-flex align-items-center gap-3">
          <p className="mb-0 commenterCmt text-muted">
            {moment(comment?.createdAt).fromNow()}
          </p>
          <p className="mb-0 commenterName text-muted">
            {comment?.commentLikes?.length > 1
              ? `${comment?.commentLikes?.length} Likes`
              : `${comment?.commentLikes?.length === 0 ? "Like" : "1 Like"}`}
          </p>
          <span
            className="mb-0 commenterName text-muted likeBtn"
            onClick={handleReplyToComment}
          >
            Reply
            {/* {comment?.replyComments?.length > 1
              ? `${comment?.replyComments?.length} Replies`
              : `${comment?.replyComments?.length} Reply`} */}
          </span>
        </div>
        {comment?.replyComments?.length > 0 &&
          !viewReplies &&
          !isApiLoading && (
            <div className="ms-4">
              <span
                className="commenterName text-muted ms-3 likeBtn"
                onClick={handleReplies}
              >
                View replies ({comment?.replyComments?.length})
              </span>
            </div>
          )}
        <>
          {isApiLoading ? (
            <LoaderMini />
          ) : (
            <>
              {viewReplies &&
                replies?.replyComments.map((reply, i) => (
                  <ReplyWidget
                    user={user}
                    reply={reply}
                    comment={comment}
                    post={post}
                    key={i}
                  />
                ))}
            </>
          )}
        </>

        {viewReplies && (
          <div className="mb-3">
            <span
              className="commenterCmt text-muted float-end likeBtn"
              onClick={handleReplies}
            >
              Close Replies
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
