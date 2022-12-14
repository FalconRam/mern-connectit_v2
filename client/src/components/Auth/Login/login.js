import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../../../actions/auth";
import { findLoginFormErrors } from "../../../errorHandling/authFormEH";

import "./login.css";

const LogIn = ({ isLogin, setIsLogin, isLoginLoading, setIsLoginLoading }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showFormError, setShowFormError] = useState(false);
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });

  let clearForm = () => {
    setLoginCred({
      email: "",
      password: "",
    });
  };

  const setField = (field, value) => {
    setLoginCred({
      ...loginCred,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findLoginFormErrors(loginCred);
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
      setShowFormError(true);
    } else {
      setIsLoginLoading(!isLoginLoading);
      // No errors!
      // step : 1 - dispatching the action ; check step to in actions/auth
      dispatch(logIn(loginCred, history));
      clearForm();
      setIsLoginLoading(!isLoginLoading);
    }
  };

  const switchMode = () => {
    clearForm();
    setIsLogin(!isLogin);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container bg-white col-sm-10 col-md-7 col-lg-5">
        <div className="row justify-content-center">
          <div className="border rounded p-5 border-primary">
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
              <button
                disabled={isLoginLoading}
                type="submit"
                className="btn btn-primary d-grid col-sm-12 col-md-5 col-lg-4 mx-auto"
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>
            <div className="d-flex flex-column flex-md-row justify-content-between ">
              <button onClick={switchMode} className="p-0 mt-3 switchButton">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account? Sign In"}
              </button>
              <button className="p-0 mt-3 switchButton">
                {isLogin && "Forgot Password?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
