import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsReducer';
import connectionReducer from './connectionReducer'; 

// import homeReducer from './homeReducer'; // For home feed
// import profileReducer from './profileReducer'; // For user profile
// import chatReducer from './chatReducer'; // For chat functionality
// import notificationReducer from './notificationReducer'; // For notifications


// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  connection: connectionReducer,
  // home: homeReducer,
  // profile: profileReducer,
  // chat: chatReducer,
  // notifications: notificationReducer,
  // friends: friendsReducer,
  
});

export default rootReducer;