import React from "react";
import { useHistory } from "react-router-dom";

import two_people from "../../assets/two-people.png";

import LoaderMini from "../Shared/utils/loaderMini";
import { useTestAccountLogin } from "../../hooks";

const LandingComponent = () => {
  const history = useHistory();
  const [isLoadingWithTest, handleTestAccountLogin] = useTestAccountLogin();

  const handleLoginPage = () => {
    history.push("/auth");
  };
  const handleSignInPage = () => {
    history.push("/auth?new=true");
  };
  return (
    <div className="d-flex flex-column flex-lg-row mt-5 justify-content-around align-items-center gap-3">
      <div className="d-flex flex-column align-items-start">
        <img src={two_people} alt="two_people" className="h-auto mw-100" />
        <h2 className="fw-bold text-primary">ConnectIT</h2>
        <h4 className="fw-light">
          helps you connect and share with the people in your life.
        </h4>
      </div>
      <div className="shadow p-3 bg-body-tertiary rounded">
        <div className="d-flex flex-column gap-3 p-3">
          <div
            className="d-flex align-items-center gap-3 mb-2"
            onClick={handleLoginPage}
          >
            <button className="btn btn-sm btn-primary text-wrap">
              Continue Connecting!..
            </button>
            <p className="mb-0 text-muted d-none d-md-block p-like">
              Login to your Account
            </p>
          </div>
          <button
            className="btn btn-md btn-success fw-medium"
            onClick={handleSignInPage}
          >
            Create an Account
          </button>
          {/* Test Account Login Button */}
          {isLoadingWithTest ? (
            <div className="d-flex justify-content-center mt-2 switchButton">
              <LoaderMini />
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <button
                disabled={isLoadingWithTest}
                type="submit"
                className="p-0 switchButton"
                onClick={handleTestAccountLogin}
              >
                Explore with Test Account?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingComponent;
