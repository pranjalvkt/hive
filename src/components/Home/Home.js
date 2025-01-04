import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostList from "./PostList";
import api from "../../helper/api";
import './Home.css'

const Home = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    console.log('trigger from home');
    
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
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
      setTimeout(()=> {
        navigate("/auth/login");
      }, 1000)
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="home-container">
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
