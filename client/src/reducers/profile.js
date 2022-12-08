import {
  START_LOADING,
  END_LOADING,
  GET_FOLLOWING_AND_FOLLOWERS_COUNT,
  GET_FOLLOWERS_PROFILE_DETAILS,
  GET_FOLLOWING_PROFILE_DETAILS,
  GET_PROFILE_DETAILS,
} from "../constants/actionTypes";

const initState = {
  count: {},
  followingProfile: [],
  followersProfile: [],
  isLoading: true,
};
export default (state = initState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case GET_FOLLOWING_AND_FOLLOWERS_COUNT:
      return {
        ...state,
        count: action.payload.data,
      };
    case GET_FOLLOWING_PROFILE_DETAILS:
      return {
        ...state,
        followingProfile: action.payload.data,
      };
    case GET_FOLLOWERS_PROFILE_DETAILS:
      return {
        ...state,
        followersProfile: action.payload.data,
      };
    case GET_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.payload.data,
      };
    default:
      return state;
  }
};
