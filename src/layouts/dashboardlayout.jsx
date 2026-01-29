import DashboardNavbar from "../components/navbar/DashboardNavbar";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.users);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <DashboardNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
