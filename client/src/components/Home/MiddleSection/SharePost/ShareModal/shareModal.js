import React, { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import FileBase from "react-file-base64";

import "./shareModal.css";
import { createPost } from "../../../../../actions/posts";
import PreviewImage from "../../../../Shared/PreviewImage/previewImage";

const ShareModal = ({ isEditModal, setIsEditModal }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState("");
  const [fileSize, setFileSize] = useState(null);

  const [formFileError, setFormFileError] = useState("");

  const title = useRef("");
  const message = useRef("");
  const tags = useRef("");

  let clearForm = (e) => {
    title.current.value = "";
    message.current.value = "";
    tags.current.value = "";
    setSelectedFile("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let postFormData = {
      title: title.current.value,
      message: message.current.value,
      tags: tags.current.value,
      selectedFile: selectedFile,
    };
    dispatch(createPost({ ...postFormData, name: user?.name }, history));
    clearForm();
  };
  const [isFileSizeExceed, setIsFileSizeExceed] = useState(false);
  const fileSizeLimit = 20;
  const fileSizeMessages = {
    noFileSelected: "No file selected",
    fileSizeExeed: "File Size Exceeds limit - 20MB",
  };
  let fileSizeInMB = fileSize / (1024 * 1024).toFixed(2);

  useEffect(() => {
    if (fileSizeInMB > fileSizeLimit) {
      setFormFileError(fileSizeMessages.fileSizeExeed);
      setIsFileSizeExceed(true);
    } else if (fileSize === 0) {
      setFormFileError(fileSizeMessages.noFileSelected);
      setIsFileSizeExceed(true);
    } else {
      setFormFileError("");
      setIsFileSizeExceed(false);
    }
  }, [fileSize]);

  const handlePostShareModalClose = () => {
    setIsEditModal(!isEditModal);
  };

  return (
    <>
      <div
        className="modal fade"
        id="createModal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="createModal">
                Share your Post
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handlePostShareModalClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-1">
                  <label htmlFor="tittle" className="col-form-label">
                    Tittle
                  </label>
                  <input
                    ref={title}
                    type="text"
                    className="form-control form-control-sm"
                    id="tittle"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="tags" className="col-form-label">
                    Hastags
                  </label>
                  <input
                    ref={tags}
                    type="text"
                    className="form-control form-control-sm"
                    id="tags"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="col-form-label">
                    Caption
                  </label>
                  <textarea
                    ref={message}
                    className="form-control form-control-sm text-area"
                    id="message"
                  ></textarea>
                </div>
                {!isEditModal ? (
                  <div
                    className="fileBase"
                    onChange={(e) => {
                      setFileSize(e.target.files[0].size);
                    }}
                  >
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => setSelectedFile(base64)}
                    />
                    {!isFileSizeExceed && fileSizeInMB > 0 ? (
                      <>
                        <p className="formInfo mt-1 mb-1">Perfect!...</p>
                        <PreviewImage selectedFile={selectedFile} />
                      </>
                    ) : (
                      fileSizeInMB === 0 && (
                        <p className="formInfo mt-1">
                          Max. Picture Size is 20MB
                        </p>
                      )
                    )}
                    {formFileError === fileSizeMessages.fileSizeExeed ? (
                      <p className="formError mt-1">
                        {fileSizeMessages.fileSizeExeed}
                      </p>
                    ) : (
                      fileSizeInMB === 0 && (
                        <p className="formError mt-1">
                          {fileSizeMessages.noFileSelected}
                        </p>
                      )
                    )}
                  </div>
                ) : null}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-bs-dismiss="modal"
                onClick={(e) => clearForm(e)}
              >
                Cancel
              </button>
              <button
                disabled={formFileError !== "" || fileSize === null}
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
