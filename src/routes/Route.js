import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
//import AuthLayout from "../pages/_layouts/auth";
import DefaultLayout from "../pages/_layouts/default";

//import { store } from "../store";

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = true;
  if (!signed && isPrivate) {
    return <Redirect to="/visualizarObras" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/visualizarObras" />;
  }

  const Layout = signed ? DefaultLayout : DefaultLayout;

  return (
    <>
      <Route
        {...rest}
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    </>
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
