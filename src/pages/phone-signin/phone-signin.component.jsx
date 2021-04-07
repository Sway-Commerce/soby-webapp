/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import FormInput from 'components/form-input/form-input.component';
import CustomButton from 'components/ui/custom-button/custom-button.component';
import passwordValidation from 'shared/utils/passwordValidation';
import {
  getHashPassword,
  getSignature,
  GETSECRET,
  GET_INDIVIDUAL_BASIC_INFO,
  LOGIN_WITH_PHONE_AND_PASSWORD,
} from 'graphQL/repository/individual.repository';
import {
  phoneSignInStart,
  setAccessToken,
  signInFailure,
  signInSuccess,
} from 'redux/user/user.actions';

import {
  SigninContainer,
  ErrorTitle,
  CardWrapper,
  RegisterContainer,
  FormContainer,
  InputGroup,
  ForgotPass,
} from './phone-signin.styles';
import PolicyNavigate from 'components/policy-navigate/policy-navigate.component';
import usePhoneNumber from 'shared/hooks/usePhoneNumber';
import Spinner from 'components/ui/spinner/spinner.component';

const PhoneSignin = () => {
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');

  const [password, setPassword] = useState('');
  const [inputValidation, setInputValidation] = useState({
    isPasswordValid: true,
    isPhoneValid: true,
  });
  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const [phoneSignin, { data, error, loading }] = useMutation(
    LOGIN_WITH_PHONE_AND_PASSWORD,
    {
      errorPolicy: 'all',
    }
  );

  const [
    getBasicInfo,
    {
      error: loadIndividualBasicInfoError,
      data: loadIndividualBasicInfoData,
      loading: loadIndividualBasicInfoLoading,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_BASIC_INFO);
  const [
    getSecret,
    { error: getSecretError, data: getSecretData, loading: getSecretLoading },
  ] = useLazyQuery(GETSECRET);

  const dispatch = useDispatch();
  const dispatchPhoneSignInStart = (phoneAndPassword) =>
    dispatch(phoneSignInStart(phoneAndPassword));
  const dispatchSignInFailure = (error) => dispatch(signInFailure(error));
  const dispatchSetAccessToken = (accessToken) =>
    dispatch(setAccessToken(accessToken));

  useEffect(() => {
    if (loadIndividualBasicInfoData?.getIndividual?.data) {
      getSecret();
    }
  }, [loadIndividualBasicInfoData?.getIndividual?.data]);

  useEffect(() => {
    if (
      loadIndividualBasicInfoData?.getIndividual?.data &&
      getSecretData?.getSecret?.data
    ) {
      const dispatchSignInSuccess = (payload) =>
        dispatch(signInSuccess(payload));

      const signature = getSignature(
        loadIndividualBasicInfoData?.getIndividual?.data?.signingPublicKey,
        getSecretData?.getSecret?.data?.signingSecret,
        password
      );

      const {
        signingSecret,
        encryptionSecret,
      } = getSecretData?.getSecret?.data;
      const {
        signingPublicKey,
        encryptionPublicKey,
      } = loadIndividualBasicInfoData?.getIndividual?.data;

      dispatchSignInSuccess({
        signature,
        signingSecret,
        encryptionSecret,
        signingPublicKey,
        encryptionPublicKey,
        phoneNumber,
        phoneCountryCode,
      });
      const redirectUrl = localStorage.getItem("redirectUrl");
      localStorage.removeItem("redirectUrl");
      window.location = redirectUrl || "/your-transaction";
    }
  }, [
    loadIndividualBasicInfoData?.getIndividual?.data,
    getSecretData?.getSecret?.data,
  ]);

  useEffect(() => {
    if (!!data?.loginWithPhoneAndPassword?.data) {
      dispatchSetAccessToken(
        data?.loginWithPhoneAndPassword?.data?.accessToken
      );

      getBasicInfo();
    }
  }, [!!data?.loginWithPhoneAndPassword?.data]);

  if (loading || loadIndividualBasicInfoLoading || getSecretLoading)
    return <Spinner />;
  if (error || loadIndividualBasicInfoError || getSecretError) {
    dispatchSignInFailure(
      error || loadIndividualBasicInfoError || getSecretError
    );
    return `Error! ${error || loadIndividualBasicInfoError || getSecretError}`;
  }

  const { isPasswordValid, isPhoneValid } = inputValidation;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPasswordValid = passwordValidation(password);
    const isPhoneValid = isPossiblePhoneNumber(phoneNumberIntl);

    setInputValidation({
      isPasswordValid,
      isPhoneValid,
    });

    if (isPasswordValid && isPhoneValid) {
      dispatchPhoneSignInStart();
      phoneSignin({
        variables: {
          cmd: {
            phoneNumber,
            phoneCountryCode,
            password: getHashPassword(password),
          },
        },
      });
    }
  };

  const handleChange = (event) => {
    if (!event) {
      return;
    }

    const { value } = event?.target;
    setPassword(value);
  };

  return (
    <RegisterContainer>
      <CardWrapper>
        <SigninContainer>
          <div className="soby-title">Đăng nhập</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <div className="form-label">Your phone numbers</div>
              <PhoneInput
                country="VN"
                international
                initialValueFormat="national"
                countryCallingCodeEditable={false}
                defaultCountry="VN"
                name="phoneNumber"
                value={phoneNumberIntl}
                onChange={(value) => setPhoneNumberIntl(value)}
              />
              {!isPhoneValid ? (
                <ErrorTitle>Your phone number is not correct</ErrorTitle>
              ) : null}

              <InputGroup>
                <div className="form-label">Password</div>
                <FormInput
                  type="password"
                  value={password}
                  onChange={handleChange}
                  label="*******"
                  required
                />
                {!isPasswordValid ? (
                  <ErrorTitle>
                    Your password must be between 8 to 20 characters which
                    contain at least one numeric digit, one uppercase and one
                    lowercase letter
                  </ErrorTitle>
                ) : null}
              </InputGroup>

              <CustomButton type="submit">Đăng nhập</CustomButton>
              <ForgotPass>
                <Link to="/resetpass">Forgot your Password</Link>
              </ForgotPass>
            </form>
          </FormContainer>
        </SigninContainer>
        <PolicyNavigate />
      </CardWrapper>
    </RegisterContainer>
  );
};

export default PhoneSignin;
