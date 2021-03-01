import React, { useState } from 'react';
// import { connect } from 'react-redux';
import PhoneInput from 'react-phone-number-input';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

// import { signUpStart } from '../../redux/user/user.actions';

import {
  SignUpContainer,
  SignUpTitle,
  ControlTitle,
  Gap
} from './register.styles';

const Register = () => {
  const [userCredentials, setUserCredentials] = useState({
    phoneNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const { firstName, lastName, email, password, phoneNumber } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log({ firstName, lastName, email, password, phoneNumber });

    // signUpStart({ displayName, email, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignUpContainer>
      <SignUpTitle>Create account</SignUpTitle>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <ControlTitle>Your phone numbers</ControlTitle>
        <PhoneInput
          international
          defaultCountry="VN"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
        />
        <ControlTitle>Your password</ControlTitle>
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Abcabc123#"
          required
        />
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
        <Gap/>
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
