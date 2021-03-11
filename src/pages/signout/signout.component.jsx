import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../../components/custom-button/custom-button.component';

import {
  signOutStart,
} from '../../redux/user/user.actions';

import {
  SignoutContainer,
  CardWrapper,
  RegisterContainer,
  FormContainer,
} from './signout.styles';
import PolicyNavigate from '../../components/policy-navigate/policy-navigate.component';

const SignOut = ({
  signOutStart,
}) => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    signOutStart();
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

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(SignOut);
