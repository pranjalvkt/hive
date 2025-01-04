export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const createPostRequest = (postContent) => ({
  type: CREATE_POST_REQUEST,
  payload: postContent,
});