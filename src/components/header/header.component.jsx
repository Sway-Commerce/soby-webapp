import React from 'react';

import {
  HeaderContainer,
  OptionsContainer,
  OptionLink,
  LogoContainer,
  SignInLink,
  CartContainer
} from './header.styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Cart } from '../../assets/cart.svg';

export const Header = () => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo />
    </LogoContainer>
    <OptionsContainer>
      <SignInLink to="/phone-signin">Đăng nhập</SignInLink>
    </OptionsContainer>
  </HeaderContainer>
);

export default Header;
