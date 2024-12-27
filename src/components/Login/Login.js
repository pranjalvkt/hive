import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      const { token } = response.data;

      // Save JWT token and notify success
      localStorage.setItem("authToken", token);
      toast.success("Login successful!");

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        {isLoading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <span className="loading-text">Entering your Hive...</span>
          </div>
        ) : (
          <button type="submit" className="submit-button">
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
