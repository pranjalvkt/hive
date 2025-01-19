import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { 
  loginAPI, registerAPI, userDetailsAPI, updateUserDetailsAPI 
} from '../services/authService';
import { 
  LOGIN_REQUEST, REGISTER_REQUEST, GET_USER_REQUEST, UPDATE_USER_REQUEST, 
  loginSuccess, loginFailure, 
  registerSuccess, registerFailure,
  getUserSuccess, getUserFailure,
  updateUserSuccess, updateUserFailure
} from '../actions/authActions';

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(loginAPI, { email, password });
    const { token, user_email, user_id, user_name } = response.data;

    localStorage.setItem('authToken', token);

    yield put(loginSuccess({ user_email, user_id, user_name }));
    toast.success("Login successful!");
  } catch (error) {
    yield put(loginFailure(error.message));
    toast.error("Login failed. Please try again.");
  }
}

function* registerSaga(action) {
  try {
    const { fullName, email, password } = action.payload;
    yield call(registerAPI, { fullName, email, password });
    yield put(registerSuccess());
    toast.success("Registration successful!");
  } catch (error) {
    yield put(registerFailure(error.message));
    toast.error("Registration failed. Please try again.");
  }
}

function* getUserSaga(action) {
  try {
    const {token} = action.payload;
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

export default function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(REGISTER_REQUEST, registerSaga);
  yield takeEvery(GET_USER_REQUEST, getUserSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
}