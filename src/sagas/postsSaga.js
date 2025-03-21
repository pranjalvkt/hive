import { call, put, takeEvery } from 'redux-saga/effects';
import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE, FETCH_POST_REQUEST, fetchPostsSuccess, fetchPostsFailure, deletePostsSuccess, deletePostsFailure, DELETE_POST_REQUEST } from '../actions/postsActions';
import { createPostAPI, fetchPostAPI, deletePostAPI } from '../services/postsService';
import { toast } from 'react-toastify';

function* createPostSaga(action) {
  try {
    const response = yield call(createPostAPI, action.payload);
    yield put({ type: CREATE_POST_SUCCESS, payload: response.data });
    toast.success('Post created successfully!');
  } catch (error) {
    yield put({ type: CREATE_POST_FAILURE, payload: error.message });
    toast.error('Something went wrong. Please try again.');
  }
}

function* fetchPostsSaga(action) {
  try {
    const token = action.payload;
    const response = yield call(fetchPostAPI, token);
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error));
  }
}

function* deletePostSaga(action) {
  try {
    const id = action.payload;
    yield call(deletePostAPI, id);
    yield put(deletePostsSuccess(id));
    toast.success("Post deleted successfully!");
  } catch (error) {
    yield put(deletePostsFailure(error));
    toast.error('Something went wrong. Please try again.');
  }
}

export default function* postsSaga() {
  yield takeEvery(CREATE_POST_REQUEST, createPostSaga);
  yield takeEvery(FETCH_POST_REQUEST, fetchPostsSaga);
  yield takeEvery(DELETE_POST_REQUEST, deletePostSaga);
}