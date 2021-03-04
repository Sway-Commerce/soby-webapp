import React, { useState } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import usePhoneNumber from '../../custom-hooks/usePhoneNumber';
import passwordValidation from '../../utils/passwordValidation';
import emailValidation from '../../utils/emailValidation';
import { REGISTER } from '../../repository/individual.repository';
import {
  generateEncryptionKey,
  generateSignInKey,
} from '../../utils/generateKeyPair';
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from '../../redux/user/user.actions';

import {
  SignUpContainer,
  SignUpTitle,
  ControlTitle,
  Gap,
  ErrorTitle,
} from './register.styles';

const Register = ({ signUpSuccess, signUpFailure, signUpStart }) => {
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

  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');

  const [inputValidation, setInputValidation] = useState({
    isPhoneValid: true,
    isPasswordValid: true,
    isEmailValid: true,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    encryptionSecret,
    signingSecret,
  } = userCredentials;
  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const { isPhoneValid, isPasswordValid, isEmailValid } = inputValidation;
  const [register, { data, error }] = useMutation(REGISTER, {
    errorPolicy: 'all',
  });

  if (data?.register) {
    signUpSuccess({ encryptionSecret, signingSecret });
  }

  if (error) {
    signUpFailure(error);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPhoneValid = isPossiblePhoneNumber(phoneNumberIntl);
    const isPasswordValid = passwordValidation(password);
    const isEmailValid = emailValidation(email);

    setInputValidation({
      ...inputValidation,
      isPhoneValid,
      isPasswordValid,
      isEmailValid,
    });

    if (isPhoneValid && isPasswordValid && isEmailValid) {
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
    <SignUpContainer>
      <SignUpTitle>Create account</SignUpTitle>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <ControlTitle>Your phone numbers</ControlTitle>
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
          <ErrorTitle>Your phone number is not correct</ErrorTitle>
        ) : null}
        <ControlTitle>Your password</ControlTitle>
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
            Your password must be between 6 to 20 characters which contain at
            least one numeric digit, one uppercase and one lowercase letter
          </ErrorTitle>
        ) : null}
        <div className="second-col">
          <div>
            <ControlTitle>First name</ControlTitle>
            <FormInput
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              label="Brian"
            />
          </div>
          <div>
            <ControlTitle>Last name</ControlTitle>
            <FormInput
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              label="John"
            />
          </div>
        </div>
        <ControlTitle>Your email</ControlTitle>
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
        <Gap />
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </SignUpContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
  signUpFailure: (error) => dispatch(signUpFailure(error)),
  signUpSuccess: (keyPair) => dispatch(signUpSuccess(keyPair)),
});

export default connect(null, mapDispatchToProps)(Register);
