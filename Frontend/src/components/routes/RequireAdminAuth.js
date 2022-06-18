import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAdminAuth({ children, redirectTo }) {
  const { user, isLoading } = useSelector((state) => state.user);
  return isLoading === false && user && user.role === "admin" ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default RequireAdminAuth;
