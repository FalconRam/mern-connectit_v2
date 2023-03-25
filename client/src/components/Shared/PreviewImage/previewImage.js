import React from "react";

const PreviewImage = ({ selectedFile }) => {
  return (
    <>
      <div className="card customPostCard">
        <img
          className="img-fluid d-block m-auto image-only"
          src={selectedFile}
          alt="Post Image"
        />
      </div>
    </>
  );
};

export default PreviewImage;
