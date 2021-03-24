import React, { useState } from 'react';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { connect } from 'react-redux';

import CustomButton from 'components/custom-button/custom-button.component';
import usePhoneNumber from 'custom-hooks/usePhoneNumber';

import { setUserPhoneNumber } from 'redux/user/user.actions';

import {
  SignUpContainer,
  ErrorTitle,
  CardWrapper,
  RegisterContainer,
  FormContainer,
} from './register-phone.styles';

import PolicyNavigate from 'components/policy-navigate/policy-navigate.component';

const RegisterPhone = ({ history, setUserPhoneNumber }) => {
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');

  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPhoneValid = isPossiblePhoneNumber(phoneNumberIntl);

    setIsPhoneValid(isPhoneValid);

    if (isPhoneValid) {
      setUserPhoneNumber({ phoneCountryCode, phoneNumber });
      history.push('/signup-info');
    }
  };

  return (
    <RegisterContainer>
      <CardWrapper>
        <SignUpContainer>
          <div className="soby-title">Đăng ký</div>
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
              <CustomButton>Đăng ký</CustomButton>
              <PolicyNavigate isSignIn />
            </form>
          </FormContainer>
        </SignUpContainer>
      </CardWrapper>
    </RegisterContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUserPhoneNumber: (payload) => dispatch(setUserPhoneNumber(payload)),
});

export default connect(null, mapDispatchToProps)(RegisterPhone);
