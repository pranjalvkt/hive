import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css"; // Import CSS for styling

const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate Email
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate Password (at least 6 characters)
  const validatePassword = (password) => password.length >= 6;

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName) {
      toast.error("Full Name is required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3001/api/register", {
        fullName,
        email,
        password,
      });

      toast.success("Registration successful!");
      
      // Redirect to login page after successful registration (optional)
      setTimeout(() => {
        window.location.href = "auth/login";
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <ToastContainer />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Full Name Field */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Loader or Submit Button */}
        {isLoading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <span className="loading-text">Setting up your Hive...</span>
          </div>
        ) : (
          <button type="submit" className="submit-button">
            Register
          </button>
        )}
      </form>
    </div>
  );
};

export default Registration;