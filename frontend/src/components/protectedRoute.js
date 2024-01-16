// components/ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, requiredRole, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && (requiredRole === undefined || userHasRequiredRole()) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const userHasRequiredRole = () => {
  const userRole = "admin";
  return userRole === "admin";
};

export default ProtectedRoute;
