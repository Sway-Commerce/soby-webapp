import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';

import { Container } from './your-transactions.styles';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

import usePhoneNumber from 'shared/hooks/usePhoneNumber';
import { ErrorTitle } from './your-transactions.styles';
import Dropdown from 'components/ui/dropdown/dropdown.component';

const YourTransaction = ({ name }) => {
  const { invoiceId } = useParams();
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const [inputValidation, setInputValidation] = useState({
    isPasswordValid: true,
    isPhoneValid: true,
  });

  // mock
  const [winner, setWinner] = useState('')
  const winnerOptions = ["red", "blue", "draw", "cancelled"]

  const { isPhoneValid } = inputValidation;

  return (
    <Container>
      <div className="box-left">
        <p className="title">
          <b>Thông tin giao hàng</b>
        </p>
        <label htmlFor="">Tên người nhận</label>
        <input type="text" placeholder="Brian Nguyen" />
        <label htmlFor="">Địa chỉ</label>
        <input type="text" placeholder="H3 buidling ... HCMcity" />

        <div className="select-wrapper ">
          <Dropdown
            options={winnerOptions}
            onChange={setWinner}
            value={winner}
          />
        </div>

        <label htmlFor="">Số điện thoại</label>
        <PhoneInput
          country="US"
          international
          withCountryCallingCode
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
        <button>Check out</button>
      </div>
      <ReceiveInvoice hideCheckout />
    </Container>
  );
};

export default YourTransaction;
