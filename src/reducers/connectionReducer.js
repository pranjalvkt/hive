import { 
    ACCEPT_REQUEST_FAILURE,
    ACCEPT_REQUEST_REQUEST,
    ACCEPT_REQUEST_SUCCESS,

    FETCH_ADDED_USER_FAILURE, 
    FETCH_ADDED_USER_REQUEST, 
    FETCH_ADDED_USER_SUCCESS, 
    
    FETCH_PENDING_REQUEST_FAILURE, 
    FETCH_PENDING_REQUEST_REQUEST, 
    FETCH_PENDING_REQUEST_SUCCESS, 
    
    FETCH_RECOMMENDED_USER_FAILURE, 
    FETCH_RECOMMENDED_USER_REQUEST, 
    FETCH_RECOMMENDED_USER_SUCCESS, 

    FETCH_SENT_REQUEST_FAILURE, 
    FETCH_SENT_REQUEST_REQUEST,
    FETCH_SENT_REQUEST_SUCCESS,

    REJECT_REQUEST_FAILURE,
    REJECT_REQUEST_REQUEST,
    REJECT_REQUEST_SUCCESS,

    REMOVE_REQUEST_FAILURE,
    REMOVE_REQUEST_REQUEST,
    REMOVE_REQUEST_SUCCESS,

    SEND_REQUEST_FAILURE,
    SEND_REQUEST_REQUEST,
    SEND_REQUEST_SUCCESS
} from "../actions/connectionAction";

const initialState = {
    connections: [],
    recommendation: [],
    sentRequest: [],
    pendingRequest: [],
    loading: false,
    error: null,
};

const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADDED_USER_REQUEST:
        case FETCH_RECOMMENDED_USER_REQUEST:
        case FETCH_SENT_REQUEST_REQUEST:
        case FETCH_PENDING_REQUEST_REQUEST:
        case SEND_REQUEST_REQUEST:
        case ACCEPT_REQUEST_REQUEST:
        case REJECT_REQUEST_REQUEST:
        case REMOVE_REQUEST_REQUEST:
            return {...state, loading: true}
        case FETCH_ADDED_USER_SUCCESS: 
            return {...state, loading: false, connections: action.payload}
        case FETCH_RECOMMENDED_USER_SUCCESS:
            return {...state, loading: false, recommendation: action.payload}
        case FETCH_SENT_REQUEST_SUCCESS:
            return {...state, loading: false, sentRequest: action.payload}
        case FETCH_PENDING_REQUEST_SUCCESS:
            return {...state, loading: false, pendingRequest: action.payload}
        case SEND_REQUEST_SUCCESS: {
            const sendRequest = action.payload;
            return {
                ...state, 
                loading: false, 
                sentRequest: [...state.sentRequest, sendRequest],
                recommendation: state.recommendation.filter(
                    (friend) => friend._id !== sendRequest.receiver?._id
                ),
            }
        }
        case ACCEPT_REQUEST_SUCCESS: {
            const acceptedRequest = action.payload;
            return {
                ...state, 
                loading: false,
                connections: [...state.connections, acceptedRequest],
                pendingRequest: state.pendingRequest.filter(
                    (friend) => friend.sender._id !== acceptedRequest.user?._id
                ),
            }
        }
        case REJECT_REQUEST_SUCCESS: {
            const removedUser = action.payload;
            return { 
                ...state, 
                loading: false,
                pendingRequest: state.pendingRequest.filter(
                    (friend) => friend.sender._id !== removedUser._id
                ),
                recommendation: [...state.recommendation, removedUser]
            }
        }
        case REMOVE_REQUEST_SUCCESS: {
            const removedUser = action.payload;
            return {
                ...state, 
                loading: false,
                connections: state.connections.filter(
                    (friend) => friend.user._id !== removedUser._id
                ),
                sentRequest: state.sentRequest.filter(
                    (friend) => friend.receiver._id !== removedUser._id
                ),
                recommendation: [...state.recommendation, removedUser],
            }
        }
        case FETCH_ADDED_USER_FAILURE:
        case FETCH_RECOMMENDED_USER_FAILURE:
        case FETCH_PENDING_REQUEST_FAILURE:
        case FETCH_SENT_REQUEST_FAILURE:
        case SEND_REQUEST_FAILURE:
        case ACCEPT_REQUEST_FAILURE:
        case REJECT_REQUEST_FAILURE:
        case REMOVE_REQUEST_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}
export default connectionReducer;
