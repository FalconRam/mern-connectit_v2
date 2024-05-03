import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { updatePost } from "../../../../../actions/posts";

import "./shareModal.css";

const PostEditModal = ({ post, isSaved }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  // const history = useHistory();

  const [postData, setPostData] = useState({
    title: post?.title,
    message: post?.message,
    tags: post?.tags,
    selectedFile: post?.selectedFile,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost(post?._id, postData));
  };

  return (
    <>
      <div
        className="modal fade"
        id={
          isSaved
            ? `backdropEditPost${post._id}_saved`
            : `backdropEditPost${post._id}`
        }
        tabIndex="-1"
        aria-labelledby="backdropEditPostLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2
                className="modal-title fs-5"
                id={
                  isSaved
                    ? `backdropEditPost${post._id}_saved`
                    : `backdropEditPost${post._id}`
                }
              >
                Update your Post
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-1">
                  <label htmlFor="tittle" className="col-form-label">
                    Tittle
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="tittle"
                    value={postData.title}
                    onChange={(e) =>
                      setPostData({ ...postData, title: e.target.value })
                    }
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="tags" className="col-form-label">
                    Hastags
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="tags"
                    value={postData.tags}
                    onChange={(e) =>
                      setPostData({ ...postData, tags: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="col-form-label">
                    Caption
                  </label>
                  <textarea
                    className="form-control form-control-sm text-area"
                    id="message"
                    value={postData.message}
                    onChange={(e) =>
                      setPostData({ ...postData, message: e.target.value })
                    }
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Update Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostEditModal;
