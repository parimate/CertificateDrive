import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component, allowedAccount) => {
  return (props) => {
    const account = props.account; // assume account is passed as a prop

    if (account !== allowedAccount) {
      return <Navigate to="/page/home" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
