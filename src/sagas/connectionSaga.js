import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAddedUsers, fetchAddedUsersAPI, fetchRecommendedUsersAPI } from '../services/connectionService';
import { 
    FETCH_ADDED_USER_REQUEST,FETCH_RECOMMENDED_USER_REQUEST, fetchAddedUserSuccess, fetchAddedUserFailure, 
    fetchRecommendedUserSuccess,
    fetchRecommendedUserFailure
} from '../actions/connectionAction';

function* fetchConnectionsSaga (action) {
    try {
        const {token} = action.payload;
        const response = yield call(fetchAddedUsersAPI, token);
        yield put(fetchAddedUserSuccess(response?.data?.acceptedRequests));
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

export default function* connectionSaga() {
    yield takeEvery(FETCH_ADDED_USER_REQUEST, fetchConnectionsSaga)
    yield takeEvery(FETCH_RECOMMENDED_USER_REQUEST, fetchRecommendedUserSaga)
}