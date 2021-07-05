import React from 'react';
import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';
import phoneImg from 'shared/assets/phone-circle.svg';

const PhoneBtn = styled.div`
  height: 2rem;
  background: ${mainColor};
  padding: 0.2rem 0.6rem;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  img.phone-icon {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.5rem;
  }
  .btn-click {
    font-size: 0.7rem;
    text-transform: uppercase;
    flex: 1;
    text-align: right;
    margin-left: ${(props) => (props.wide ? '1.2rem' : '0')};;
  }
  margin-top: 1rem;
  @media screen and (max-width: 600px) {
    display: ${(props) => (props.hide ? 'flex' : 'none')};
  }
`;

const PhoneButton = ({
  togglePhone,
  phoneNumber,
  phoneNumberCovered,
  setTogglePhone,
  showText,
  hideText,
  ...rest
}) => {
  return (
    <PhoneBtn {...rest}>
      <img className="phone-icon" src={phoneImg} alt="" />
      <p>{togglePhone ? phoneNumber : phoneNumberCovered}</p>
      <p className="btn-click" onClick={() => setTogglePhone(!togglePhone)}>
        {togglePhone ? hideText : showText}
      </p>
    </PhoneBtn>
  );
};

export default PhoneButton;
