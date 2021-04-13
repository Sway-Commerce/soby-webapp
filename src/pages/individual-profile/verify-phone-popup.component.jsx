/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, ErrorTitle, PopupButton } from './shared-style.component';
import ValidationInput from '../../components/validation-input/validation-input.component';
import { useMutation } from '@apollo/client';
import {
  VERIFY_EMAIL,
  SEND_EMAIL_VERIFICATION,
  SEND_PHONE_VERIFICATION,
  VERIFY_PHONE,
} from 'graphQL/repository/individual.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import { useDispatch } from 'react-redux';
import { verifyEmail, verifyPhone } from 'redux/user/user.actions';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const PhoneCodePopup = ({
  phoneCountryCode,
  setOpenVerifyPhonePopup,
  phoneNumber,
}) => {
  const [verificationCode, setVerificationCode] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const dispatchVerifyPhone = (phoneStatus) =>
    dispatch(verifyPhone(phoneStatus));

  // VERIFY_PHONE
  const [
    verifyPhoneMutation,
    { data: verifyPhoneData, loading: verifyPhoneLoading },
  ] = useMutation(VERIFY_PHONE);
  useEffect(() => {
    if (verifyPhoneData?.verifyPhone?.success) {
      dispatchVerifyPhone('CONFIRMED');
      setOpenVerifyPhonePopup(false);
    }
  }, [verifyPhoneData?.verifyPhone?.success, verifyPhoneMutation]);

  // SEND_PHONE_VERIFICATION
  const [
    sendPhoneVerificationMutation,
    { error: sendPhoneVerificationMutationError },
  ] = useMutation(SEND_PHONE_VERIFICATION, {
    variables: {
      cmd: {
        phoneCountryCode,
        phoneNumber,
      },
    },
  });
  useEffect(() => {
    sendPhoneVerificationMutation();
  }, []);

  useEffect(() => {
    if (sendPhoneVerificationMutationError?.message) {
      setFormError(sendPhoneVerificationMutationError?.message);
      setOpen();
    }
  }, [sendPhoneVerificationMutationError?.message]);

  const collectVerifyCode = (code) => {
    setVerificationCode(+code);
    if (`${code}`.length === 6) {
      verifyPhoneMutation({
        variables: {
          cmd: { phoneCountryCode, phoneNumber, verificationCode: +code },
        },
      });
    }
  };

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

  return verifyPhoneLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Box onSubmit={handleSubmit}>
        <h2>Verify code</h2>
        <Row>
          <ValidationInput
            collectVerifyCode={collectVerifyCode}
            isIndividualProfile
          />
        </Row>
        {!isCodeValid ? (
          <ErrorTitle>You have to provide the verification code</ErrorTitle>
        ) : null}

        <Row>
          <p>We already send you a Code to your Email address</p>
        </Row>
        <Row>
          <h4>Send again</h4>
        </Row>

        <PopupButton />
      </Box>

      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default PhoneCodePopup;
