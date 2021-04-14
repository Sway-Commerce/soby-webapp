import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from 'components/ui/custom-button/custom-button.component';

import { sendPhoneVerification, verifyPhone } from 'redux/user/user.actions';

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
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import Spinner from 'components/ui/spinner/spinner.component';

const PhoneVerification = () => {
  const { phoneNumber, phoneCountryCode } = useSelector((state) => {
    return {
      phoneNumber: state.user.phoneNumber,
      phoneCountryCode: state.user.phoneCountryCode,
    };
  });
  const [verificationCode, setVerificationCode] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const [
    sendPhoneVerifyMutation,
    {
      loading: sendPhoneVerificationLoading,
      error: sendPhoneVerificationError,
    },
  ] = useMutation(SEND_PHONE_VERIFICATION, {
    errorPolicy: 'all',
  });
  const [
    verifyPhoneMutation,
    { data, loading: verifyPhoneLoading, error: verifyPhoneError },
  ] = useMutation(VERIFY_PHONE, {
    errorPolicy: 'all',
  });
  const dispatch = useDispatch();
  const dispatchVerify = () => dispatch(verifyPhone());
  const dispatchSendVerification = () => dispatch(sendPhoneVerification());

  useEffect(() => {
    if (verifyPhoneError?.message || sendPhoneVerificationError?.message) {
      setFormError(
        verifyPhoneError?.message ?? sendPhoneVerificationError?.message
      );
      setOpen(true);
    }
  }, [verifyPhoneError, sendPhoneVerificationError]);

  useEffect(() => {
    if (data?.verifyPhone?.success) {
      dispatchVerify("CONFIRMED");
      const redirectUrl = localStorage.getItem('redirectUrl');
      localStorage.removeItem('redirectUrl');
      window.location = redirectUrl || '/your-transaction';
    }
  }, [data?.verifyPhone?.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (`${verificationCode}`.length === 6) {
      setIsCodeValid(true);
      verifyPhoneMutation({
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
    if(`${code}`.length == 6) {
      verifyPhoneMutation({
        variables: {
          cmd: { phoneCountryCode, phoneNumber, verificationCode: +code },
        },
      });
    }
  };

  const sendAgain = () => {
    dispatchSendVerification();
    sendPhoneVerifyMutation({
      variables: {
        cmd: { phoneCountryCode, phoneNumber },
      },
    });
  };

  return sendPhoneVerificationLoading || verifyPhoneLoading ? (
    <Spinner />
  ) : (
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
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </RegisterContainer>
  );
};

export default PhoneVerification;
