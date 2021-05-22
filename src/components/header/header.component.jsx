import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as SearchIcon } from 'shared/assets/search-icon.svg';
import { ReactComponent as ArrowIcon } from 'shared/assets/arrow-down.svg';
import { ReactComponent as Logo } from 'shared/assets/logo.svg';
import { ReactComponent as TempImage } from 'shared/assets/temp.svg';
import { ReactComponent as MenuIcon } from 'shared/assets/menu-icon.svg';
import { signOutStart } from 'redux/user/user.actions';
import { mainColor } from 'shared/css-variable/variable';

const HeaderContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 calc((100vw - 1200px) / 2);
  background-color: ${mainColor};
  @media screen and (max-width: 1200px) {
    padding: 0 0.6rem;
  }
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 16.5px 0;
`;

const OptionsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const OptionLink = styled(Link)`
  padding: 10px 40px;
  cursor: pointer;
  color: white;
`;

OptionLink.displayName = 'OptionLink';

export const SwitchBtn = styled.button`
  padding: 0.5rem 1.2rem;
  color: white;
  font-size: 0.7rem;
  border: 1px white solid;
  background-color: ${mainColor};
  border-radius: 5rem;
`;

const IconBtn = styled(Link)`
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  background-color: ${mainColor};
  border: none;
  display: flex;
  align-items: center;
  svg + span,
  span + svg {
    margin-left: 8px;
  }
`;

const UserContainer = styled(Link)`
  color: white;
  padding: 0.5rem 0 0.5rem 1rem;
  font-size: 0.8rem;
  background-color: ${mainColor};
  border: none;
  display: flex;
  align-items: center;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 0.8rem;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  @media screen and (max-width: 600px) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

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
      <HamburgerMenu>
        <MenuIcon />
      </HamburgerMenu>

      <OptionsContainer>
        <Link>
          <SwitchBtn>Start selling</SwitchBtn>
        </Link>
        <IconBtn to="/">
          <SearchIcon />
          <span>
            <b>Search</b>
          </span>
        </IconBtn>
        <IconBtn to="/your-transaction">
          <span>
            <b>My order</b>
          </span>
          <ArrowIcon />
        </IconBtn>
        {isSignIn ? (
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
        ) : (
          <IconBtn to="/phone-signin">
            <b>Log in</b>
          </IconBtn>
        )}
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default withRouter(Header);
