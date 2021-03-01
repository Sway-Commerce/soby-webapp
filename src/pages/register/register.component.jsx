import React, { useState } from 'react';
// import { connect } from 'react-redux';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import usePhoneNumber from '../../custom-hooks/usePhoneNumber';
import passwordValidation from '../../utils/passwordValidation';
import emailValidation from '../../utils/emailValidation';

// import { signUpStart } from '../../redux/user/user.actions';

import {
  SignUpContainer,
  SignUpTitle,
  ControlTitle,
  Gap,
  ErrorTitle,
} from './register.styles';

const Register = () => {
  const [userCredentials, setUserCredentials] = useState({
    phoneNumberIntl: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });

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
    phoneNumberIntl,
  } = userCredentials;
  const { countryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const { isPhoneValid, isPasswordValid, isEmailValid } = inputValidation;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setInputValidation({
      ...inputValidation,
      isPhoneValid: isPossiblePhoneNumber(phoneNumberIntl),
      isPasswordValid: passwordValidation(password),
      isEmailValid: emailValidation(email),
    });

    console.log({ phoneNumber, countryCode });

    // signUpStart({ displayName, email, password });
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
          onChange={(value) =>
            setUserCredentials({ ...userCredentials, phoneNumberIntl: value })
          }
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

// const mapDispatchToProps = dispatch => ({
//   signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
// });

export default Register;
// export default connect(
//   null,
//   mapDispatchToProps
// )(SignUp);
