import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("authToken");
  return user ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
