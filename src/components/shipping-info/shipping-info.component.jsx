import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { mainColor } from 'shared/css-variable/variable';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  GET_DISTRICT_LIST,
  GET_PROVINCE_LIST,
  GET_WARD_LIST,
} from 'graphQL/repository/invoice.repository';
import { CREATE_SHOP_SHIPPING_LOCATION } from 'graphQL/repository/shipping.repository';
import usePhoneNumber from 'shared/hooks/usePhoneNumber';
import FormInput from 'components/form-input/form-input.component';
import Dropdown from 'components/ui/dropdown/dropdown.component';
import PhoneInput from 'react-phone-number-input';
import Checkbox from 'components/ui/checkbox/checkbox.component';

export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;

export const Container = styled.div`
  padding: 40px 48px;
  width: 751px;
  h2 {
    margin-bottom: 24px;
  }

  .col {
    display: flex;
    flex-direction: column;
  }

  .mar-left {
    margin-left: 60px;
  }

  input[type='text'] {
    background: none;
    width: 100%;
    outline: 0;
    border-width: 0 0 2px;
    border-color: rgb(0, 0, 0, 0.08);
    padding: 6px 0;
    font-size: 18px;
    margin: 8px 0 24px 0;
  }

  .PhoneInput {
    margin: 10px 0 24px 0;
  }

  button {
    width: 100%;
    color: ${mainColor};
    font-size: 18px;
    font-weight: 500;
    background-color: #f1f1f1;
    border: 0;
    outline: 0;
    padding: 14px 0;
    margin-top: 40px;
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(196, 196, 196, 0.2);
  }

  .select-wrapper {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(2, 1fr);
    margin: 0 0 20px;
  }

  .checkbox-wrapper {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(3, 1fr);
    * {
      margin: auto 0;
    }
  }

  .title {
    margin: 24px 0 16px;
  }
`;

const ShippingInfo = ({ invoiceId }) => {
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [province, setProvince] = useState('71');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    addressLine: '',
    locationName: '',
  });
  const [inputValidation, setInputValidation] = useState({
    isPhoneValid: true,
    locationNameValid: true,
    addressLineValid: true,
  });
  const [codChecked, setCod] = useState(true);
  const [bankChecked, setBank] = useState(false);
  const [creditChecked, setCredit] = useState(false);

  const { error, data: provinceData } = useQuery(GET_PROVINCE_LIST);

  const [
    loadDistrictList,
    { error: districtError, data: districtData },
  ] = useLazyQuery(GET_DISTRICT_LIST);
  const [loadWardList, { error: wardError, data: wardData }] = useLazyQuery(
    GET_WARD_LIST
  );

  const [
    createShippingLocation,
    { data: createShippingLocationData, error: createShippingLocationError },
  ] = useMutation(CREATE_SHOP_SHIPPING_LOCATION, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    loadDistrictList({
      variables: { provinceId: province },
    });
  }, []);

  const mapData = (data) =>
    data?.map((x) => ({
      value: x.id,
      label: x.name,
    })) ?? [];

  let wardList = mapData(wardData?.getWardList?.data);
  const provinceList = mapData(provinceData?.getProvinceList?.data);
  const districtList = mapData(districtData?.getDistrictList?.data);
  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const { isPhoneValid } = inputValidation;
  const onSelectDistrictChange = (value) => {
    setDistrict(value);
    wardList = [];
    setWard('');
    if (value) {
      loadWardList({
        variables: { districtId: value },
      });
    }
  };
  const onSelectProvinceChange = (value) => {
    setDistrict('');
    setWard('');
    setProvince(value);
    if (value) {
      loadDistrictList({
        variables: { provinceId: value },
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    createShippingLocation({
      variables: {
        cmd: {
          locationName: shippingInfo.addressLine,
          phoneCountryCode,
          phoneNumber,
          country: 'VN',
          province,
          district,
          ward,
          addressLine: shippingInfo.addressLine,
          defaultLocation: true,
        },
      },
    });
  };

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event?.target;

    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCheckbox = (event) => {
    if (!event) {
      return;
    }

    const { name, checked: value } = event?.target;

    switch (name) {
      case 'cod':
        setCod(value);
        if (value) {
          setBank(false);
          setCredit(false);
        }
        break;
      case 'bank':
        setBank(value);
        if (value) {
          setCod(false);
          setCredit(false);
        }
        break;
      case 'credit':
        setCredit(value);
        if (value) {
          setCod(false);
          setBank(false);
        }
        break;
      default:
    }
  };

  if (error || districtError || wardError || createShippingLocationError)
    return `Error! ${error || districtError || wardError}`;

  if (createShippingLocationData?.createShopShippingLocation?.data) {
    console.log(createShippingLocationData?.createShopShippingLocation?.data);
  }

  return (
    <Container>
      <h2>Shipping information</h2>
      <form onSubmit={handleSubmit}>
        <p className="title">
          <b>Hình thức thanh toán</b>
        </p>
        <div className="checkbox-wrapper">
          <Checkbox
            handleChange={handleCheckbox}
            name="cod"
            checked={codChecked}
            label="COD"
          />
          <Checkbox
            handleChange={handleCheckbox}
            name="bank"
            checked={bankChecked}
            label="Bank transfer"
          />
          <Checkbox
            handleChange={handleCheckbox}
            name="credit"
            checked={creditChecked}
            label="Credit card"
          />
        </div>
        <p className="title">
          <b>Thông tin giao hàng</b>
        </p>
        <label htmlFor="">Tên người nhận</label>
        <FormInput
          type="text"
          name="locationName"
          value={shippingInfo.locationName}
          onChange={handleChange}
        />
        <label htmlFor="">Địa chỉ</label>
        <FormInput
          type="text"
          name="addressLine"
          value={shippingInfo.addressLine}
          onChange={handleChange}
        />

        <div className="select-wrapper">
          {provinceList?.length ? (
            <Dropdown
              options={provinceList}
              onChange={onSelectProvinceChange}
              value={province}
            />
          ) : null}
          <Dropdown
            options={districtList}
            onChange={onSelectDistrictChange}
            value={district}
          />
          <Dropdown options={wardList} onChange={setWard} value={ward} />
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
        <button>Next</button>
      </form>
    </Container>
  );
};

export default ShippingInfo;
