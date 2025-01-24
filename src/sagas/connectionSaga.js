import { call, put, takeEvery } from 'redux-saga/effects';
import { acceptRequestAPI, fetchAddedUsersAPI, fetchPendingRequestAPI, fetchRecommendedUsersAPI, fetchSentRequestAPI, rejectRequestAPI, removeRequestOrConnectionAPI, sendConnectionRequestAPI } from '../services/connectionService';
import { 
    FETCH_ADDED_USER_REQUEST,FETCH_RECOMMENDED_USER_REQUEST, fetchAddedUserSuccess, fetchAddedUserFailure, 
    fetchRecommendedUserSuccess,
    fetchRecommendedUserFailure,
    fetchSentSuccess,
    fetchSentFailure,
    FETCH_SENT_REQUEST_REQUEST,
    sendRequestSuccess,
    sendRequestFailure,
    SEND_REQUEST_REQUEST,
    fetchPendingRequestSuccess,
    fetchPendingRequestFailure,
    FETCH_PENDING_REQUEST_REQUEST,
    ACCEPT_REQUEST_REQUEST,
    acceptRequestSuccess,
    acceptRequestFailure,
    rejectRequestSuccess,
    rejectRequestFailure,
    REJECT_REQUEST_REQUEST,
    removeRequestSuccess,
    removeRequestFailure,
    REMOVE_REQUEST_REQUEST,
} from '../actions/connectionAction';

function* fetchConnectionsSaga (action) {
    try {
        const {token} = action.payload;
        const response = yield call(fetchAddedUsersAPI, token);
        yield put(fetchAddedUserSuccess(response?.data));
    } catch (error) {
        yield put(fetchAddedUserFailure(error));
    }
}

function* fetchRecommendedUserSaga (action) {
    try {
        const {token} = action.payload;
        const response = yield call(fetchRecommendedUsersAPI, token);
        yield put(fetchRecommendedUserSuccess(response?.data?.availableUsers));
    } catch (error) {
        yield put(fetchRecommendedUserFailure(error));
    }
}

function* sendConnectionRequestSaga (action) {
    try {
        const response = yield call(sendConnectionRequestAPI, action.payload);
        yield put(sendRequestSuccess(response.data?.sendRequest));
    } catch (error) {
        yield put(sendRequestFailure(error));
    }
}

function* fetchSentRequestSaga (action) {
    try {
        const {token} = action.payload;
        const response = yield call(fetchSentRequestAPI, token);
        yield put(fetchSentSuccess(response.data?.sentRequests));
    } catch (error) {
        yield put(fetchSentFailure(error));
    }
}

function* fetchPendingRequestSaga (action) {
    try {
        const {token} = action.payload;
        const response = yield call(fetchPendingRequestAPI, token);
        yield put(fetchPendingRequestSuccess(response.data?.pendingRequests));
    } catch (error) {
        yield put(fetchPendingRequestFailure(error));
    }
}

function* acceptRequestSaga (action) {
    try {
        const {token, data} = action.payload;
        const response = yield call(acceptRequestAPI, [token, data]);
        yield put(acceptRequestSuccess(response.data?.acceptedRequests));
    } catch (error) {
        yield put(acceptRequestFailure(error));
    }
}

function* rejectRequestSaga (action) {
    try {
        const {token, data} = action.payload;
        const response = yield call(rejectRequestAPI, [token, data]);
        yield put(rejectRequestSuccess(response?.data?.removedUser));
    } catch (error) {
        yield put(rejectRequestFailure(error));
    }
}

function* removeRequestOrConnectionSaga (action) {
    try {
        const {token, data} = action.payload;
        const response = yield call(removeRequestOrConnectionAPI, [token, data]);
        yield put(removeRequestSuccess(response.data?.removedUser));
    } catch (error) {
        yield put(removeRequestFailure(error));
    }
}

export default function* connectionSaga() {
    yield takeEvery(FETCH_ADDED_USER_REQUEST, fetchConnectionsSaga);
    yield takeEvery(FETCH_RECOMMENDED_USER_REQUEST, fetchRecommendedUserSaga);
    yield takeEvery(FETCH_SENT_REQUEST_REQUEST, fetchSentRequestSaga);
    yield takeEvery(SEND_REQUEST_REQUEST, sendConnectionRequestSaga);
    yield takeEvery(FETCH_PENDING_REQUEST_REQUEST, fetchPendingRequestSaga);
    yield takeEvery(ACCEPT_REQUEST_REQUEST, acceptRequestSaga);
    yield takeEvery(REJECT_REQUEST_REQUEST, rejectRequestSaga);
    yield takeEvery(REMOVE_REQUEST_REQUEST, removeRequestOrConnectionSaga);
}