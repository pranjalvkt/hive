import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  userDetailsAPI,
  updateUserDetailsAPI,
  searchUserAPI,
} from "../services/userService";

import {
  GET_USER_REQUEST,
  UPDATE_USER_REQUEST,
  getUserSuccess,
  getUserFailure,
  updateUserSuccess,
  updateUserFailure,
  searchUserSuccess,
  searchUserFailure,
  SEARCH_USER_REQUEST,
} from "../actions/userAction";

function* getUserSaga(action) {
  try {
    const { token } = action.payload;
    const response = yield call(userDetailsAPI, { token });
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure(error.message));
    localStorage.removeItem("authToken");
    toast.error("Something went wrong!");
  }
}

function* updateUserSaga(action) {
  try {
    const response = yield call(updateUserDetailsAPI, action.payload);
    yield put(updateUserSuccess(response.data));
    toast.success("Updated successfully.");
  } catch (error) {
    yield put(updateUserFailure(error.message));
    localStorage.removeItem("authToken");
    toast.error("Something went wrong!");
  }
}

function* searchUserSaga(action) {
  try {
    const response = yield call(searchUserAPI, action.payload);
    yield put(searchUserSuccess(response));
  } catch (error) {
    yield put(searchUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeEvery(GET_USER_REQUEST, getUserSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
  yield takeEvery(SEARCH_USER_REQUEST, searchUserSaga);
}
