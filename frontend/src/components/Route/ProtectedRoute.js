import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading === false) {
    if (isAdmin === true && user && user.role !== 'admin') {
      return <Navigate to="/login" />;
    } else if (isAuthenticated === true) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" state={{ prev: location.pathname }} />;
    }
  }
};

export default ProtectedRoute;
