import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';

import FormInput from 'components/form-input/form-input.component';
import CustomButton from 'components/custom-button/custom-button.component';
import passwordValidation from 'utils/passwordValidation';
import {
  getHashPassword,
  LOGIN_WITH_PHONE_AND_PASSWORD,
} from 'graphQL/repository/individual.repository';
import {
  phoneSignInStart,
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
import usePhoneNumber from 'custom-hooks/usePhoneNumber';
import { Link } from 'react-router-dom';

const PhoneSignin = ({
  history,
  phone,
  phoneSignInStart,
  signInFailure,
  signInSuccess,
  userKeyPair,
}) => {
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');

  const [password, setPassword] = useState('');
  const [inputValidation, setInputValidation] = useState({
    isPasswordValid: true,
    isPhoneValid: true,
  });
  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const [phoneSignin, { data, error }] = useMutation(LOGIN_WITH_PHONE_AND_PASSWORD, {
    errorPolicy: 'all',
  });

  if (error) {
    signInFailure(error);
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
      phoneSignInStart();
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

const mapDispatchToProps = (dispatch) => ({
  phoneSignInStart: (phoneAndPassword) =>
    dispatch(phoneSignInStart(phoneAndPassword)),
  signInFailure: (error) => dispatch(signInFailure(error)),
  signInSuccess: (payload) => dispatch(signInSuccess(payload)),
});

export default connect(null, mapDispatchToProps)(PhoneSignin);
