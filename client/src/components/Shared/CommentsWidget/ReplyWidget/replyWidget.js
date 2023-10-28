import React from "react";
import MiniProfilePicture from "../../MiniProfilePicture/miniProfilePicture";

const ReplyWidget = ({ reply }) => {
  return (
    <>
      <div className="ms-5 mt-2">
        <div className="d-flex align-items-center gap-2">
          <div className="likeIcon text-success ">
            <MiniProfilePicture isComment={true} reply={reply} />
          </div>
          <h5 className="mb-0 commenterName">{reply?.replierName}</h5>
          <p className="mb-0 commenterCmt">{reply?.reply}</p>
        </div>
      </div>
    </>
  );
};

export default ReplyWidget;
