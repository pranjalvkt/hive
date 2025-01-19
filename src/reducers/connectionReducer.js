import { 
    FETCH_ADDED_USER_FAILURE, FETCH_ADDED_USER_REQUEST, FETCH_ADDED_USER_SUCCESS, FETCH_RECOMMENDED_USER_FAILURE, FETCH_RECOMMENDED_USER_REQUEST, FETCH_RECOMMENDED_USER_SUCCESS 
} from "../actions/connectionAction";

const initialState = {
    connections: [],
    recommendation: [],
    loading: false,
    error: null,
};

const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADDED_USER_REQUEST:
        case FETCH_RECOMMENDED_USER_REQUEST:
            return {...state, loading: true}
        case FETCH_ADDED_USER_SUCCESS: 
            return {...state, loading: false, connections: action.payload}
        case FETCH_RECOMMENDED_USER_SUCCESS:
            return {...state, loading: false, recommendation: action.payload}
        case FETCH_ADDED_USER_FAILURE:
        case FETCH_RECOMMENDED_USER_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}
export default connectionReducer;
