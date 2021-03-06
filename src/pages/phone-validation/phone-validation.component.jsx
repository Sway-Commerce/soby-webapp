import React, { useState } from 'react';
import { connect } from 'react-redux';

import CustomButton from '../../components/custom-button/custom-button.component';

import { setUserPhoneNumber } from '../../redux/user/user.actions';

import {
  SignUpContainer,
  CardWrapper,
  RegisterContainer,
  FormContainer,
  CodeText,
  SendAgain,
} from './phone-validation.styles';

import ValidationInput from '../../components/validation-input/validation-input.component';

const PhoneValidation = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    return null;
  };

  return (
    <RegisterContainer>
      <CardWrapper>
        <SignUpContainer>
          <div className="soby-title">Đăng ký</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <div className="form-label">Verify Code</div>
              <ValidationInput />
              <CodeText>
                We already send you a Code to your Phone Numbers
              </CodeText>
              <SendAgain>Send again</SendAgain>
              <CustomButton>Submit</CustomButton>
            </form>
          </FormContainer>
        </SignUpContainer>
      </CardWrapper>
    </RegisterContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUserPhoneNumber: (payload) => dispatch(setUserPhoneNumber(payload)),
});

export default connect(null, mapDispatchToProps)(PhoneValidation);
