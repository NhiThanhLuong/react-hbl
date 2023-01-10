import { storage } from "_constants";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  // const token = localStorage.getItem(storage.ACCESS_TOKEN);
  const access_token = localStorage.getItem(storage.access_token);
  return access_token ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
