import React from 'react';

import {
  HeaderContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

export const Header = ({ currentUser, signOutStart }) => (
  <HeaderContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      )}
    </OptionsContainer>
  </HeaderContainer>
);

export default Header;
