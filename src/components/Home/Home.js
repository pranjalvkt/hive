import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import PostList from "./PostList";
import './Home.css'
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState(user?.user_name);

  const fetchUserDetails = () => {
    setUserName(user?.user_name);
  };
  
  useEffect(() => {
    if (user) {
      fetchUserDetails(); // Only fetch profile after user data is available
    }
  }, [user]);

  return (
    <div className="home-container">
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <span className="loading-text">Loading your Hive...</span>
        </div>
      ) : (
        <div className="welcome-message">
          <h2 className="welcome-msg">Welcome back, {userName}!</h2>
        </div>
        
      )}
      <PostList/>
    </div>
  );
};

export default Home;
