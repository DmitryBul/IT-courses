import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ component: Component }) => {
  const authToken = sessionStorage.getItem("authToken");

  return authToken ? <Component /> : <Navigate to="/login" />;
};

export default AuthRoute;

