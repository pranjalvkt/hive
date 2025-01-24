export const FETCH_ADDED_USER_REQUEST = "FETCH_ADDED_USER_REQUEST";
export const FETCH_ADDED_USER_SUCCESS = "FETCH_ADDED_USER_SUCCESS";
export const FETCH_ADDED_USER_FAILURE = "FETCH_ADDED_USER_FAILURE";

export const FETCH_RECOMMENDED_USER_REQUEST = "FETCH_RECOMMENDED_USER_REQUEST";
export const FETCH_RECOMMENDED_USER_SUCCESS = "FETCH_RECOMMENDED_USER_SUCCESS";
export const FETCH_RECOMMENDED_USER_FAILURE = "FETCH_RECOMMENDED_USER_FAILURE";

export const FETCH_SENT_REQUEST_REQUEST = "FETCH_SENT_REQUEST_REQUEST";
export const FETCH_SENT_REQUEST_SUCCESS = "FETCH_SENT_REQUEST_SUCCESS";
export const FETCH_SENT_REQUEST_FAILURE = "FETCH_SENT_REQUEST_FAILURE";

export const SEND_REQUEST_REQUEST = "SEND_REQUEST_REQUEST";
export const SEND_REQUEST_SUCCESS = "SEND_REQUEST_SUCCESS";
export const SEND_REQUEST_FAILURE = "SEND_REQUEST_FAILURE";

export const FETCH_PENDING_REQUEST_REQUEST = "FETCH_PENDING_REQUEST_REQUEST";
export const FETCH_PENDING_REQUEST_SUCCESS = "FETCH_PENDING_REQUEST_SUCCESS";
export const FETCH_PENDING_REQUEST_FAILURE = "FETCH_PENDING_REQUEST_FAILURE";

export const ACCEPT_REQUEST_REQUEST = "ACCEPT_REQUEST_REQUEST";
export const ACCEPT_REQUEST_SUCCESS = "ACCEPT_REQUEST_SUCCESS";
export const ACCEPT_REQUEST_FAILURE = "ACCEPT_REQUEST_FAILURE";

export const REJECT_REQUEST_REQUEST = "REJECT_REQUEST_REQUEST";
export const REJECT_REQUEST_SUCCESS = "REJECT_REQUEST_SUCCESS";
export const REJECT_REQUEST_FAILURE = "REJECT_REQUEST_FAILURE";

export const REMOVE_REQUEST_REQUEST = "REMOVE_REQUEST_REQUEST";
export const REMOVE_REQUEST_SUCCESS = "REMOVE_REQUEST_SUCCESS";
export const REMOVE_REQUEST_FAILURE = "REMOVE_REQUEST_FAILURE";

export const fetchAddedUserRequest = (token) => ({
    type: FETCH_ADDED_USER_REQUEST,
    payload: token,
});

export const fetchAddedUserSuccess = (connections) => ({
    type: FETCH_ADDED_USER_SUCCESS,
    payload: connections.data,
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

export const fetchSentRequestRequest = (token) => ({
    type: FETCH_SENT_REQUEST_REQUEST,
    payload: token,
});

export const fetchSentSuccess = (sentRequests) => ({    
    type: FETCH_SENT_REQUEST_SUCCESS,
    payload: sentRequests,
});

export const fetchSentFailure = (error) => ({
    type: FETCH_SENT_REQUEST_FAILURE,
    payload: error,
});

export const sendRequestRequest = (data) => ({
    type: SEND_REQUEST_REQUEST,
    payload: data,
});

export const sendRequestSuccess = (data) => ({
    type: SEND_REQUEST_SUCCESS,
    payload: data,
});

export const sendRequestFailure = (error) => ({
    type: SEND_REQUEST_FAILURE,
    payload: error,
});

export const fetchPendingRequestRequest = (data) => ({
    type: FETCH_PENDING_REQUEST_REQUEST,
    payload: data,
});

export const fetchPendingRequestSuccess = (pendingRequests) => ({
    type: FETCH_PENDING_REQUEST_SUCCESS,
    payload: pendingRequests,
});

export const fetchPendingRequestFailure = (error) => ({
    type: FETCH_PENDING_REQUEST_FAILURE,
    payload: error,
});

export const acceptRequestRequest = (data) => ({
    type: ACCEPT_REQUEST_REQUEST,
    payload: data,
});

export const acceptRequestSuccess = (data) => ({
    type: ACCEPT_REQUEST_SUCCESS,
    payload: data,
});

export const acceptRequestFailure = (error) => ({
    type: ACCEPT_REQUEST_FAILURE,
    payload: error,
});

export const rejectRequestRequest = (data) => ({
    type: REJECT_REQUEST_REQUEST,
    payload: data,
});

export const rejectRequestSuccess = (removedUser) => ({
    type: REJECT_REQUEST_SUCCESS,
    payload: removedUser,
});

export const rejectRequestFailure = (error) => ({
    type: REJECT_REQUEST_FAILURE,
    payload: error,
});

export const removeRequestRequest = (data) => ({
    type: REMOVE_REQUEST_REQUEST,
    payload: data,
});

export const removeRequestSuccess = (removedUser) => ({
    type: REMOVE_REQUEST_SUCCESS,
    payload: removedUser,
})


export const removeRequestFailure = (error) => ({
    type: REMOVE_REQUEST_FAILURE,
    payload: error,
});