export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const FETCH_POST_REQUEST = "FETCH_POST_REQUEST";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";


export const createPostRequest = (postContent) => ({
  type: CREATE_POST_REQUEST,
  payload: postContent,
});

export const createPostSuccess = (posts)=> ({
  type: CREATE_POST_SUCCESS,
  payload: posts,
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

export const fetchPostsRequest = (token) => ({
  type: FETCH_POST_REQUEST,
  payload: token,
});

export const fetchPostsSuccess = (posts)=> ({
  type: FETCH_POST_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POST_FAILURE,
  payload: error,
});

export const deletePostsRequest = (id) => ({
  type: DELETE_POST_REQUEST,
  payload: id,
});

export const deletePostsSuccess = (id)=> ({
  type: DELETE_POST_SUCCESS,
  payload: id,
});

export const deletePostsFailure = (error) => ({
  type: DELETE_POST_FAILURE,
  payload: error,
});