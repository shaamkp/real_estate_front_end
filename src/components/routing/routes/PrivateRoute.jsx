import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useBearStore } from "../../zustand/Store";

const PrivateRoute = () => {
  const userData = useBearStore((state) => state.userData);
  return !userData.isVerified ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
