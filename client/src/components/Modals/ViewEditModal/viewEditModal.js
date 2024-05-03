import React from "react";
import PostEditModal from "../../Home/MiddleSection/SharePost/ShareModal/postEditModal";
import PostDetailsModal from "../PostDetailsModal/postDetailsModal";
import { getCommentsWithProfilePicture } from "../../../actions/posts";

import { useDispatch } from "react-redux";

const ViewEditModal = ({ post, profileDetails }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  let isCreator = post?.creator === user?.id;

  const dispatch = useDispatch();
  const getComments = () => {
    dispatch(getCommentsWithProfilePicture(post?._id, true));
  };
  return (
    <>
      <div
        className="modal"
        id={`viewEditModal${post._id}`}
        tabIndex="-1"
        aria-labelledby="viewEditModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="list-group dropdown-menu-custom text-center">
                {isCreator && (
                  <li
                    className="list-group-item"
                    data-bs-dismiss="modal"
                    data-bs-toggle="modal"
                    data-bs-target={`#backdropEditPost${post._id}`}
                  >
                    <a className="dropdown-item">
                      <button className="btn dropdown-item-custom">Edit</button>
                    </a>
                  </li>
                )}
                <li
                  className="list-group-item"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModalCenter${post._id}`}
                >
                  <a className="dropdown-item" onClick={getComments}>
                    <button
                      className="btn dropdown-item-custom"
                      // onClick={getComments}
                    >
                      View Post
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <PostEditModal post={post} />
      <PostDetailsModal post={post} profileDetails={profileDetails} />
    </>
  );
};

export default ViewEditModal;
