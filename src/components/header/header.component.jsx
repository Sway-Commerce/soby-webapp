import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  HeaderContainer,
  OptionsContainer,
  LogoContainer,
  SignInLink,
  SignOut,
} from './header.styles';
import { ReactComponent as Logo } from 'shared/assets/logo.svg';
import { signOutStart } from 'redux/user/user.actions';

export const Header = ({ history }) => {
  const [isSignIn, setIsSignin] = useState(!!localStorage.getItem('token'));
  const dispatch = useDispatch();
  const dispatchSignOutStart = (payload) => dispatch(signOutStart());

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>

    </HeaderContainer>
  );
};

export default withRouter(Header);

// <OptionsContainer>
//         {isSignIn ? (
//           <SignOut
//             onClick={() => {
//               dispatchSignOutStart();
//               localStorage.removeItem('token');
//               setIsSignin(false);
//               history.push('');
//             }}
//           >
//             Đăng xuất
//           </SignOut>
//         ) : (
//           <SignInLink to="/phone-signin">Đăng nhập</SignInLink>
//         )}
//       </OptionsContainer>