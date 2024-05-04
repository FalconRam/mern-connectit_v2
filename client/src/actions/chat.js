import * as api from "../api";
import {
  START_FETCH_USERS_BY_SEARCH_LOADING,
  END_FETCH_USERS_BY_SEARCH_LOADING,
  FETCH_USERS_BY_SEARCH,
} from "../constants/actionTypes";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// action creators
export const getUsersBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: START_FETCH_USERS_BY_SEARCH_LOADING });

    const { data } = await api.fetchUsersBySearch(search);
    dispatch({ type: FETCH_USERS_BY_SEARCH, payload: data.data });
    dispatch({ type: END_FETCH_USERS_BY_SEARCH_LOADING });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({ type: END_FETCH_USERS_BY_SEARCH_LOADING });
    toast.error("Something went wrong!");
  }
};
