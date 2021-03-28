import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import {
  getSignature,
  LOGIN_WITH_SIGNATURE,
} from 'graphQL/repository/individual.repository';
import { createStructuredSelector } from 'reselect';
import { selectUserCredential } from 'redux/user/user.selectors';
import { connect, useSelector } from 'react-redux';

function JwtRoute({ history, component: Component, ...rest }) {
  const auth = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [signinWithSignature, { data: signatureData }] = useMutation(
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
    // if (signatureData?.loginWithSignature?.data?.accessToken) {
    //   const signature = getSignature(
    //     userKeyPair?.signingPublicKey,
    //     userKeyPair?.signingSecret
    //   );

    //   signinWithSignature({
    //     variables: {
    //       cmd: { signature },
    //     },
    //   }).then((response) => {
    //     localStorage.setItem(
    //       'token',
    //       response?.loginWithSignature?.data?.accessToken
    //     );
    //     history.push('/phone-verification');
    //   });
    // } else if (!signatureData) {
    //   // verify server response
    //   localStorage.clear();
    //   localStorage.setItem('redirectUrl', prevPath);
    //   history.push('/phone-signin');
    //   return;
    // }
  }, [auth]);

  if(isAuthenticated === null){
    return <></>
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

const mapStateToProps = createStructuredSelector({
  userKeyPair: selectUserCredential,
});

export default connect(mapStateToProps, null)(withRouter(JwtRoute));
