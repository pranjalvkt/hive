import { call, put, takeEvery } from 'redux-saga/effects';
import { loginAPI, registerAPI } from '../services/authService';
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_FAILURE, REGISTER_FAILURE } from '../actions/authActions';
import { toast } from 'react-toastify';

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(loginAPI, { email, password });
    const { token, user_email, user_id, user_name } = response.data;

    localStorage.setItem('user', JSON.stringify({ user_email, user_id, user_name }));
    localStorage.setItem('authToken', token);
    yield put({ type: LOGIN_SUCCESS, payload: { user_email, user_id, user_name } });
    toast.success("Login successful!");
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
    toast.error("Login failed. Please try again.");
  }
}

function* registerSaga(action) {
  try {
    const { fullName, email, password } = action.payload;
    yield call(registerAPI, { fullName, email, password });
    yield put({ type: REGISTER_SUCCESS });
    toast.success("Registration successful!");
  } catch (error) {
    yield put({ type: REGISTER_FAILURE, payload: error.message });
    toast.error("Registration failed. Please try again.");
  }
}

export default function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(REGISTER_REQUEST, registerSaga);
}