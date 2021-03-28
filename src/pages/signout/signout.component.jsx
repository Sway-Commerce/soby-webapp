import React from 'react';
import { useDispatch } from 'react-redux';

import CustomButton from 'components/ui/custom-button/custom-button.component';

import { signOutStart } from 'redux/user/user.actions';

import {
  SignoutContainer,
  CardWrapper,
  RegisterContainer,
  FormContainer,
} from './signout.styles';
import PolicyNavigate from 'components/policy-navigate/policy-navigate.component';

const SignOut = () => {
  const dispatch = useDispatch();
  const dispatchSignOutStart = () => dispatch(signOutStart());

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatchSignOutStart();
  };

  return (
    <RegisterContainer>
      <CardWrapper>
        <SignoutContainer>
          <div className="soby-title">Đăng xuất</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <CustomButton type="submit">Đăng xuất</CustomButton>
            </form>
          </FormContainer>
        </SignoutContainer>
        <PolicyNavigate />
      </CardWrapper>
    </RegisterContainer>
  );
};

export default SignOut;
