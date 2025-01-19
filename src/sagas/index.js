import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import postsSaga from './postsSaga';
import connectionSaga from './connectionSaga';
export default function* rootSaga() {
  yield all([
    authSaga(),
    postsSaga(),
    connectionSaga(),
  ]);
}