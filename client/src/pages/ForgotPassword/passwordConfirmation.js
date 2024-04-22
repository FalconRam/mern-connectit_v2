import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useQuery } from "../../hooks";
import { validateResetId } from "../../actions/auth";

import ResetPassword from "../../components/ForgotPassword/ResetPassword";
import LoaderHOC from "../../components/Shared/utils/loaderHOC";
import ValidateLink from "../../components/Shared/utils/validateLink";

import { toast } from "react-toastify";

const PasswordConfirmation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [query] = useQuery();
  const resetId = query.get("resetId");

  async function validateResetIdFun() {
    // const sleep = new Promise((res) => setTimeout(() => res(), 3000));
    if (resetId) {
      setIsLoading(true);
      // await sleep.then();
      await dispatch(validateResetId(resetId, history));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error("Invalid Link, Please try again!");
      history.push("/reset-account");
    }
  }
  useEffect(() => {
    validateResetIdFun();
  }, [resetId]);

  // if (!isValid) {
  //   return 
  // }

  const LoaderWithValidate = LoaderHOC(ValidateLink);

  return (
    <>
      {isLoading ? (
        <LoaderWithValidate customText={"link"} />
      ) : (
        <ResetPassword resetId={resetId} />
      )}
    </>
  );
};

export default PasswordConfirmation;
