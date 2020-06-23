import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={prop =>
        isAuthenticated ? <Component {...prop} /> : <Redirect to="/home" />
      }
    />
  );
};

export default PrivateRoute;
