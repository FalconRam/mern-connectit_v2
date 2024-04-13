import Cookies from "js-cookie";
import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...action?.userData?.loginData.data, // spreading login data, since need id
          ...action?.userData?.profileData?.userDetails, // contains other information of User
          accessToken: action?.userData?.loginData.accessToken,
          refreshToken: action?.userData?.loginData.refreshToken,
        })
      );
      return {
        ...state,
        authData: action?.userData,
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
