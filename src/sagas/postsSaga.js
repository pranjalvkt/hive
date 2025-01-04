// import { call, put, takeEvery } from 'redux-saga/effects';
// import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from '../actions/postsActions';
// import { createPostAPI } from '../services/postsService';

// function* createPostSaga(action) {
//   try {
//     const response = yield call(createPostAPI, action.payload);
//     yield put({ type: CREATE_POST_SUCCESS, payload: response.data });
//   } catch (error) {
//     yield put({ type: CREATE_POST_FAILURE, payload: error.message });
//   }
// }

// export default function* postsSaga() {
//   yield takeEvery(CREATE_POST_REQUEST, createPostSaga);
// }