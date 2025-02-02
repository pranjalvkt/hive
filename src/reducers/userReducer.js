import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILURE,
} from '../actions/userAction'

const initialState = {
  user: null,
  loading: false,
  searchLoading: false,
  error: null,
  searchResult: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loading: true };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case GET_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload.user };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SEARCH_USER_REQUEST:
      return {...state, searchLoading: true };
    case SEARCH_USER_SUCCESS: 
      return {...state, searchLoading: false, searchResult: action.payload };
    case SEARCH_USER_FAILURE:
      return {...state, searchLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;