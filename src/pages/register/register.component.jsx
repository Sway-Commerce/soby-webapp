/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from 'components/form-input/form-input.component';
import CustomButton from 'components/ui/custom-button/custom-button.component';
import passwordValidation from 'shared/utils/passwordValidation';
import emailValidation from 'shared/utils/emailValidation';
import {
  generateEncryptionKey,
  generateSignInKey,
} from 'graphQL/repository/individual.repository';
import { setRegisterInfo } from 'redux/user/user.actions';

import {
  SignUpContainer,
  CardWrapper,
  RegisterContainer,
  FormContainer,
  InputContainer,
  NameContainer,
} from './register.styles';
import PolicyNavigate from 'components/policy-navigate/policy-navigate.component';

const Register = ({ history }) => {
  const [isMobileWidth, setIsMobileWidth] = useState(window.innerWidth < 760);

  const [userCredentials, setUserCredentials] = useState({
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
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

  const dispatchSetRegisterInfo = (userCredentials) =>
    dispatch(setRegisterInfo(userCredentials));

  const { firstName, lastName, middleName, email, password } = userCredentials;

  const { isPasswordValid, isEmailValid, isFirstNameValid, isLastNameValid } =
    inputValidation;

  useEffect(() => {
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (
      userCredentials.encryptionSecret &&
      userCredentials.encryptionPublicKey &&
      userCredentials.signingPublicKey &&
      userCredentials.signingSecret
    ) {
      dispatchSetRegisterInfo(userCredentials);
      history.push('/signup-info');
    }
  }, [
    userCredentials.encryptionSecret,
    userCredentials.encryptionPublicKey,
    userCredentials.signingPublicKey,
    userCredentials.signingSecret,
  ]);

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

    if (isPasswordValid && isEmailValid && firstName && lastName) {
      const { encryptionSecret, encryptionPublicKey } =
        await generateEncryptionKey(password);

      const { signingSecretKey, signingPublicKey } =
        generateSignInKey(password);

      setUserCredentials({
        ...userCredentials,
        encryptionSecret,
        signingSecret: signingSecretKey,
        encryptionPublicKey,
        signingPublicKey,
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

  const update = () => {
    setIsMobileWidth(window.innerWidth < 760);
  };

  return (
    <RegisterContainer>
      <CardWrapper>
        <SignUpContainer>
          <div className="soby-title">Welcome to Soby</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                label="Email address"
                placeholder="sample@mail.com"
              />
              {!isEmailValid ? (
                <p className="error-title">*Your email is not correct</p>
              ) : null}
              <InputContainer>
                {!isMobileWidth && <h5>Your Name</h5>}

                <NameContainer>
                  <FormInput
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    label="First name"
                    withoutTitle={!isMobileWidth}
                  />

                  <FormInput
                    type="text"
                    name="middleName"
                    value={middleName}
                    onChange={handleChange}
                    placeholder="Middle Name"
                    label="Middle Name"
                    withoutTitle={!isMobileWidth}
                  />

                  <FormInput
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    label="Last name"
                    withoutTitle={!isMobileWidth}
                  />
                </NameContainer>
              </InputContainer>
              {!isFirstNameValid ? (
                <p className="error-title">*The field is required</p>
              ) : null}
              {!isLastNameValid ? (
                <p className="error-title">*The field is required</p>
              ) : null}

              <InputContainer>
                <FormInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  label="Password"
                  placeholder="*********"
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
    </RegisterContainer>
  );
};

export default Register;
