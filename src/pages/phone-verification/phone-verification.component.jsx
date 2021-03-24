/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from 'components/custom-button/custom-button.component';

import {
  sendPhoneVerification,
  verifyPhone,
} from 'redux/user/user.actions';
import { selectPhoneNumber } from 'redux/user/user.selectors';

import {
  SignUpContainer,
  CardWrapper,
  RegisterContainer,
  FormContainer,
  CodeText,
  SendAgain,
  ErrorTitle,
} from './phone-verification.styles';

import ValidationInput from 'components/validation-input/validation-input.component';
import {
  SEND_PHONE_VERIFICATION,
  VERIFY_PHONE,
} from 'graphQL/repository/individual.repository';
import { useMutation } from '@apollo/client';

const PhoneVerification = ({ history, phone, verify, sendVerification }) => {
  const { phoneNumber, phoneCountryCode } = phone;
  const [verificationCode, setVerificationCode] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [sendPhoneVerification] = useMutation(SEND_PHONE_VERIFICATION, {
    errorPolicy: 'all',
  });
  const [verifyPhone, { data }] = useMutation(VERIFY_PHONE, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (data?.verifyPhone?.success) {
      history.push('/signout');
    }
  }, [data?.verifyPhone?.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (`${verificationCode}`.length === 6) {
      setIsCodeValid(true);
      verify();
      verifyPhone({
        variables: {
          cmd: { phoneCountryCode, phoneNumber, verificationCode },
        },
      });
    } else {
      setIsCodeValid(false);
    }
  };

  const collectVerifyCode = (code) => {
    setVerificationCode(+code);
  };

  const sendAgain = () => {
    sendVerification();
    sendPhoneVerification({
      variables: {
        cmd: { phoneCountryCode, phoneNumber },
      },
    });
  };

  return (
    <RegisterContainer>
      <CardWrapper>
        <SignUpContainer>
          <div className="soby-title">Đăng ký</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <div className="form-label">Verify Code</div>
              <ValidationInput collectVerifyCode={collectVerifyCode} />
              {!isCodeValid ? (
                <ErrorTitle>
                  You have to provide the verification code
                </ErrorTitle>
              ) : null}
              <CodeText>
                We already send you a Code to your Phone Numbers
              </CodeText>
              <SendAgain onClick={sendAgain}>Send again</SendAgain>
              <CustomButton>Submit</CustomButton>
            </form>
          </FormContainer>
        </SignUpContainer>
      </CardWrapper>
    </RegisterContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  phone: selectPhoneNumber,
});

const mapDispatchToProps = (dispatch) => ({
  verify: () => dispatch(verifyPhone()),
  sendVerification: () => dispatch(sendPhoneVerification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);
