import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/NavBar";
import React from "react";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
