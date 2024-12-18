import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("admin"); // Example: Check auth status

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
