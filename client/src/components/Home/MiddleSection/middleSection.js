import React from "react";

import "./middleSection.css";

const MiddleSection = () => {
  return (
    <>
      <div className="col-md-6 col-lg-7">
        <div className="card col-sm-12 col-md-10 col-lg-10 mb-3 mx-auto">
          <div class="card-header">Featured</div>
          <img
            src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            className="card-img-top"
            alt="Post Picture"
          ></img>
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div class="card-footer">2 days ago</div>
        </div>

        <div className="card col-sm-12 col-md-10 col-lg-10 mb-3 mx-auto">
          <div class="card-header">Featured</div>
          <img
            src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            className="card-img-top"
            alt="Post Picture"
          ></img>
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div class="card-footer">2 days ago</div>
          </div>
        </div>

        <div className="card col-sm-12 col-md-10 col-lg-10 mb-3 mx-auto">
          <div class="card-header">Featured</div>
          <img
            src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            className="card-img-top"
            alt="Post Picture"
          ></img>
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div class="card-footer">2 days ago</div>
        </div>
      </div>
    </>
  );
};

export default MiddleSection;
