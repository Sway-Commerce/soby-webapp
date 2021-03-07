import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import passwordValidation from '../../utils/passwordValidation';
import emailValidation from '../../utils/emailValidation';
import {
  REGISTER,
  SEND_PHONE_VERIFICATION,
} from '../../repository/individual.repository';
import {
  generateEncryptionKey,
  generateSignInKey,
} from '../../utils/generateKeyPair';
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  sendPhoneVerification,
} from '../../redux/user/user.actions';

import {
  SignUpContainer,
  ErrorTitle,
  CardWrapper,
  RegisterContainer,
  FormContainer,
  InputGroup,
} from './register.styles';
import { selectPhoneNumber } from '../../redux/user/user.selectors';
import PolicyNavigate from '../../components/policy-navigate/policy-navigate.component';

const Register = ({
  history,
  signUpSuccess,
  signUpFailure,
  signUpStart,
  phone,
}) => {
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

  const {
    firstName,
    lastName,
    email,
    password,
    encryptionSecret,
    signingSecret,
  } = userCredentials;
  const {
    isPasswordValid,
    isEmailValid,
    isFirstNameValid,
    isLastNameValid,
  } = inputValidation;
  const { phoneNumber, phoneCountryCode } = phone;

  const [register, { data, error }] = useMutation(REGISTER, {
    errorPolicy: 'all',
  });

  const [sendPhoneVerification] = useMutation(SEND_PHONE_VERIFICATION, {
    errorPolicy: 'all',
  });

  if (data?.register) {
    signUpSuccess({ encryptionSecret, signingSecret });
    sendPhoneVerification({
      variables: {
        cmd: { phoneCountryCode, phoneNumber },
      },
    });
  }

  if (error) {
    signUpFailure(error);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      const {
        encryptionSecret,
        encryptionPublicKey,
      } = await generateEncryptionKey(password);
      const { signingSecret, signingPublicKey } = generateSignInKey(password);

      setUserCredentials({
        ...userCredentials,
        encryptionSecret,
        signingSecret,
      });

      const cmd = {
        ...userCredentials,
        encryptionSecret,
        encryptionPublicKey,
        signingSecret,
        signingPublicKey,
        phoneNumber,
        phoneCountryCode,
      };
      signUpStart();
      register({
        variables: {
          cmd,
        },
      });

      history.push('/phone-verification');
    }
  };

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event?.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <RegisterContainer>
      <CardWrapper>
        <SignUpContainer>
          <div className="soby-title">Đăng ký</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <div className="second-col">
                <div>
                  <div className="form-label">First name</div>
                  <FormInput
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    label="Brian"
                  />
                  {!isFirstNameValid ? (
                    <ErrorTitle>The field is required</ErrorTitle>
                  ) : null}
                </div>
                <div>
                  <div className="form-label">Last name</div>
                  <FormInput
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    label="John"
                  />
                  {!isLastNameValid ? (
                    <ErrorTitle>The field is required</ErrorTitle>
                  ) : null}
                </div>
              </div>

              <InputGroup>
                <div className="form-label">Your email</div>
                <FormInput
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  label="Email"
                />
                {!isEmailValid ? (
                  <ErrorTitle>Your email is not correct</ErrorTitle>
                ) : null}
              </InputGroup>

              <InputGroup>
                <div className="form-label">Password</div>
                <FormInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  label="Abcabc123#"
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

              <CustomButton type="submit">Đăng ký</CustomButton>
            </form>
          </FormContainer>
        </SignUpContainer>
        <PolicyNavigate isSignIn />
      </CardWrapper>
    </RegisterContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  phone: selectPhoneNumber,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
  signUpFailure: (error) => dispatch(signUpFailure(error)),
  signUpSuccess: (keyPair) => dispatch(signUpSuccess(keyPair)),
  sendPhoneVerification: () => dispatch(sendPhoneVerification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
