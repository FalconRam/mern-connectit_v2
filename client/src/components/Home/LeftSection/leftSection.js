import React from "react";

import "./leftSection.css";

const LeftSection = () => {
  return (
    <>
      <div className="col-sm-12 col-md-3">
        <div className="col-12 col-md-12">
          <div className="card">
            <img
              src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              className="card-img-top profileBgPic"
              alt="Bg Picture"
            ></img>
            <img
              src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              className="img-thumbnail rounded-circle profilePic"
              alt="Profile Picture"
            ></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSection;
