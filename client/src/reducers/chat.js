import {
  START_FETCH_USERS_BY_SEARCH_LOADING,
  END_FETCH_USERS_BY_SEARCH_LOADING,
  FETCH_USERS_BY_SEARCH,
} from "../constants/actionTypes";

const initialState = {
  users: {},
  isFetchUserSearchLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH_USERS_BY_SEARCH_LOADING:
      return { ...state, isFetchUserSearchLoading: true };
    case END_FETCH_USERS_BY_SEARCH_LOADING:
      return { ...state, isFetchUserSearchLoading: false };
    case FETCH_USERS_BY_SEARCH:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
