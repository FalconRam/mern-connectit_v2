import {
  START_PROFILE_LOADING,
  END_PROFILE_LOADING,
  GET_FOLLOWING_AND_FOLLOWERS_COUNT,
  GET_FOLLOWERS_PROFILE_DETAILS,
  GET_FOLLOWING_PROFILE_DETAILS,
  GET_PROFILE_DETAILS,
  UPDATE_PROFILE_DETAILS,
  // UPDATE_PROFILE_PASSWORD,
  UPDATE_PROFILE_PICTURES,
} from "../constants/actionTypes";

const initState = {
  count: {},
  profileDetails: {},
  followingProfile: [],
  followersProfile: [],
  isProfileLoading: true,
};
export default (state = initState, action) => {
  switch (action.type) {
    case START_PROFILE_LOADING:
      return { ...state, isProfileLoading: true };
    case END_PROFILE_LOADING:
      return { ...state, isProfileLoading: false };
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
    case UPDATE_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails:
          state.profileDetails.userDetails._id ===
          action.payload.data.userDetails._id
            ? action.payload.data
            : state.profileDetails.userDetails,
      };
    // case UPDATE_PROFILE_PASSWORD:
    //   return {
    //     ...state,
    //     profileDetails:
    //       state.profileDetails.userDetails._id ===
    //       action.payload.data.userDetails._id
    //         ? action.payload.data
    //         : state.profileDetails.userDetails,
    //   };
    case UPDATE_PROFILE_PICTURES:
      return {
        ...state,
        profileDetails:
          state.profileDetails.userDetails._id ===
          action.payload.data.userDetails._id
            ? action.payload.data
            : state.profileDetails.userDetails,
      };
    default:
      return state;
  }
};
