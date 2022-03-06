import React, { useEffect, useState } from "react";
import { adminCheckResult } from "./../../utils/authentication/authentication.utils";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loading-to-redirect/loading-to-redirect";

export const AdminRoute = ({ ...rest }) => {
  const [ok, setOk] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (user && user.token) {
      adminCheckResult(user.token)
        .then((admin) => {
          console.log(admin);
          return setOk(true);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};
