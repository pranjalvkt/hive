import React, { useState, useEffect, useCallback } from "react";

import "react-toastify/dist/ReactToastify.css";
import PostList from "./PostList";
import './Home.css'
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState(user?.user_name);

  const fetchUserDetails = useCallback(() => {
    setUserName(user?.user_name);
  }, [user]);
  
  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, user]);

  return (
    <div className="home-container">
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <span className="loading-text">Loading your Hive...</span>
        </div>
      ) : (
        <div className="welcome-message">
          <h2 className="welcome-msg">Welcome {userName}!</h2>
        </div>
      )}
      <PostList/>
    </div>
  );
};

export default Home;
