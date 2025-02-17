import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { 
  loginAPI, registerAPI 
} from '../services/authService';
import { 
  LOGIN_REQUEST, REGISTER_REQUEST,
  loginSuccess, loginFailure, 
  registerSuccess, registerFailure,
} from '../actions/authActions';

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(loginAPI, { email, password });
    const { token } = response.data;

    localStorage.setItem('authToken', token);

    yield put(loginSuccess());
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

export default function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(REGISTER_REQUEST, registerSaga);
}