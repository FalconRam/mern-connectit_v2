import React, { useEffect, useState } from "react";
import MiniProfilePicture from "../MiniProfilePicture/miniProfilePicture";

import { useDispatch, useSelector } from "react-redux";
import { getRepliesWithProfilePicture } from "../../../actions/posts";
import ReplyWidget from "./ReplyWidget/replyWidget";
import LoaderMini from "../utils/loaderMini";

const CommentItem = ({ post, isModal, comment }) => {
  const dispatch = useDispatch();
  // const { commentReplies, isRepliesByCommentsLoading } = useSelector(
  //   (state) => state.posts
  // );

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
  return (
    <>
      <div
        className="ms-1 mb-2"
        // {...(isModal && { "data-bs-dismiss": "modal", "aria-label": "Close" })}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="likeIcon text-success ">
              <MiniProfilePicture isComment={true} comment={comment} />
            </div>
            <h5 className="mb-0 commenterName">{comment?.commenterName}</h5>
            <p className="mb-0 commenterCmt">{comment?.comment}</p>
          </div>
        </div>
        {comment?.replyComments?.length > 0 &&
          !viewReplies &&
          !isApiLoading && (
            <div className="ms-4">
              <span
                className="commenterName text-muted ms-3"
                onClick={handleReplies}
              >
                view {comment?.replyComments?.length} replies
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
                  <ReplyWidget reply={reply} key={i} />
                ))}
            </>
          )}
        </>

        {viewReplies && (
          <div className="mb-3">
            <span
              className="commenterName text-muted float-end"
              onClick={handleReplies}
            >
              close replies
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
