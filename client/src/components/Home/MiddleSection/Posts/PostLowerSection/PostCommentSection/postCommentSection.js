import React, { useEffect, useMemo, useState } from "react";

import "./postCommentSection.css";
import CommentsWidget from "../../../../../Shared/CommentsWidget/commentsWidget";
import CommentFormButton from "../../../../../Shared/CommentFormButton/commentFormButton";

const PostCommentSection = ({ post, isModal, isSideModal }) => {
  const [comments, setComments] = useState(post?.commentsInfo);
  useEffect(() => {
    setComments(post?.commentsInfo);
  }, [post]);
  let slicedComment = useMemo(() => {
    return comments?.postComment
      ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 1);
  }, [post, comments]);

  return (
    <>
      {/* <div className={isPostDetails && "customDetails"}> */}
      <div className={isModal ? "p-2 mx-1 ps-0" : "card-footer p-1 pt-1"}>
        <div>
          <div>
            {isModal ? (
              // Shows Comments Widget
              <CommentsWidget
                post={post}
                isModal={isModal}
                setComments={setComments}
              />
            ) : // if no comments
            !comments?.postComment?.length ? (
              <p className="text-start text-muted ms-2 mb-0 pb-1 p-like">
                Be first to comment...
              </p>
            ) : (
              // Shows last comment
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center ms-1 gap-2 ">
                    <i className="bi bi-chat-left likeIcon text-success "></i>
                    <h5 className="mb-0 commenterName">
                      {slicedComment?.map((comment) => comment.commenterName)}
                    </h5>
                    <p className="mb-0 commenterCmt">
                      {slicedComment?.map((comment) => comment.comment)}
                    </p>
                  </div>
                  <div className="">
                    <p className="mb-0 me-1 commenterCmt text-muted">
                      {comments?.postComment?.length} Comments
                    </p>
                  </div>
                </div>
            )}
          </div>
          {!isSideModal && (
            <CommentFormButton post={post} setComments={setComments} />
          )}
        </div>
      </div>
    </>
  );
};

export default PostCommentSection;
