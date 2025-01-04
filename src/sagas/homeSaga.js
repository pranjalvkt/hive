// import { call, put, takeEvery } from 'redux-saga/effects';
// import { FETCH_HOME_FEED_REQUEST, FETCH_HOME_FEED_SUCCESS, FETCH_HOME_FEED_FAILURE } from '../actions/homeActions';
// import { fetchHomeFeedAPI } from '../services/homeService';

// function* fetchHomeFeedSaga() {
//   try {
//     const response = yield call(fetchHomeFeedAPI);
//     yield put({ type: FETCH_HOME_FEED_SUCCESS, payload: response.data });
//   } catch (error) {
//     yield put({ type: FETCH_HOME_FEED_FAILURE, payload: error.message });
//   }
// }

// export default function* homeSaga() {
//   yield takeEvery(FETCH_HOME_FEED_REQUEST, fetchHomeFeedSaga);
// }