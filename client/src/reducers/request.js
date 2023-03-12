import {
  START_FOllOW_UNFOLLOW_LOADING,
  END_FOllOW_UNFOLLOW_LOADING,
  SEND_FOllOW_REQUEST,
  SEND_UNFOllOW_REQUEST,
  REMOVE_FOLLOWER,
} from "../constants/actionTypes";

const initState = {
  followRequest: {},
  unFollowRequest: {},
  removedFollower: {},
  isFollowUnFollowRequestLoading: true,
};
export default (state = initState, action) => {
  switch (action.type) {
    case START_FOllOW_UNFOLLOW_LOADING:
      return { ...state, isFollowUnFollowRequestLoading: true };
    case END_FOllOW_UNFOLLOW_LOADING:
      return { ...state, isFollowUnFollowRequestLoading: false };
    case SEND_FOllOW_REQUEST:
      return {
        ...state,
        followRequest: action.payload.data,
      };
    case SEND_UNFOllOW_REQUEST:
      return {
        ...state,
        unFollowRequest: action.payload.data,
      };
    case REMOVE_FOLLOWER:
      return {
        ...state,
        removedFollower: action.payload.data,
      };
    default:
      return state;
  }
};
