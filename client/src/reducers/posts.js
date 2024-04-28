import {
  FETCH_ALL_POSTS,
  FETCH_POSTS_BY_FOLLOWING,
  FETCH_POSTS_BY_FOLLOWING_UPDATED_SAVE,
  FETCH_POSTS_BY_FOLLOWING_UPDATED_UNSAVE,
  FETCH_BY_SEARCH,
  FETCH_POST_BY_ID,
  FETCH_COMMENT_BY_POST_ID,
  FETCH_POST_BY_USER,
  CREATE_POST,
  UPDATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  LIKE_UNLIKE_COMMENT_REPLY,
  DELETE_POST,
  DELETE_USER_POST,
  START_POST_LOADING,
  END_POST_LOADING,
  COMMENT_POST_WITH_USER_DETAILS,
  SUBMIT_REPLY_TO_COMMENT_OR_REPLY,
  DELETE_POST_COMMENT,
  DELETE_POST_REPLY,
  START_FETCH_COMMENT_BY_POST_ID,
  END_FETCH_COMMENT_BY_POST_ID,
  START_FETCH_REPLIES_BY_COMMENT,
  FETCH_REPLIES_BY_COMMENT,
  END_FETCH_REPLIES_BY_COMMENT,
  SET_STATE_FOR_COMMENT_REPLY,
  SET_COMMENT_REPLY_DETAILS,
} from "../constants/actionTypes";

export default (
  state = {
    posts: [],
    post: {},
    userPosts: [],
    isPostLoading: true,
    isPostCommentsLoading: true,
    isRepliesByCommentsLoading: true,
    commentReplyState: {
      commentToPost: true,
      replyToComment: false,
      replyToReply: false,
    },
    commentReplyDetails: {
      postId: "",
      commentId: "",
      replyId: "",
    },
  },
  action
) => {
  switch (action.type) {
    case START_POST_LOADING:
      return { ...state, isPostLoading: true };
    case END_POST_LOADING:
      return { ...state, isPostLoading: false };
    case START_FETCH_COMMENT_BY_POST_ID:
      return { ...state, isPostCommentsLoading: true };
    case END_FETCH_COMMENT_BY_POST_ID:
      return { ...state, isPostCommentsLoading: false };
    case START_FETCH_REPLIES_BY_COMMENT:
      return { ...state, isRepliesByCommentsLoading: true };
    case END_FETCH_REPLIES_BY_COMMENT:
      return { ...state, isRepliesByCommentsLoading: false };
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
    case FETCH_POSTS_BY_FOLLOWING_UPDATED_SAVE:
      // console.log(action.payload);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload) {
            post.isSaved = true;
            // console.log(post);
            return post;
          } else {
            // console.log(post);
            return post;
          }
        }),
      };
    case FETCH_POSTS_BY_FOLLOWING_UPDATED_UNSAVE:
      // console.log(action.payload);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload) {
            post.isSaved = false;
            // console.log(post);
            return post;
          } else {
            // console.log(post);
            return post;
          }
        }),
      };
    case FETCH_POST_BY_ID:
      return { ...state, post: action.payload.data };
    case FETCH_COMMENT_BY_POST_ID:
      return { ...state, postComments: action.payload.data };
    case FETCH_REPLIES_BY_COMMENT:
      return { ...state, commentReplies: action.payload.data };
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
    case LIKE_UNLIKE_COMMENT_REPLY:
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
    case SUBMIT_REPLY_TO_COMMENT_OR_REPLY:
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
    // Directly update the redux state won't detect the changes
    // Below is an example for state update is not done immutably
    // case DELETE_POST_COMMENT:
    //   state.postComments.comments = state.postComments.comments.filter(
    //     (comment) => comment._id !== action.payload.commentId
    //   );
    //   return {
    //     ...state,
    //     postComments: state.postComments,
    //   };
    // Here Immutable Updates.
    // Where Instead of directly modifying state.postComments.comments,
    // you should create a new array with the filtered comments
    // and return a new state object.
    case DELETE_POST_COMMENT:
      const filteredComments = state.postComments.comments.filter(
        (comment) => comment._id !== action.payload.commentId
      );
      return {
        ...state,
        postComments: {
          ...state.postComments,
          comments: filteredComments,
        },
      };
    case DELETE_POST_REPLY:
      const filteredReplies = state.commentReplies.replyComments.filter(
        (reply) => reply._id !== action.payload.replyId
      );
      return {
        ...state,
        commentReplies: {
          ...state.commentReplies,
          replyComments: filteredReplies,
        },
      };

    case SET_STATE_FOR_COMMENT_REPLY:
      return {
        ...state,
        commentReplyState: action.payload,
      };
    case SET_COMMENT_REPLY_DETAILS:
      return {
        ...state,
        commentReplyDetails: action.payload,
      };
    default:
      return state;
  }
};
