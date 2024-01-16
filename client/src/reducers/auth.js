import Cookies from "js-cookie";
import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...action?.data.data,
          accessToken: action?.data.accessToken,
          refreshToken: action?.data.refreshToken,
        })
      );
      return {
        ...state,
        authData: action?.data,
        loading: false,
        errors: null,
      };
    case LOGOUT:
      localStorage.clear();
      Cookies.remove("userToken");
      window.location.href = "/auth";
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
