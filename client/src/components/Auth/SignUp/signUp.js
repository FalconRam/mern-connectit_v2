import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../actions/auth";
import { findSigninFormErrors } from "../../../errorHandling/authFormEH";

import "./signUp.css";

const SignUp = ({ isLogin, setIsLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [showFormError, setShowFormError] = useState(false);
  const [signInData, setsignInData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    country: "",
  });

  let clearForm = () => {
    setsignInData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",
      country: "",
    });
  };

  const setField = (field, value) => {
    setsignInData({
      ...signInData,
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

    const newErrors = findSigninFormErrors(signInData);
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
      setShowFormError(true);
    } else {
      // No errors!
      // step : 1 - dispatching the action ; check step to in actions/auth
      dispatch(signUp(signInData, history));
      clearForm();
    }
  };

  const switchMode = () => {
    clearForm();
    setIsLogin(!isLogin);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="col-sm-10 col-md-8 col-lg-5 mx-auto py-4 p-3 bg-white border rounded border-primary">
        <p className="h3 text-center signIcon fw-bold">
          <i className="bi bi-box-arrow-in-right me-2" />
          SignIn
        </p>
        <form className="">
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <label htmlFor="exampleInputFirstName1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="First name"
                aria-label="First name"
                onChange={(e) => setField("firstName", e.target.value)}
                required
              ></input>
              {showFormError && <p className="formError">{errors.firstName}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="exampleInputLastName1" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Last name"
                aria-label="Last name"
                onChange={(e) => setField("lastName", e.target.value)}
                required
              ></input>
              {showFormError && <p className="formError">{errors.lastName}</p>}
            </div>
            <div className="col-12 col-md-62">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Email"
                aria-label="Email"
                onChange={(e) => setField("email", e.target.value)}
                required
              ></input>
              {showFormError && <p className="formError">{errors.email}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="exampleInputCity1" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="City"
                aria-label="City"
                onChange={(e) => setField("city", e.target.value)}
                required
              ></input>
              {showFormError && <p className="formError">{errors.city}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Country"
                aria-label="Country"
                onChange={(e) => setField("country", e.target.value)}
                required
              ></input>
              {showFormError && <p className="formError">{errors.country}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
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
              {showFormError && <p className="formError">{errors.password}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label
                htmlFor="exampleInputConfirmPassword1"
                className="form-label"
              >
                Confirm Password
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control form-control-sm form-control-password"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  onChange={(e) => setField("confirmPassword", e.target.value)}
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
            <button
              type="submit"
              className="btn btn-primary d-grid col-sm-12 col-md-5 col-lg-4 mx-auto mt-3"
              onClick={handleSubmit}
            >
              Sigin
            </button>
            <div className="d-flex flex-column flex-md-row justify-content-center ">
              <button onClick={switchMode} className="p-0 mt-3 switchButton">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
