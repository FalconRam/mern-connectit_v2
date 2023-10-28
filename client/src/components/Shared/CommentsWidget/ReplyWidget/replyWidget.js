import React from "react";
import moment from "moment";
import MiniProfilePicture from "../../MiniProfilePicture/miniProfilePicture";
import Likes from "../../Likes/likes";

const ReplyWidget = ({ user, reply }) => {
  const handleReplyLike = () => {
    console.log("Dipatching Reply like");
  };
  const handleReply = () => {
    console.log("Dipatching Reply To Reply");
  };
  return (
    <>
      <div className="ms-3 ps-2 mt-2 py-1">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div
              className="likeIcon text-success"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <MiniProfilePicture isComment={true} reply={reply} />
            </div>
            <h5 className="mb-0 commenterName">{reply?.replierName}</h5>
            <p className="mb-0 commenterCmt">{reply?.reply}</p>
          </div>
        </div>
        <div className="ms-3 ps-4 d-flex align-items-center gap-3">
          <p className="mb-0 commenterCmt text-muted">
            {moment(reply?.createdAt).fromNow()}
          </p>
          <Likes
            isLiked={reply.replyLikes.includes(user?.id)}
            likes={reply.replyLikes.length}
            likeFrom={"commentModal"}
            handleCommentLike={handleReplyLike}
          />
          <span className="mb-0 commenterName text-muted" onClick={handleReply}>
            Reply
          </span>
        </div>
      </div>
    </>
  );
};

export default ReplyWidget;
