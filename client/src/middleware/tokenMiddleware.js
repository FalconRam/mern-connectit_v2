import axios from "axios";
import Cookies from "js-cookie";

// let URL =
//   window.location.origin === process.env.REACT_APP_LOCAL_HOST_FE_URL
//     ? process.env.REACT_APP_LOCAL_HOST_BE_URL
//     : process.env.REACT_APP_PRODUCTION_BE_URL;

let localURL = "http://localhost:5000/";
let productionURL = "https://connectit-v2-api.onrender.com/";

let URL =
  window.location.origin === "http://localhost:3000" ? localURL : productionURL;

const API = axios.create({ baseURL: URL });

export const tokenMiddleware = async (req) => {
  try {
    const refreshToken = JSON.parse(
      localStorage.getItem("profile")
    ).refreshToken;
    API.interceptors.request.use(async (req) => {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).accessToken
      }`;
      return req;
    });

    const { data } = await API.post("/user/refresh-session", {
      refreshToken,
    });

    localStorage.setItem(
      "profile",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("profile")),
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      })
    );
    Cookies.set("userToken", data.data.accessToken, {
      sameSite: "None",
      secure: true,
    });
    return req;
  } catch (error) {
    console.error(error);
    return Promise.reject(error.message);
  }
};
