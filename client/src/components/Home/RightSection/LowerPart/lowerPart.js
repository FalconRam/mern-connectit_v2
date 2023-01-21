import React from "react";

import "./lowerPart.css";
import logo from "../../../../assets/logo.png";

const LowerPart = () => {
  return (
    <>
      <div className="text-center mb-5">
        <div className="col">
          <ul className="footerLinks d-flex align-items-center justify-content-center gap-2  mb-1">
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Accessibility</a>
            </li>
            <li>
              <a href="">Help Center</a>
            </li>
            <li>
              <a href="">Privacy & Terms</a>
            </li>
            <li>
              <a href="">Ad Choices</a>
            </li>
            <li>
              <a href="">Advertising</a>
            </li>
            <li>
              <a href="">Business Services</a>
            </li>
            <li>
              <a href="">Get the ConnectIt app</a>
            </li>
            <li>
              <a href="">More</a>
            </li>
          </ul>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <p className="branding">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block"
            />{" "}
            ConnectIT Corporation &#169; 2023
          </p>
        </div>
      </div>
    </>
  );
};

export default LowerPart;
