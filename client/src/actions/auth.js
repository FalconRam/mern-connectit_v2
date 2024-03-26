import * as api from "../api";
import { AUTH } from "../constants/actionTypes";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getProfileDetails } from "./profile";

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
    dispatch({ type: AUTH, data });
    dispatch(getProfileDetails(data.data.id, true));
    history.push("/");
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
    dispatch({ type: AUTH, data });
    dispatch(getProfileDetails(data.data.id, true));
    history.push("/");
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
