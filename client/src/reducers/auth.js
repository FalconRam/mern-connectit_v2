import Cookies from "js-cookie";
import {
  AUTH,
  INITIATE_RESET,
  RE_INITIATE_RESET,
  // FAILED_INITIATE_RESET,
  LOGOUT,
} from "../constants/actionTypes";

const authReducer = (
  state = {
    authData: null,
    emailInitiated: false,
    emailIdSent: "",
    emailReInitiated: false,
    isEmailInitiated: false,
  },
  action
) => {
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
    case INITIATE_RESET:
      return {
        ...state,
        emailInitiated: true,
        emailIdSent: action.data.data.email,
      };
    case RE_INITIATE_RESET:
      return {
        ...state,
        emailReInitiated: true,
        emailIdSent: action.data.data.email,
      };
    // case FAILED_INITIATE_RESET:
    //   return {
    //     ...state,
    //     isEmailInitiated: true,
    //     emailIdSent: action.payload.email,
    //   };
    case LOGOUT:
      localStorage.clear();
      Cookies.remove("userToken");
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
