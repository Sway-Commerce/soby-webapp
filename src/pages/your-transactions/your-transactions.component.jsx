import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';

import { Container } from './your-transactions.styles';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

import usePhoneNumber from 'custom-hooks/usePhoneNumber';
import { ErrorTitle } from './your-transactions.styles';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const YourTransaction = ({ name }) => {
  const { invoiceId } = useParams();
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const [inputValidation, setInputValidation] = useState({
    isPasswordValid: true,
    isPhoneValid: true,
  });

  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="select-wrapper ">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="select-wrapper ">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
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
