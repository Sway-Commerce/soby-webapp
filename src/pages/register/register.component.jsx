/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    name: '',
    email: '',
    dob: '',
    password: '',
    encryptionSecret: '',
    encryptionPublicKey: '',
    signingSecret: '',
    signingPublicKey: '',
  });
  const [inputValidation, setInputValidation] = useState({
    isPasswordValid: true,
    isEmailValid: true,
    isNameValid: true
  });

  const { accessToken, id } = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const dispatchSetRegisterInfo = (userCredentials) =>
    dispatch(setRegisterInfo(userCredentials));

  const { name, email, password } = userCredentials;

  const { isPasswordValid, isEmailValid, isNameValid } =
    inputValidation;

  useEffect(() => {
    if (!!accessToken && id) {
      history.push('/individual-profile');
    }
  }, [accessToken]);

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
      isNameValid: !!name
    });

    if (isPasswordValid && isEmailValid && isNameValid) {
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
                {!isMobileWidth && <h5>Your full legal name</h5>}
                <FormInput
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Full name"
                    withoutTitle={!isMobileWidth}
                  />
              </InputContainer>
              {!isNameValid ? (
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
