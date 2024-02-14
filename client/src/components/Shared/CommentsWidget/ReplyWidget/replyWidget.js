import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import moment from "moment";
import MiniProfilePicture from "../../MiniProfilePicture/miniProfilePicture";
import Likes from "../../Likes/likes";
import {
  handleStateForCommentReply,
  likeCommentReply,
  setCommentReplydetails,
} from "../../../../actions/posts";
import DeleteIconButton from "../../DeleteIconButton/deleteIconButton";

const ReplyWidget = ({ user, reply, comment, post, setOnCommentHover }) => {
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(reply?.replyLikes?.includes(user?.id));
  const [likes, setLikes] = useState(reply?.replyLikes?.length);

  const [canDeleteReply, setCanDeleteReply] = useState(false);
  useEffect(() => {
    if (reply.replierId === user?.id || post.creator === user?.id)
      setCanDeleteReply(true);
  }, [reply, comment]);

  const likeCommentReplyParams = {
    postId: post._id,
    commentId: comment._id,
    replyId: reply._id,
    isComment: false,
  };
  const handleReplyLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes((currentLikeCount) => currentLikeCount - 1);
    } else {
      setIsLiked(true);
      setLikes((currentLikeCount) => currentLikeCount + 1);
    }
    dispatch(likeCommentReply(likeCommentReplyParams));
  };
  const handleReplyToReply = async () => {
    await dispatch(
      handleStateForCommentReply({
        commentToPost: false,
        replyToComment: false,
        replyToReply: true,
      })
    );
    await dispatch(
      setCommentReplydetails({
        postId: post._id,
        commentId: comment._id,
        replyId: reply._id,
        repliedToReplierName: reply.replierName, // Only for Showing Name in Input tag
      })
    );
  };

  const [onReplyHover, setOnReplyHover] = useState(false);
  const [replyDeletePayload, setReplyDeletePayload] = useState({
    commentId: "",
    replyId: "",
    postId: "",
  });
  const handleReplyHover = () => {
    setOnCommentHover(false);
    setOnReplyHover(!onReplyHover);
    setReplyDeletePayload({
      replyId: reply._id,
      commentId: comment._id,
      postId: post._id,
    });
  };

  const handleReplyTouch = () => {
    setOnCommentHover(false);
    handleReplyHover();
    setTimeout(() => setOnReplyHover(false), 5000);
  };

  return (
    <>
      <div
        className="ms-3 ps-2 mt-2 py-1 position-relative"
        onMouseEnter={handleReplyHover}
        onMouseLeave={handleReplyHover}
        onTouchStart={handleReplyTouch}
      >
        <div className="d-flex align-items-start gap-2">
          {/* MiniProfilePicture */}
          <div className="likeIcon" data-bs-dismiss="modal" aria-label="Close">
            <MiniProfilePicture isComment={true} reply={reply} />
          </div>

          <div className="d-flex flex-column flex-grow-1">
            {/* Replier Name, Reply */}
            <div className="">
              <span className="mb-0 commenterName me-2">
                {reply?.replierName}
              </span>
              <span className="mb-0 commenterCmt">{reply?.reply}</span>
            </div>
            {/* Timestamp, Like Count, Reply btn */}
            <div className="d-flex align-items-center gap-3">
              <p className="mb-0 commenterCmt text-muted">
                {moment(reply?.createdAt).fromNow()}
              </p>
              <Likes
                isLiked={isLiked}
                likes={likes}
                likeFrom={"commentModal"}
                handleCommentLike={handleReplyLike}
              />
              <span
                className="mb-0 commenterName text-muted likeBtn"
                onClick={handleReplyToReply}
              >
                Reply
              </span>
            </div>
          </div>
        </div>
        {onReplyHover && canDeleteReply && (
          <div className="position-absolute bottom-0 end-0">
            <DeleteIconButton
              type="post_comment_reply"
              payload={replyDeletePayload}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ReplyWidget;
