import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loading-to-redirect/loading-to-redirect";
export const UserRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user.currentUser);
  return user && user.token ? (
    <Route {...rest} render={children} />
  ) : (
    <LoadingToRedirect />
  );
};
