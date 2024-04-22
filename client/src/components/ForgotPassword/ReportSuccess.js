import React from "react";
import check_img from "../../assets/check.png";

const ReportSuccess = ({ history }) => {
  return (
    <div className="min-vh-100 p-3 d-flex flex-column justify-content-center align-items-center">
      <img class="check-img" src={check_img} alt="Success-Check" />
      <p className="text-muted mt-3">
        The Request has been reported,{" "}
        <b>
          we advise you to Login and Change the Password or Use click below to
          Reset Password
        </b>
      </p>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <button
          className="btn btn-sm btn-primary login-btn"
          onClick={() => history.push("/auth")}
        >
          Login
        </button>
        <button
          className="btn btn-sm btn-success"
          onClick={() => history.push("/reset-account")}
        >
          Reset Password<i class="bi bi-arrow-right ms-2"></i>
        </button>
      </div>
    </div>
  );
};

export default ReportSuccess;
