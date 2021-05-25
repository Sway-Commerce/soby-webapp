import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ValidationInput from '../../components/validation-input/validation-input.component';
import { useMutation } from '@apollo/client';
import {
  SEND_PHONE_VERIFICATION,
  VERIFY_PHONE,
} from 'graphQL/repository/individual.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import { useDispatch } from 'react-redux';
import { verifyPhone } from 'redux/user/user.actions';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import CustomButton from 'components/ui/custom-button/custom-button.component';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;
const Box = styled.form`
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;

  h2 {
    margin: 0.8rem 0 2rem;
  }

  @media (max-width: 800px) {
    width: auto;
  }
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
        <h2 className="soby-title">Verify</h2>
        <p className="txt-center">Enter the 6 digit code</p>
        <p className="mg-b-24 txt-center">we sent you via phone numbers</p>
        <Row>
          <ValidationInput
            collectVerifyCode={collectVerifyCode}
            isIndividualProfile
          />
        </Row>
        {!isCodeValid ? (
          <p className="error-title">
            *You have to provide the verification code
          </p>
        ) : null}

        <Row>
          <p>Didn't get the code?&nbsp;</p>
          <p>
            <b className="primary-color">Send again</b>
          </p>
        </Row>

        <CustomButton className="global-btn">Verify</CustomButton>
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
