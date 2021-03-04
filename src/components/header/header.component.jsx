import React from 'react';

import {
  HeaderContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

export const Header = ({ currentUser, signOutStart }) => (
  <HeaderContainer>
    <OptionsContainer>
      <OptionLink to='/home'>Home</OptionLink>
      <OptionLink to='/dashboard'>My Dashboard</OptionLink>
      <OptionLink to='/reference'>Refer a Friend</OptionLink>
    </OptionsContainer>
  </HeaderContainer>
);

export default Header;
