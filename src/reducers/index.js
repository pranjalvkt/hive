import { combineReducers } from 'redux';
import authReducer from './authReducer'; // For login and registration
import homeReducer from './homeReducer'; // For home feed
// import profileReducer from './profileReducer'; // For user profile
// import chatReducer from './chatReducer'; // For chat functionality
// import notificationReducer from './notificationReducer'; // For notifications
// import friendsReducer from './friendsReducer'; // For friend requests
import postsReducer from './postsReducer'; // For managing posts

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  // profile: profileReducer,
  // chat: chatReducer,
  // notifications: notificationReducer,
  // friends: friendsReducer,
  posts: postsReducer,
});

export default rootReducer;