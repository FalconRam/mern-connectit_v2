import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/";
import { useQuery } from "../../hooks";
import { reportPasswordRequest, validateResetId } from "../../actions/auth";
import { toast } from "react-toastify";

import LoaderHOC from "../../components/Shared/utils/loaderHOC";
import ValidateLink from "../../components/Shared/utils/validateLink";
import RetryPasswordReport from "../../components/ForgotPassword/RetryPasswordReport";
import ReportSuccess from "../../components/ForgotPassword/ReportSuccess";

const ReportPasswordRequest = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isReportSuccess, setIsReportSuccess] = useState(true);

  const [query] = useQuery();
  const resetId = query.get("resetId");

  async function validateResetIdFun() {
    if (resetId) {
      setIsLoading(true);
      const res = await dispatch(validateResetId(resetId, history, true));
      setIsValid(res);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Something went wrong, Please try again!");
      setIsValid(false);
    }
  }
  useEffect(() => {
    validateResetIdFun();
    dispatch(reportPasswordRequest(resetId));
  }, [resetId]);

  const handleRetry = async () => {
    await validateResetIdFun();
    const reportSuccess = await dispatch(reportPasswordRequest(resetId));
    setIsReportSuccess(reportSuccess);
  };

  useEffect(() => {
    if (!isReportSuccess) history.push(`/report-password?resetId=${resetId}`);
  }, [isReportSuccess]);

  if (!resetId) {
    history.push("/");
    return null;
  }

  if (!isValid) {
    return <RetryPasswordReport handleRetry={handleRetry} />;
  }
  const LoaderWithValidate = LoaderHOC(ValidateLink);
  return (
    <div className="">
      {isLoading ? (
        <LoaderWithValidate customText={"link"} />
      ) : (
        <>
          <ReportSuccess history={history} />
        </>
      )}
    </div>
  );
};

export default ReportPasswordRequest;
