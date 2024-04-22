import React from "react";

const RetryPasswordReport = ({ handleRetry }) => {
  return (
    <>
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center p-3">
        <div className="text-muted">
          <h4>Sorry, An error occured while processing your request</h4>
          <p className="">Please click the Report Again, by clicking below</p>
        </div>
        <button className="btn report-btn" onClick={handleRetry}>
          Report Again <i class="ms-2 bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </>
  );
};

export default RetryPasswordReport;
