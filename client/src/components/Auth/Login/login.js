import React, { useState, useRef } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../../../actions/auth";
import { findLoginFormErrors } from "../../../errorHandling/authFormEH";
import LoaderMini from "../../Shared/utils/loaderMini";

// import dotenv from "dotenv";

import "./login.css";
import { useTestAccountLogin } from "../../../hooks";

// dotenv.config();

const LogIn = ({
  isLogin,
  setIsLogin,
  isLoginLoading,
  setIsLoginLoading,
  isAuth,
  setIsAuth,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showFormError, setShowFormError] = useState(false);

  const [isLoadingWithTest, handleTestAccountLogin] = useTestAccountLogin();

  const email = useRef("");
  const password = useRef("");

  let clearForm = () => {
    email.current.value = "";
    password.current.value = "";
  };

  // Check and see if errors exist, and remove them from the error object:
  const setField = (field) => {
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginCred = {
      email: email.current.value,
      password: password.current.value,
    };
    const newErrors = findLoginFormErrors(loginCred);
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
      setShowFormError(true);
    } else {
      setIsLoading(!isLoading);
      setIsLoginLoading(!isLoginLoading);
      // No errors!
      // step : 1 - dispatching the action ; check step to in actions/auth
      await dispatch(logIn(loginCred, history));
      clearForm();
      setIsAuth(!isAuth);
      setIsLoading(!isLoading);
      setIsLoginLoading(!isLoginLoading);
    }
  };

  const switchMode = () => {
    clearForm();
    setIsLogin(!isLogin);
    history.push("/auth?new=true");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleForgotPassword = () => {
    history.push("/reset-account");
  };

  return (
    <>
      <div className="container bg-white col-sm-10 col-md-7 col-lg-5">
        <div className="row justify-content-center">
          <div className="border rounded p-5">
            <p className="h3 text-center loginIcon fw-bold">
              <i className="bi bi-box-arrow-in-right me-2" />
              LogIn
            </p>

            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
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
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    ref={password}
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-sm form-control-password"
                    id="exampleInputPassword1"
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
              {isLoading ? (
                <button className="btn btn-primary d-grid col-12 col-md-5 col-lg-4 mx-auto">
                  <LoaderMini />
                </button>
              ) : (
                <button
                  disabled={isLoginLoading}
                  type="submit"
                  className="btn btn-primary d-grid col-12 col-md-5 col-lg-4 mx-auto"
                  onClick={handleSubmit}
                >
                  LogIn
                </button>
              )}
            </form>
            <div className="d-flex flex-column flex-md-row justify-content-between mt-3 gap-2">
              <button onClick={switchMode} className="p-0  switchButton">
                {isLogin
                  ? "Still no Account?"
                  : "Already have an account? Sign In"}
              </button>
              <button
                className="p-0 switchButton"
                onClick={handleForgotPassword}
              >
                {isLogin && "Forgot Password?"}
              </button>
            </div>
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
                  className="p-0 mt-2 switchButton"
                  onClick={handleTestAccountLogin}
                >
                  Explore with Test Account?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
