import {CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from "../actions/postsActions";

const initialState = {
    posts: [],
    loading: false,
    error: null,
  };
  
  const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_POST_REQUEST:
        return { ...state, loading: true };
      case CREATE_POST_SUCCESS:
        return { ...state, loading: false, posts: [...state.posts, action.payload] };
      case CREATE_POST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default postsReducer;
  