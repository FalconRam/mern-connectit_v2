import * as api from "../api";
import {
  AUTH,
  INITIATE_RESET,
  RE_INITIATE_RESET,
  FAILED_INITIATE_RESET,
} from "../constants/actionTypes";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

// action creators
export const signUp = (formData, history) => async (dispatch) => {
  try {
    // create user
    const { data } = await api.signUp(formData); // step : 2 - call to api and server db returns the data ; step : 3 check in api/index
    toast.success(`Welcome ${data.data.name.slice(0, 3)}..!`);
    // Save token in a cookie
    Cookies.set("userToken", data.accessToken, {
      sameSite: "None",
      secure: true,
    });
    // step : 4 disptach action type and data to reducers and it retuns something
    const profileData = await api.fetchProfileDetails(
      data.data.id,
      data.data.accessToken
    );
    let userData = { loginData: data, profileData: profileData.data.data };
    dispatch({ type: AUTH, userData });
    history.push("/feeds");
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const logIn = (formData, history) => async (dispatch) => {
  try {
    // login user
    const { data } = await api.logIn(formData);
    toast.success(`Welcome ${data.data.name.slice(0, 3)}..!`);
    // Save token in a cookie
    Cookies.set("userToken", data.accessToken, {
      sameSite: "None",
      secure: true,
    });
    const profileData = await api.fetchProfileDetails(
      data.data.id,
      data.data.accessToken
    );
    let userData = { loginData: data, profileData: profileData.data.data };
    dispatch({ type: AUTH, userData });

    history.push("/feeds");
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const initiatePasswordReset =
  (email, resend = false) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${api.URL}user/initiate-resetPassword`,
        email
      );
      // console.log(data);
      if (!resend) dispatch({ type: INITIATE_RESET, data });
      else dispatch({ type: RE_INITIATE_RESET, data });
      toast.success(data.message);
      return true;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      // dispatch({ type: FAILED_INITIATE_RESET, payload: email });
      return false;
    }
  };

export const validateResetId =
  (resetId, history, isReport = false) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${api.URL}user/validate-resetLink?resetId=${resetId}`
      );
      // console.log(data.data.valid);
      if (!data.data.valid && !isReport) {
        history.push("/reset-account");
        toast.error("Invalid Link, Please try again!");
      }
      if (!data.data.valid && isReport) {
        toast.error("Invalid Link, Please try again!");
      }
      return data.data.valid;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      history.push("/reset-account");
      toast.error("Invalid Link, Please try again!");
    }
  };

export const confirmResetPassword = (payload, history) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${api.URL}user/resetPassword`, payload);
    if (data.status) {
      history.push("/auth");
      toast.success(`${data.message}, Login now.`);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error("Error Occured, Please try again!");
  }
};

export const reportPasswordRequest = (resetId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${api.URL}user/reportPassword`, {
      resetId,
    });
    return data.data.valid;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    // toast.error("Error Occured, Please try again!");
    return false;
  }
};
