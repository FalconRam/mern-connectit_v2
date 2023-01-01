import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import FileBase from "react-file-base64";

import "./shareModal.css";
import { createPost } from "../../../../../actions/posts";

const ShareModal = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  const history = useHistory();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (currentId) {
    //   dispatch(
    //     updatePost(currentId, { ...postData, name: user?.result?.name }, history)
    //   );
    //   clear();
    // } else {
    //   dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    //   clear();
    // }

    dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    clear();
  };
  const clear = () => {
    // setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    // setModalOpened(false);
  };
  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="staticBackdropLabel">
                Share your Post
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
                <div className="fileBase">
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setPostData({ ...postData, selectedFile: base64 })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-bs-dismiss="modal"
                onClick={clear}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;
