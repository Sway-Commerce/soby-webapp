import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ValidationInput from '../../components/validation-input/validation-input.component';
import { useMutation } from '@apollo/client';
import {
  VERIFY_EMAIL,
  SEND_EMAIL_VERIFICATION,
} from 'graphQL/repository/individual.repository';
import Spinner from 'components/ui/spinner/spinner.component';
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

const EmailCodePopup = ({ email, setOpenVerifyEmailPopup }) => {
  const [verificationCode, setVerificationCode] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  // VERIFY_EMAIL
  const [
    verifyEmailMutation,
    {
      data: verifyEmailMutationData,
      loading: verifyEmailMutationLoading,
      error: verifyEmailError,
    },
  ] = useMutation(VERIFY_EMAIL, {
    errorPolicy: 'all',
  });
  useEffect(() => {
    ;
    if (verifyEmailMutationData?.verifyEmail?.success) {
      setOpenVerifyEmailPopup(false);
    }
  }, [verifyEmailMutationData?.verifyEmail?.success, verifyEmailMutation]);

  const [
    sendEmailVerification,
    {
      loading: sendEmailVerificationLoading,
      error: sendEmailVerificationError,
    },
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
    if (sendEmailVerificationError?.message || verifyEmailError?.message) {
      setFormError(
        sendEmailVerificationError?.message || verifyEmailError?.message
      );
      setOpen(true);
    }
  }, [sendEmailVerificationError?.message, verifyEmailError?.message]);

  const collectVerifyCode = (code) => {
    setVerificationCode(+code);
    if (`${code}`.length === 6) {
      verifyEmailMutation({
        variables: {
          cmd: { email, verificationCode: code },
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
        <h2 className="soby-title">Verify</h2>
        <p className="txt-center">Enter the 6 digit code</p>
        <p className="mg-b-24 txt-center">we sent you via email</p>
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

export default EmailCodePopup;
