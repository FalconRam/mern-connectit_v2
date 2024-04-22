import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import reset_password_img from "../../assets/reset-password.png";
import LoaderMini from "../Shared/utils/loaderMini";

import { findPasswordResetFormErrors } from "../../errorHandling/authFormEH";
import { confirmResetPassword } from "../../actions/auth";

const ResetPassword = ({ resetId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [showFormError, setShowFormError] = useState(false);
  let password = useRef("");
  let confirmPassword = useRef("");

  // Check and see if errors exist, and remove them from the error object:
  const setField = (field, value) => {
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let passwordData = {
      newPassword: password.current.value,
      confirmPassword: confirmPassword.current.value,
    };
    const newErrors = findPasswordResetFormErrors(passwordData);
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
      setShowFormError(true);
    } else {
      setIsLoading(true);
      // No errors!
      const payload = { ...passwordData, resetId };
      await dispatch(confirmResetPassword(payload, history));
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="container customMargin bg-white col-sm-10 col-md-7 col-lg-5">
      <div className="row justify-content-center">
        <div className="border rounded p-5">
          <>
            <p className="h3 text-center loginIcon fw-bold mb-4">
              <img src={reset_password_img} className="me-2 reset-img" />
              Reset Password
            </p>

            <form>
              <div className="col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  New Password
                </label>
                <div className="input-group">
                  <input
                    ref={password}
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-sm form-control-password"
                    placeholder="Password"
                    aria-label="Password"
                    onChange={(e) => setField("password", e.target.value)}
                    required
                  ></input>
                  <span
                    className="input-group-text eyeButton"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-fill bi-eye-fill-size"></i>
                    ) : (
                      <i className="bi bi-eye-slash-fill bi-eye-fill-size"></i>
                    )}
                  </span>
                </div>
                {showFormError && (
                  <p className="formError">{errors.password}</p>
                )}
              </div>
              <div className="col-12 mt-2">
                <label
                  htmlFor="exampleInputConfirmPassword1"
                  className="form-label"
                >
                  Confirm Password
                </label>
                <div className="input-group">
                  <input
                    ref={confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control form-control-sm form-control-password"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    onChange={(e) =>
                      setField("confirmPassword", e.target.value)
                    }
                    required
                  ></input>
                  <span
                    className="input-group-text eyeButton"
                    onClick={handleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <i className="bi bi-eye-fill bi-eye-fill-size"></i>
                    ) : (
                      <i className="bi bi-eye-slash-fill bi-eye-fill-size"></i>
                    )}
                  </span>
                </div>
                {showFormError && (
                  <p className="formError">{errors.confirmPassword}</p>
                )}
              </div>
              {isLoading ? (
                <button className="btn btn-primary d-grid col-12 col-md-5 col-lg-4 mx-auto">
                  <LoaderMini />
                </button>
              ) : (
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary d-grid col-12 col-md-5 col-lg-4 mt-3 mx-auto"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              )}
            </form>
          </>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
