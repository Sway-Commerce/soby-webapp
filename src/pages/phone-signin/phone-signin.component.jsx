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
  GETSECRET,
  GET_INDIVIDUAL_BASIC_INFO,
  LOGIN_WITH_PHONE_AND_PASSWORD,
  decryptIndividualModel,
} from 'graphQL/repository/individual.repository';
import {
  phoneSignInStart,
  setAccessToken,
  signInFailure,
  signInSuccess,
} from 'redux/user/user.actions';

import {
  SigninContainer,

  CardWrapper,
  RegisterContainer,
  FormContainer,
  InputGroup,
  ForgotPass,
} from './phone-signin.styles';
import PolicyNavigate from 'components/policy-navigate/policy-navigate.component';
import usePhoneNumber from 'shared/hooks/usePhoneNumber';
import Spinner from 'components/ui/spinner/spinner.component';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

const PhoneSignin = () => {
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');

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
      data: loadIndividualBasicInfoData,
      loading: loadIndividualBasicInfoLoading,
      error: loadIndividualBasicInfoError,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_BASIC_INFO);
  const [
    getSecret,
    { data: getSecretData, loading: getSecretLoading, error: getSecretError },
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

      async function decryptData() {
        const {
          signingSecret,
          encryptionSecret,
        } = getSecretData?.getSecret?.data;
        const {
          signingPublicKey,
          encryptionPublicKey,
        } = loadIndividualBasicInfoData?.getIndividual?.data;

        const {
          firstName,
          phoneNumber,
          phoneCountryCode,
          email,
          invitationCode,
          postalCode,
          lastName,
          middleName,
          dob,
          nationality,
          addressLine,
          city,
          province,
          country,
          id,
          imageUrl,
          kycStatus,
          emailStatus,
          phoneStatus,
          pendingIdentities,
        } = await decryptIndividualModel(
          encryptionSecret,
          password,
          loadIndividualBasicInfoData?.getIndividual?.data
        );

        dispatchSignInSuccess({
          signingSecret,
          encryptionSecret,
          signingPublicKey,
          encryptionPublicKey,
          phoneNumber,
          phoneCountryCode,
          email,
          invitationCode,
          postalCode,
          lastName,
          middleName,
          dob,
          nationality,
          addressLine,
          city,
          province,
          country,
          firstName,
          id,
          imageUrl,
          kycStatus,
          emailStatus,
          phoneStatus,
          pendingIdentities,
        });

        const redirectUrl = localStorage.getItem('redirectUrl');
        localStorage.removeItem('redirectUrl');
        window.location = redirectUrl || '/individual-profile';
      }

      decryptData();
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

  useEffect(() => {
    if (error) {
      setFormError(
        error?.message ??
          loadIndividualBasicInfoError?.message ??
          getSecretError?.message
      );
      setOpen(true);
    }
  }, [error]);
  useEffect(() => {
    if (loading || loadIndividualBasicInfoLoading || getSecretLoading) {
      return <Spinner />;
    }
  }, [loading || loadIndividualBasicInfoLoading || getSecretLoading]);

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
          <div className="soby-title">Welcome back</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <label className="form-label">Phone number</label>
              <PhoneInput
                country="VN"
                international
                initialValueFormat="national"
                countryCallingCodeEditable={false}
                defaultCountry="VN"
                name="phoneNumber"
                value={phoneNumberIntl}
                placeholder="090 1324 567"
                onChange={(value) => setPhoneNumberIntl(value)}
              />
              {!isPhoneValid ? (
                <h5 className="error-title">Your phone number is not correct</h5>
              ) : null}

              <InputGroup>
                <label className="form-label">Password</label>
                <FormInput
                  type="password"
                  value={password}
                  onChange={handleChange}
                  label="*******"
                  required
                />
                {!isPasswordValid ? (
                  <h5 className="error-title">
                    Your password must be between 8 to 20 characters which
                    contain at least one numeric digit, one uppercase and one
                    lowercase letter
                  </h5>
                ) : null}
              </InputGroup>

              <CustomButton type="submit">Login</CustomButton>
            </form>
          </FormContainer>
        </SigninContainer>
        <PolicyNavigate />
      </CardWrapper>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </RegisterContainer>
  );
};

export default PhoneSignin;
