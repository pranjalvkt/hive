export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE';

export const getUserRequest = (token) => ({
  type: GET_USER_REQUEST,
  payload: {token},
});

export const getUserSuccess = (userData) => ({
  type: GET_USER_SUCCESS,
  payload: userData,
});

export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const updateUserRequest = (userData) => ({
  type: UPDATE_USER_REQUEST,
  payload: userData,
});

export const updateUserSuccess = (userData) => ({
  type: UPDATE_USER_SUCCESS,
  payload: userData,
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const searchUserRequest = (userData) => {  
  return {
    type: SEARCH_USER_REQUEST,
    payload: userData,
  }
};
export const searchUserSuccess = (userData)=> ({
  type: SEARCH_USER_SUCCESS,
  payload: userData,
});
export const searchUserFailure = (error) => ({
  type: SEARCH_USER_FAILURE,
  payload: error,
});