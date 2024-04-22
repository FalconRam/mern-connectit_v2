import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { findPasswordInitiateFormErrors } from "../../errorHandling/authFormEH";
import { initiatePasswordReset } from "../../actions/auth";

import LoaderMini from "../Shared/utils/loaderMini";
import reset_password_img from "../../assets/reset-password.png";

const ForgotPasswordComp = () => {
  const dispatch = useDispatch();
  const { emailInitiated, emailReInitiated, emailIdSent } = useSelector(
    (state) => state.auth
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showFormError, setShowFormError] = useState(false);
  const [emailSent, setEmailSent] = useState(emailInitiated);
  const [emailReSend, setEmailReSend] = useState(emailReInitiated);

  useEffect(() => {
    setEmailSent(emailInitiated);
    setEmailReSend(emailReInitiated);
  }, [emailInitiated, emailReInitiated]);
  const email = useRef();
  console.log({ emailSent, emailReSend });
  // Check and see if errors exist, and remove them from the error object:
  const setField = (field) => {
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const [timer, setTimer] = useState(30);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = findPasswordInitiateFormErrors(email.current.value);
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
      setShowFormError(true);
    } else {
      setIsLoading(true);
      // No errors!
      await dispatch(initiatePasswordReset({ email: email.current.value }));
      //   clearForm();
      setIsLoading(false);
      setEmailSent(true);
      reduceTimer();
    }
  };
  let timerInterval;
  function reduceTimer() {
    timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        // Check if timer has reached 0
        if (prevTimer > 0) {
          return prevTimer - 1; // Decrement timer by 1
        } else {
          clearInterval(timerInterval); // Stop the timer when it reaches 0
          return prevTimer; // Return current timer value (0)
        }
      });
    }, 1000);
  }

  const handleResend = async () => {
    setIsLoading(true);
    await dispatch(initiatePasswordReset({ email: emailIdSent }, true));
    setTimer(30);
    reduceTimer();
    setIsLoading(false);
  };

  return (
    <div className="container customMargin bg-white col-sm-10 col-md-7 col-lg-5">
      <div className="row justify-content-center">
        <div className="border rounded p-5">
          {!emailSent ? (
            <>
              <p className="h3 text-center loginIcon fw-bold mb-4">
                <img src={reset_password_img} className="me-2 reset-img" />
                Reset Password
              </p>

              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Your Email to Reset Password
                  </label>
                  <input
                    ref={email}
                    type="email"
                    className="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setField("email", e.target.value)}
                    required
                  ></input>
                  {showFormError && <p className="formError">{errors.email}</p>}
                </div>
                {isLoading ? (
                  <button className="btn btn-primary d-grid col-12 col-md-5 col-lg-4 mx-auto">
                    <LoaderMini />
                  </button>
                ) : (
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-primary d-grid col-12 col-md-5 col-lg-4 mx-auto"
                    onClick={handleSubmit}
                  >
                    Next
                  </button>
                )}
              </form>
            </>
          ) : (
            <>
              <div>
                <div className="text-center">
                  <i class="bi bi-check-lg text-success d-inline me-2" />
                  <h5 className="d-inline text-success fw-bold">Email Sent</h5>
                </div>
                <p className="mt-3 mb-2 postCreator">
                  The Reset link sent to your registered Email{" "}
                  <b className="text-primary">{emailIdSent}</b>
                </p>
                <span
                  onClick={handleResend}
                  className={
                    timer <= 0
                      ? "text-success eyeButton"
                      : "text-muted eyeButton"
                  }
                >
                  {timer <= 0 ? (
                    <>
                      {!isLoading ? (
                        <>
                          <p className="mb-1">
                            Resend Link
                            <i class="bi bi-arrow-repeat ms-1"></i>
                          </p>{" "}
                        </>
                      ) : (
                        <>
                          <LoaderMini />
                        </>
                      )}
                    </>
                  ) : (
                    <p className="mb-1">You can resend after {timer} seconds</p>
                  )}
                </span>
                <ul className="text-muted reset-instructions postCreator mb-0 ps-3">
                  <li>Check you Resgisted Email, Which has Reset Link.</li>
                  <li>Click on the link and Reset your Password</li>
                  <li>The Link will be active for 30 minutes</li>
                  <li>Don't share the Reset link it others</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComp;
