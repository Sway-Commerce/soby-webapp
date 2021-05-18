import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from 'components/form-input/form-input.component';
import CustomButton from 'components/ui/custom-button/custom-button.component';
import passwordValidation from 'shared/utils/passwordValidation';
import emailValidation from 'shared/utils/emailValidation';
import {
  CREATE_INDIVIDUAL,
  SEND_PHONE_VERIFICATION,
  generateEncryptionKey,
  generateSignInKey,
  getSignature,
  LOGIN_WITH_SIGNATURE,
} from 'graphQL/repository/individual.repository';
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  setAccessToken,
} from 'redux/user/user.actions';

import {
  SignUpContainer,
  CardWrapper,
  RegisterContainer,
  FormContainer,
  InputContainer,
} from './register.styles';
import PolicyNavigate from 'components/policy-navigate/policy-navigate.component';
import Spinner from 'components/ui/spinner/spinner.component';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

const Register = ({ history }) => {
  const { phoneNumber, phoneCountryCode, signingSecret, signingPublicKey } =
    useSelector((state) => {
      return {
        phoneNumber: state.user.phoneNumber,
        phoneCountryCode: state.user.phoneCountryCode,
        signingSecret: state.user.signingSecret,
        signingPublicKey: state.user.signingPublicKey,
      };
    });

  const [signature, setSignature] = useState('');
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [operationLoading, setOperationLoading] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    encryptionSecret: '',
    encryptionPublicKey: '',
    signingSecret: '',
    signingPublicKey: '',
  });
  const [inputValidation, setInputValidation] = useState({
    isPasswordValid: true,
    isEmailValid: true,
    isFirstNameValid: true,
    isLastNameValid: true,
  });

  const dispatch = useDispatch();
  const dispatchSignUpStart = (userCredentials) =>
    dispatch(signUpStart(userCredentials));
  const dispatchSignUpFailure = (error) => dispatch(signUpFailure(error));
  const dispatchSignUpSuccess = (keyPair) => dispatch(signUpSuccess(keyPair));
  const dispatchSetAccessToken = (accessToken) =>
    dispatch(setAccessToken(accessToken));

  const { firstName, lastName, email, password } = userCredentials;

  const { isPasswordValid, isEmailValid, isFirstNameValid, isLastNameValid } =
    inputValidation;

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

  useEffect(() => {
    if (signature) {
      setOperationLoading(true);
      setTimeout(() => {
        signinWithSignature({
          variables: {
            cmd: { signature },
          },
        });
      }, 4000);
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
    const { encryptionSecret, encryptionPublicKey } =
      await generateEncryptionKey(password);

    const { signingSecretKey, signingPublicKey } = generateSignInKey(password);

    const isPasswordValid = passwordValidation(password);
    const isEmailValid = emailValidation(email);

    setInputValidation({
      ...inputValidation,
      isPasswordValid,
      isEmailValid,
      isFirstNameValid: !!firstName,
      isLastNameValid: !!lastName,
    });

    if (isPasswordValid && isEmailValid) {
      setUserCredentials({
        ...userCredentials,
        encryptionSecret,
        signingSecret: signingSecretKey,
      });

      const cmd = {
        ...userCredentials,
        encryptionSecret,
        encryptionPublicKey,
        signingSecret: signingSecretKey,
        signingPublicKey,
        phoneNumber,
        phoneCountryCode,
      };
      dispatchSignUpStart();
      register({
        variables: {
          cmd,
        },
      });
      dispatchSignUpSuccess({
        signingSecret: signingSecretKey,
        encryptionSecret,
        signingPublicKey,
        encryptionPublicKey,
      });
    }
  };

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event?.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return signinWithSignatureLoading || registerLoading || operationLoading ? (
    <Spinner />
  ) : (
    <RegisterContainer>
      <CardWrapper>
        <SignUpContainer>
          <div className="soby-title">Welcome to Soby</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                label="First name"
                placeholder="Brian"
              />
              {!isFirstNameValid ? (
                <p className="error-title">*The field is required</p>
              ) : null}
              <InputContainer>
                <FormInput
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  label="Last name"
                  placeholder="John"
                />
                {!isLastNameValid ? (
                  <p className="error-title">*The field is required</p>
                ) : null}
              </InputContainer>
              <InputContainer>
                <FormInput
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  label="Your email"
                  placeholder="Email"
                />
                {!isEmailValid ? (
                  <p className="error-title">*Your email is not correct</p>
                ) : null}
              </InputContainer>
              <InputContainer>
                <FormInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  label="Password"
                  placeholder="Abcabc123#"
                  required
                />
                {!isPasswordValid ? (
                  <p className="error-title">
                    *Your password must be between 8 to 20 characters which
                    contain at least one numeric digit, one uppercase and one
                    lowercase letter
                  </p>
                ) : (
                  <p className="fs-14">
                    Your password must be between 8 to 20 characters which
                    contain at least one numeric digit, one uppercase and one
                    lowercase letter
                  </p>
                )}
              </InputContainer>
              <CustomButton type="submit" className="main-btn">
                Create Account
              </CustomButton>
            </form>
          </FormContainer>
        </SignUpContainer>
        <PolicyNavigate isSignIn />
      </CardWrapper>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </RegisterContainer>
  );
};

export default Register;
