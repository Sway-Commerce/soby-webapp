import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  HeaderContainer,
  OptionsContainer,
  OptionLink,
  LogoContainer,
  SignInLink,
  CartContainer,
  SignOut,
} from './header.styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as Cart } from 'assets/cart.svg';
import { signOutStart } from 'redux/user/user.actions';

export const Header = ({ signOutStart }) => {
  const [isSignIn, setIsSignin] = useState(!!localStorage.getItem('token'));

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        {isSignIn ? (
          <SignOut
            onClick={() => {
              signOutStart();
              localStorage.setItem('token', '');
              setIsSignin(false);
            }}
          >
            Đăng xuất
          </SignOut>
        ) : (
          <SignInLink to="/phone-signin">Đăng nhập</SignInLink>
        )}
      </OptionsContainer>
    </HeaderContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(Header);
