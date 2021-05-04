import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box,  PopupButton } from './shared-style.component';
import ValidationInput from '../../components/validation-input/validation-input.component';
import { useMutation } from '@apollo/client';
import {
  VERIFY_EMAIL,
  SEND_EMAIL_VERIFICATION,
} from 'graphQL/repository/individual.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import { useDispatch } from 'react-redux';
import { verifyEmail } from 'redux/user/user.actions';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const EmailCodePopup = ({ email, setOpenVerifyEmailPopup }) => {
  const [verificationCode, setVerificationCode] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const dispatchVerifyEmail = (emailStatus) =>
    dispatch(verifyEmail(emailStatus));

  // VERIFY_EMAIL
  const [
    verifyEmailMutation,
    { data: verifyEmailMutationData, loading: verifyEmailMutationLoading },
  ] = useMutation(VERIFY_EMAIL);
  useEffect(() => {
    if (verifyEmailMutationData?.verifyEmail?.success) {
      dispatchVerifyEmail('CONFIRMED');
      setOpenVerifyEmailPopup(false);
    }
  }, [verifyEmailMutationData?.verifyEmail?.success, verifyEmailMutation]);

  const [
    sendEmailVerification,
    { loading: sendEmailVerificationLoading, error: sendEmailVerificationError },
  ] = useMutation(SEND_EMAIL_VERIFICATION, {
    variables: {
      cmd: {
        email,
      },
    },
  });
  useEffect(() => {
    sendEmailVerification();
  }, []);

  useEffect(() => {
    if(sendEmailVerificationError?.message) {
      setFormError(sendEmailVerificationError?.message);
      setOpen();
    }
  }, [sendEmailVerificationError?.message]);

  const collectVerifyCode = (code) => {
    setVerificationCode(+code);
    if (`${code}`.length === 6) {
      verifyEmailMutation({
        variables: {
          cmd: { email, verificationCode: +code },
        },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (`${verificationCode}`.length === 6) {
      setIsCodeValid(true);
      verifyEmailMutation({
        variables: {
          cmd: { email, verificationCode },
        },
      });
    } else {
      setIsCodeValid(false);
    }
  };

  return verifyEmailMutationLoading || sendEmailVerificationLoading ? (
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
          <h5 className="error-title">You have to provide the verification code</h5>
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

export default EmailCodePopup;
