/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from 'components/ui/custom-button/custom-button.component';
import usePhoneNumber from 'shared/hooks/usePhoneNumber';

import {
  setAccessToken,
  setUserPhoneNumber,
} from 'redux/user/user.actions';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

import {
  CREATE_INDIVIDUAL,
  SEND_PHONE_VERIFICATION,
  LOGIN_WITH_SIGNATURE,
  getSignature,
} from 'graphQL/repository/individual.repository';
import {
  signUpStart,
} from 'redux/user/user.actions';

import {
  SignUpContainer,
  CardWrapper,
  RegisterContainer,
  FormContainer,
} from './register-phone.styles';

import PolicyNavigate from 'components/policy-navigate/policy-navigate.component';
import { useMutation } from '@apollo/client';
import Spinner from 'components/ui/spinner/spinner.component';

const RegisterPhone = ({ history }) => {
  const {
    name,
    email,
    dob,
    password,
    encryptionSecret,
    encryptionPublicKey,
    signingSecret,
    signingPublicKey,
    accessToken,
    id,
  } = useSelector((state) => {
    return state.user;
  });

  const [formError, setFormError] = useState('');
  const [operationLoading, setOperationLoading] = useState(false);

  const [signature, setSignature] = useState('');
  const [open, setOpen] = useState(false);
  const dispatchSignUpStart = (userCredentials) =>
    dispatch(signUpStart(userCredentials));
  const dispatchSetAccessToken = (accessToken) =>
    dispatch(setAccessToken(accessToken));

  const [
    register,
    { data: registerData, error: registerError, loading: registerLoading },
  ] = useMutation(CREATE_INDIVIDUAL, {
    errorPolicy: 'all',
  });

  const [
    signinWithSignature,
    { data: signatureData, loading: signinWithSignatureLoading },
  ] = useMutation(LOGIN_WITH_SIGNATURE, {
    errorPolicy: 'all',
  });

  const [sendPhoneVerificationMutation] = useMutation(SEND_PHONE_VERIFICATION, {
    errorPolicy: 'all',
  });

  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');

  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);

  const dispatch = useDispatch();
  const dispatchSetUserPhoneNumber = (phone) =>
    dispatch(setUserPhoneNumber(phone));

  useEffect(() => {
    if (signature) {
      setOperationLoading(true);
      setTimeout(() => {
        signinWithSignature({
          variables: {
            cmd: { signature },
          },
        });
      }, 8000);
    }
  }, [signature]);

  useEffect(() => {
    if (signatureData?.loginWithSignature?.data?.accessToken) {
      setOperationLoading(false);

      dispatchSetAccessToken(
        signatureData?.loginWithSignature?.data?.accessToken
      );

      sendPhoneVerificationMutation({
        variables: {
          cmd: { phoneCountryCode, phoneNumber },
        },
      });

      history.push('/phone-verification');
    }
  }, [signatureData?.loginWithSignature?.data]);

  useEffect(() => {
    if (!!accessToken && id) {
      history.push('/individual-profile');
    }
  }, [accessToken]);

  useEffect(() => {
    if (registerData?.register?.data?.id) {
      const signature = getSignature(signingPublicKey, signingSecret, password);
      setSignature(signature);
    }
  }, [registerData?.register?.data]);

  useEffect(() => {
    if (registerError?.message) {
      setFormError(registerError?.message);
      setOpen(true);
    }
  }, [registerError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPhoneValid = isPossiblePhoneNumber(phoneNumberIntl);

    setIsPhoneValid(isPhoneValid);

    if (isPhoneValid) {
      const cmd = {
        encryptionSecret,
        encryptionPublicKey,
        signingSecret,
        signingPublicKey,
        phoneNumber,
        phoneCountryCode,
        email,
        name,
        password,
      };
      dispatchSignUpStart();
      dispatchSetUserPhoneNumber({ phoneCountryCode, phoneNumber });
      register({
        variables: {
          cmd,
        },
      });
    }
  };

  return (
    <RegisterContainer>
      <CardWrapper>
        <SignUpContainer>
          <div className="soby-title">Verify your number</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <div className="form-label">Your phone numbers</div>
              <PhoneInput
                international
                initialValueFormat="national"
                countryCallingCodeEditable={false}
                defaultCountry="VN"
                name="phoneNumber"
                value={phoneNumberIntl}
                onChange={(value) => setPhoneNumberIntl(value)}
              />
              {!isPhoneValid ? (
                <p className="error-title">*Your phone number is not correct</p>
              ) : (
                <p className="fs-14 gray">
                  Enter your number and get a code to verify your account
                </p>
              )}
              {signinWithSignatureLoading ||
              registerLoading ||
              operationLoading ? (
                <div className="txt-center">
                  <Spinner inner />
                </div>
              ) : (
                <CustomButton className="main-btn">Register</CustomButton>
              )}

              <PolicyNavigate isSignIn />
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

export default RegisterPhone;
