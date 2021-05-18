import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  HeaderContainer,
  IconBtn,
  LogoContainer,
  SwitchBtn,
  UserContainer,
  OptionsContainer,
} from './header.styles';
import { ReactComponent as SearchIcon } from 'shared/assets/search-icon.svg';
import { ReactComponent as ArrowIcon } from 'shared/assets/arrow-down.svg';
import { ReactComponent as Logo } from 'shared/assets/logo.svg';
import { ReactComponent as TempImage } from 'shared/assets/temp.svg';
import { signOutStart } from 'redux/user/user.actions';

export const Header = () => {
  const { accessToken, lastName, middleName, firstName, imageUrl } =
    useSelector((state) => {
      return state.user;
    });
  const [isSignIn, setIsSignin] = useState(!!accessToken);
  const dispatch = useDispatch();
  const dispatchSignOutStart = (payload) => dispatch(signOutStart());

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>
      {isSignIn ? (
        <OptionsContainer>
          <SwitchBtn>Start selling</SwitchBtn>
          <IconBtn>
            <SearchIcon />
            <span>
              <b>Search</b>
            </span>
          </IconBtn>
          <IconBtn to="your-transaction">
            <span>
              <b>My order</b>
            </span>
            <ArrowIcon />
          </IconBtn>
          <UserContainer to="/individual-profile">
            <span>
              <b>
                {lastName}&nbsp;
                {middleName}&nbsp;
                {firstName}
              </b>
            </span>
            <img src={imageUrl || TempImage} alt="" />
          </UserContainer>
        </OptionsContainer>
      ) : null}
    </HeaderContainer>
  );
};

export default withRouter(Header);
