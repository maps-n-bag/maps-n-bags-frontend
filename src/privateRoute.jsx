import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  
  return (
    userId ? (
      children
    ) : (
      <Navigate to="/Login" />
    )
  )
}

export default PrivateRoute;