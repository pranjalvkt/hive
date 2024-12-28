import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Used for navigation

  // Fetch user details using JWT token
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      navigate("/auth/login"); // Redirect to login if no token is found
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set user details (assuming the response contains user info)
      setUserName(response.data.fullName);
      setIsLoading(false);
    } catch (err) {
      toast.error("Invalid or expired token. Please log in again.");
      localStorage.removeItem("authToken");
      navigate("/auth/login"); // Redirect to login if token is invalid
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    toast.success("You have logged out successfully.");
    navigate("/auth/login"); // Redirect to login
  };

  useEffect(() => {
    fetchUserDetails(); // Call the function to fetch user details on component mount
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
          <h2>Welcome back, {userName}!</h2>
          <p>You're now part of the buzzing Hive, where great things happen.</p>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
