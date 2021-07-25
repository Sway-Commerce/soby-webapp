import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as SearchIcon } from 'shared/assets/search-icon.svg';
import { ReactComponent as ArrowIcon } from 'shared/assets/arrow-down.svg';
import { ReactComponent as Logo } from 'shared/assets/logo-temp.svg';
import { ReactComponent as MobileLogo } from 'shared/assets/mobile-logo.svg';
import TempImage from 'shared/assets/default-individual-ava.png';
import { ReactComponent as MenuIcon } from 'shared/assets/menu-icon.svg';
import { mainColor, whiteColor, defaultFontColor } from 'shared/css-variable/variable';
import { setSearchInput } from 'redux/user/user.actions';
import useDebounce from 'shared/hooks/useDebounce';
import SearchInput from './search-input.component';

const Container = styled.div`
  padding: 10px calc((100vw - 1200px) / 2);
  background-color: ${whiteColor};

  @media screen and (max-width: 1200px) {
    padding: 10px 1.2rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  @media screen and (max-width: 600px) {
    height: 34px;
  }
`;

const LogoContainer = styled(Link)`
  height: 100%;
`;

const OptionsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 200px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const OptionLink = styled(Link)`
  padding: 10px 24px;
  cursor: pointer;
  color: ${defaultFontColor};
`;

OptionLink.displayName = 'OptionLink';

export const SwitchBtn = styled.button`
  padding: 0.5rem 1.2rem;
  color: white;
  font-size: 0.7rem;
  border: 1px white solid;
  background-color: ${mainColor};
  border-radius: 5rem;

  .first {
    margin-right: 8px;
  }
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
    margin-top: 7px;
  }
`;

const LogoItem = styled.div`
  svg {
    display: ${(props) => (props.show ? 'unset' : 'none')};
  }
  @media screen and (max-width: 600px) {
    svg {
      display: ${(props) => (props.hide ? 'unset  ' : 'none')};
    }
  }
`;

export const Header = ({ history }) => {
  const { accessToken, lastName, middleName, firstName, fullName, imageUrl } = useSelector((state) => {
    return state.user;
  });
  const [isSignIn, setIsSignin] = useState(!!accessToken);
  const [inputSearch, setInputSearch] = useState('');
  const debouncedSearchTerm = useDebounce(inputSearch, 500);

  const dispatch = useDispatch();
  const dispatchSetSearchInput = (payload) => dispatch(setSearchInput(payload));

  useEffect(() => {
    setIsSignin(!!accessToken);
  }, [accessToken]);

  useEffect(() => {
    dispatchSetSearchInput(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { value } = event?.target;
    setInputSearch(value);
  };

  return (
    <Container>
      <HeaderContainer>
        <LogoContainer to='/'>
          <LogoItem hide>
            <MobileLogo />
          </LogoItem>
          <LogoItem show>
            <Logo />
          </LogoItem>
        </LogoContainer>

        {/* {history.location.pathname.includes('search-result') && (
          <SearchInput
            show
            inputSearch={inputSearch}
            handleChange={handleChange}
          />
        )} */}
        {/* <HamburgerMenu>
          <MenuIcon />
        </HamburgerMenu> */}

        <OptionsContainer
        // isSearchView={history.location.pathname.includes('search-result')}
        >
          <OptionLink to={{ pathname: '/explore' }}>Khám phá</OptionLink>
          <OptionLink to={{ pathname: '/' }}>Chatbot</OptionLink>
          <a href='https://soby.vn/#what-is-soby' style={{ padding: '10px 24px', cursor: 'pointer', color: `${defaultFontColor}` }}>
            Soby là gì?
          </a>
          <OptionLink
            to={isSignIn ? '/your-transaction' : '/phone-signin'}>
            Đơn hàng của tôi
            <ArrowIcon />
          </OptionLink>
          {isSignIn? (
            <Link to='/individual-profile'
            style={{ marginRight: '29px' }}>
              <b>
                Xin chào {firstName}
              </b>
            </Link>
          ) : (
            <OptionLink to={{ pathname: '/phone-signin' }}>
              Đăng nhập

              <SwitchBtn
                className='fw-bold'
                style={{ marginLeft: '34px', marginRight: '8px', backgroundColor: 'white', border: '2px solid #E7E8E9', color: 'black' }}>
                Đăng ký
              </SwitchBtn>
            </OptionLink>
          )}
          <Link to='/create-seller'>
            <SwitchBtn type='button'>Người bán</SwitchBtn>
          </Link>

          {
            //#region Old code
          }
          {/* {!history.location.pathname.includes('search-result') && (
            <React.Fragment>
              <Link to={{ pathname: 'http://signup.soby.vn/' }} target="_blank">
                <SwitchBtn>Start selling</SwitchBtn>
              </Link>
              <IconBtn to="/search-result">
                <SearchIcon />
                <span>
                  <b>Search</b>
                </span>
              </IconBtn>
            </React.Fragment>
          )}

          <IconBtn
            to="/your-transaction"
            className={isSignIn ? '' : 'non-clickable'}
          >
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
                  {middleName && (
                    <React.Fragment>{middleName}&nbsp;</React.Fragment>
                  )}
                  {firstName}
                </b>
              </span>
              <img src={imageUrl ?? TempImage} alt="" />
            </UserContainer>
          ) : (
            <IconBtn to="/phone-signin">
              <b>Log in</b>
            </IconBtn>
          )} */}
          {
            //#endregion
          }
        </OptionsContainer>
      </HeaderContainer>
      {history.location.pathname.includes('search-result') && <SearchInput hide inputSearch={inputSearch} handleChange={handleChange} />}
    </Container>
  );
};

export default withRouter(Header);
