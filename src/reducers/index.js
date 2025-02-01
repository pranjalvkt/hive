import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import connectionReducer from './connectionReducer'; 

const appReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  connection: connectionReducer,  
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;