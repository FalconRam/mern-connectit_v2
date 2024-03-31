import {
  START_PROFILE_LOADING,
  END_PROFILE_LOADING,
  START_USER_PROFILE_LOADING,
  END_USER_PROFILE_LOADING,
  START_PROFILE_FOLLOWING_LIST_LOADING,
  END_PROFILE_FOLLOWING_LIST_LOADING,
  START_PROFILE_FOLLOWERS_LIST_LOADING,
  END_PROFILE_FOLLOWERS_LIST_LOADING,
  GET_FOLLOWING_AND_FOLLOWERS_COUNT,
  GET_FOLLOWERS_PROFILE_DETAILS,
  GET_FOLLOWING_PROFILE_DETAILS,
  GET_PROFILE_DETAILS,
  GET_USER_PROFILE_DETAILS,
  UPDATE_PROFILE_DETAILS,
  // UPDATE_PROFILE_PASSWORD,
  UPDATE_PROFILE_PICTURES,
} from "../constants/actionTypes";

const initState = {
  count: {},
  profileDetails: {},
  userProfileDetails: {},
  followingProfile: [],
  followersProfile: [],
  isProfileLoading: true,
  isUserProfileLoading: true,
  isProfileFollowingLoading: true,
  isProfileFollowersLoading: true,
};
export default (state = initState, action) => {
  switch (action.type) {
    case START_PROFILE_LOADING:
      return { ...state, isProfileLoading: true };
    case END_PROFILE_LOADING:
      return { ...state, isProfileLoading: false };
    case START_USER_PROFILE_LOADING:
      return { ...state, isUserProfileLoading: true };
    case END_USER_PROFILE_LOADING:
      return { ...state, isUserProfileLoading: false };
    case START_PROFILE_FOLLOWING_LIST_LOADING:
      return { ...state, isProfileFollowingLoading: true };
    case END_PROFILE_FOLLOWING_LIST_LOADING:
      return { ...state, isProfileFollowingLoading: false };
    case START_PROFILE_FOLLOWERS_LIST_LOADING:
      return { ...state, isProfileFollowersLoading: true };
    case END_PROFILE_FOLLOWERS_LIST_LOADING:
      return { ...state, isProfileFollowersLoading: false };
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
    case GET_USER_PROFILE_DETAILS:
      return {
        ...state,
        userProfileDetails: action.payload.data,
      };
    case GET_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.payload.data,
      };
    case UPDATE_PROFILE_DETAILS:
      return {
        ...state,
        userProfileDetails:
          state.userProfileDetails.userDetails._id ===
          action.payload.data.userDetails._id
            ? action.payload.data
            : state.userProfileDetails.userDetails,
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
        userProfileDetails:
          state.profileDetails.userDetails._id ===
          action.payload.data.userDetails._id
            ? action.payload.data
            : state.profileDetails.userDetails,
      };
    default:
      return state;
  }
};
