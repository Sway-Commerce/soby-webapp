
import React, { useEffect, useState } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function JwtRoute({ history, component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  useEffect(() => {
    // get the token
    const jwt = accessToken;
    if (!jwt) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

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
