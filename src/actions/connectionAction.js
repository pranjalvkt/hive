export const FETCH_ADDED_USER_REQUEST = "FETCH_ADDED_USER_REQUEST";
export const FETCH_ADDED_USER_SUCCESS = "FETCH_ADDED_USER_SUCCESS";
export const FETCH_ADDED_USER_FAILURE = "FETCH_ADDED_USER_FAILURE";


export const FETCH_RECOMMENDED_USER_REQUEST = "FETCH_RECOMMENDED_USER_REQUEST";
export const FETCH_RECOMMENDED_USER_SUCCESS = "FETCH_RECOMMENDED_USER_SUCCESS";
export const FETCH_RECOMMENDED_USER_FAILURE = "FETCH_RECOMMENDED_USER_FAILURE";

export const fetchAddedUserRequest = (token) => ({
    type: FETCH_ADDED_USER_REQUEST,
    payload: token,
});

export const fetchAddedUserSuccess = (connections) => ({
    type: FETCH_ADDED_USER_SUCCESS,
    payload: connections,
});

export const fetchAddedUserFailure = (error) => ({
    type: FETCH_ADDED_USER_SUCCESS,
    payload: error,
});

export const fetchRecommendedUserRequest = (token) => ({
    type: FETCH_RECOMMENDED_USER_REQUEST,
    payload: token,
});

export const fetchRecommendedUserSuccess = (recommendations) => ({
    type: FETCH_RECOMMENDED_USER_SUCCESS,
    payload: recommendations,
});

export const fetchRecommendedUserFailure = (error) => ({
    type: FETCH_RECOMMENDED_USER_FAILURE,
    payload: error,
});