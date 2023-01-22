import * as api from "../api";
import { AUTH } from "../constants/actionTypes";
import Cookies from "js-cookie";

// action creators
export const signUp = (formData, history) => async (dispatch) => {
  try {
    // create user
    const { data } = await api.signUp(formData); // step : 2 - call to api and server db returns the data ; step : 3 check in api/index

    // step : 4 disptach action type and data to reducers and it retuns something
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const logIn = (formData, history) => async (dispatch) => {
  try {
    // login user
    const { data } = await api.logIn(formData);
    // Save token in a cookie
    Cookies.set("userToken", data.token);
    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
