import {
  CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE, FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE, 
  DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
} from "../actions/postsActions";

const initialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_POST_REQUEST:
      case FETCH_POST_REQUEST:
        return { 
          ...state, 
          loading: true 
        };
      case CREATE_POST_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          posts: [...state.posts, action.payload.post] 
        };
      case FETCH_POST_SUCCESS:
        return {
          ...state, 
          loading: false, 
          posts: action.payload 
        };
      case CREATE_POST_FAILURE:
      case FETCH_POST_FAILURE:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
      case DELETE_POST_REQUEST:
        return {
          ...state, 
          loading: true
        };
      case DELETE_POST_SUCCESS:
        return {
          ...state, 
          loading: false, 
          posts: state.posts.filter((post) => post._id !== action.payload)
        }
      case DELETE_POST_FAILURE:
        return {
          ...state, 
          loading: false, 
          error: action.payload
        }
      default:
        return state;
    }
  };
  
  export default postsReducer;
  