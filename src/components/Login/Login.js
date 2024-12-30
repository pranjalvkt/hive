import React, { useState } from "react";
import api from "../../helper/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
      const response = await api.post("/login", {
        email,
        password,
      });

      const { token, user_email, user_id, user_name } = response.data;
      localStorage.setItem("user", JSON.stringify({"user_email": user_email, "user_id": user_id, "user_name": user_name}));
      localStorage.setItem("authToken", token);
      toast.success("Login successful!");
      navigate("/");
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
