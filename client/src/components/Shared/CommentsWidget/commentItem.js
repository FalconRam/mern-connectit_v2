import React from "react";

const CommentItem = ({ comment }) => {
  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center ms-1 gap-2 ">
            <i className="bi bi-chat-left likeIcon text-success "></i>
            {/* <MiniProfilePicture
                isComment={true}
                sortedComment={sortedComment}
            /> */}

            {/* <h5 className="mb-0 commenterName">
              {comment?.map((c)=> c.commenterName}
              </h5>
            <p className="mb-0 commenterCmt">{sortedComment?.comment}</p> */}
          </div>
          <h5 className="mb-0 commenterName">
            {comment?.commenterName}
            {console.log(comment)}
          </h5>
          {/* <div>
            <p className="mb-0 me-1 commenterCmt text-muted">
              {comments?.postComment?.length} Comments
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CommentItem;
