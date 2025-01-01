import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostList from "./PostList";
import api from "../../helper/api";
import './Home.css'
const Home = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      navigate("/auth/login");
      return;
    }

    try {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserName(response.data.fullName);
      setIsLoading(false);
    } catch (err) {
      toast.error("Session expired! Please log in again.");
      localStorage.removeItem("authToken");
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="home-container">
      <ToastContainer />
      {isLoading ? (
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
