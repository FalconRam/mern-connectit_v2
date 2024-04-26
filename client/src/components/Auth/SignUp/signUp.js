import React, { useState, useRef } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../actions/auth";
import { findSigninFormErrors } from "../../../errorHandling/authFormEH";
import LoaderMini from "../../Shared/utils/loaderMini";

import "./signUp.css";

const SignUp = ({
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [showFormError, setShowFormError] = useState(false);

  let firstName = useRef("");
  let lastName = useRef("");
  let email = useRef("");
  let password = useRef("");
  let confirmPassword = useRef("");
  let city = useRef("");
  let country = useRef("");

  let clearForm = () => {
    firstName.current.value = "";
    lastName.current.value = "";
    email.current.value = "";
    password.current.value = "";
    confirmPassword.current.value = "";
    city.current.value = "";
    country.current.value = "";
  };

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
    let signInData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
      city: city.current.value,
      country: country.current.value,
    };
    const newErrors = findSigninFormErrors(signInData);
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
      await dispatch(signUp(signInData, history));
      clearForm();
      setIsAuth(!isAuth);
      setIsLoading(!isLoading);
      setIsLoginLoading(!isLoginLoading);
    }
  };

  const switchMode = () => {
    clearForm();
    setIsLogin(!isLogin);
    const urlParams = new URLSearchParams(window.location.search);
    const redirectURL = urlParams.get("redirectURL");
    if (window.location.search.includes("redirectURL")) {
      console.log(`/auth?redirectURL=${redirectURL}`);
      history.push(`/auth?redirectURL=${redirectURL}`);
    } else history.push("/auth");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="col-sm-10 col-md-8 col-lg-5 mx-auto py-4 p-3 bg-white border rounded">
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
                ref={firstName}
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
                ref={lastName}
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
                ref={email}
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
                ref={city}
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
                ref={country}
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
                  ref={confirmPassword}
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
            {isLoading ? (
              <button className="btn btn-primary d-grid col-sm-12 col-md-5 col-lg-4 mx-auto mt-3">
                <LoaderMini />
              </button>
            ) : (
              <button
                disabled={isLoginLoading}
                type="submit"
                className="btn btn-primary d-grid col-sm-12 col-md-5 col-lg-4 mx-auto mt-3"
                onClick={handleSubmit}
              >
                SignIn
              </button>
            )}

            <div className="d-flex flex-column flex-md-row justify-content-center ">
              <button onClick={switchMode} className="p-0 mt-3 switchButton">
                {isLogin ? "Still no Account?" : "Already have an account?"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
