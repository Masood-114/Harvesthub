import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.users);

  if (!isAuthenticated || !user) {
    return <Navigate to={"/login"} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={"/unauthorized"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
