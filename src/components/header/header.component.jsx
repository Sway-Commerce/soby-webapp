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
      <OptionLink to="/">Home</OptionLink>
      <OptionLink to="/dashboard">My Dashboard</OptionLink>
      <SignInLink to="/signin">Đăng nhập</SignInLink>
      <CartContainer ><Cart/></CartContainer>
    </OptionsContainer>
  </HeaderContainer>
);

export default Header;
