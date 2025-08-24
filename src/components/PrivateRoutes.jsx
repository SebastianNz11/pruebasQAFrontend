import React, { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useContext(GeneralContext);
  const token = localStorage.getItem("token");
    if (loading) {
        return <div>Loading...</div>;
    }

  if (!isAuthenticated || !token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet/>;
};
