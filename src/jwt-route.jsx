import React, { useEffect, useState } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function JwtRoute({ history, component: Component, ...rest }) {
  const { accessToken, id } = useSelector((state) => {
    return state.user;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken && !!id);

  useEffect(() => {
    if (!!accessToken && !!id) {
      setIsAuthenticated(!!accessToken && !!id);
    }
  }, [accessToken, id]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/phone-signin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default withRouter(JwtRoute);
