import React, { Children } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

PrivateRoutes.propTypes = {};

function PrivateRoutes(props) {
  const isAuthenticated = useSelector((state) => state.account.user.auth);
  const checkRole = useSelector((state) => state.account.user.role);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (checkRole !== "admin") {
    toast.error(
      `Bạn không phải Admin, tài khoản Admin là:  admin@gmail.com / admin`
    );

    return <Navigate to="/" />;
  }

  return <div>{props.children}</div>;
}

export default PrivateRoutes;
