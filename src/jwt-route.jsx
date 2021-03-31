import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import {
  LOGIN_WITH_SIGNATURE,
} from 'graphQL/repository/individual.repository';
import { useSelector } from 'react-redux';

function JwtRoute({ history, component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const signature = useSelector((state) => {
    return state.user.signature;
  });

  const [signinWithSignature] = useMutation(
    LOGIN_WITH_SIGNATURE,
    {
      errorPolicy: 'all',
    }
  );

  useEffect(() => {
    const prevPath = window.location.pathname;
    localStorage.setItem('redirectUrl', prevPath);
    // get the token
    const jwt = localStorage.getItem('token');
    if (!jwt) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    // handle refresh token
    // if (signature) {
    //   signinWithSignature({

    //     variables: {
    //       cmd: { signature },
    //     },
    //   }).then(({data}) => {
    //     localStorage.setItem(
    //       'token',
    //       data?.loginWithSignature?.data?.accessToken
    //     );
    //   });
    // } else if (!signature) {
    //   // verify server response
    //   localStorage.clear();
    //   localStorage.setItem('redirectUrl', prevPath);
    //   history.push('/phone-signin');
    //   return;
    // }
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
