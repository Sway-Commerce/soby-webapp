import React from 'react';
import { Link } from 'react-router-dom';

import { InfoText, PolicyText } from './policy-navigate.styles';

export const PolicyNavigate = ({ isSignIn }) => (
  <>
    {isSignIn ? (
      <>
        <InfoText>
          Already have Account?
          <Link to="/">
            <span>&#32;Log in</span>
          </Link>
        </InfoText>
        <PolicyText>By registering, I agree to SOBY</PolicyText>
      </>
    ) : (
      <>
        <InfoText>
          No Account?
          <Link to="/signup">
            <span>&#32;Sign up here</span>
          </Link>
        </InfoText>
        <PolicyText>By logging in, I agree to SOBY</PolicyText>
      </>
    )}
    <PolicyText style={{ marginTop: 0 }}>
      <Link to="/terms">
        <span>Terms of Service&#32;</span>
      </Link>
      and
      <Link to="/privacy">
        <span>&#32;Privacy Policy.</span>
      </Link>
    </PolicyText>
  </>
);

export default PolicyNavigate;
