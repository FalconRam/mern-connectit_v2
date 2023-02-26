import {
  FETCH_ALL_POSTS,
  FETCH_POSTS_BY_FOLLOWING,
  FETCH_BY_SEARCH,
  FETCH_POST_BY_ID,
  FETCH_POST_BY_USER,
  CREATE_POST,
  UPDATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  DELETE_USER_POST,
  START_POST_LOADING,
  END_POST_LOADING,
  COMMENT_POST_WITH_USER_DETAILS,
} from "../constants/actionTypes";

export default (
  state = { posts: [], post: {}, userPosts: [], isPostLoading: true },
  action
) => {
  switch (action.type) {
    case START_POST_LOADING:
      return { ...state, isPostLoading: true };
    case END_POST_LOADING:
      return { ...state, isPostLoading: false };
    case FETCH_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POSTS_BY_FOLLOWING:
      return {
        ...state,
        posts: action.payload.data,
      };
    case FETCH_POST_BY_ID:
      return { ...state, post: action.payload.data };
    case FETCH_POST_BY_USER:
      return { ...state, userPosts: action.payload.data };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.data._id ? action.payload.data : post
        ),
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT_POST_WITH_USER_DETAILS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // return the post that received with comment
          if (post._id === action.payload._id) return action.payload;
          // and return all other posts
          return post;
        }),
      };
    case DELETE_POST:
      // if the post._id is not equal to the action.payload in that case we are going to delete
      //  going to keep all the state expect the one where the id is equal
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case DELETE_USER_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
