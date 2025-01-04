import {
  FETCH_HOME_FEED_REQUEST,
  FETCH_HOME_FEED_FAILURE,
  FETCH_HOME_FEED_SUCCESS,
} from "../actions/homeActions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_FEED_REQUEST:
      return { ...state, loading: true };
    case FETCH_HOME_FEED_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case FETCH_HOME_FEED_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
