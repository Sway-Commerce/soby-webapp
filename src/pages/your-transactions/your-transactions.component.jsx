import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { Container } from './your-transactions.styles';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

import usePhoneNumber from 'shared/hooks/usePhoneNumber';
import { ErrorTitle } from './your-transactions.styles';
import Dropdown from 'components/ui/dropdown/dropdown.component';
import {
  GET_DISTRICT_LIST,
  GET_PROVINCE_LIST,
  GET_WARD_LIST,
} from 'graphQL/repository/invoice.repository';
import { CREATE_SHOP_SHIPPING_LOCATION } from 'graphQL/repository/shipping.repository';
import FormInput from 'components/form-input/form-input.component';

const YourTransaction = ({ history, name }) => {
  const { invoiceId } = useParams();
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [province, setProvince] = useState('71');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');

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

  const [shippingInfo, setShippingInfo] = useState({
    addressLine: '',
  });
  const [inputValidation, setInputValidation] = useState({
    isPhoneValid: true
  });

  useEffect(() => {
    loadDistrictList({
      variables: { provinceId: province },
    });
  }, []);

  const provinceList =
    provinceData?.getProvinceList?.data?.map((x) => ({
      value: x.id,
      label: x.name,
    })) ?? [];

  const districtList =
    districtData?.getDistrictList?.data?.map((x) => ({
      value: x.id,
      label: x.name,
    })) ?? [];
  let wardList =
    wardData?.getWardList?.data?.map((x) => ({ value: x.id, label: x.name })) ??
    [];

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);

  const onSelectDistrictChange = (value) => {
    setDistrict(value);
    if (value) {
      loadWardList({
        variables: { districtId: value },
      });
    }
    wardList = [];
    setWard('');
  };

  const onSelectProvinceChange = (value) => {
    setProvince(value);
    if (value) {
      loadDistrictList({
        variables: { provinceId: value },
      });
    }
    setDistrict('');
    setWard('');
  };

  // /transaction/checkout/:invoiceId

  const { isPhoneValid } = inputValidation;

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
    })
  };

  if (error || districtError || wardError || createShippingLocationError)
    return `Error! ${error || districtError || wardError}`;

  if (createShippingLocationData?.createShopShippingLocation?.data) {
    console.log(createShippingLocationData?.createShopShippingLocation?.data);
  }

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event?.target;

    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  return (
    <Container>
      <div className="box-left">
        <p className="title">
          <b>Thông tin giao hàng</b>
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Tên người nhận</label>
          <FormInput
            type="text"
            name="addressLine"
            value={shippingInfo.addressLine}
            onChange={handleChange}
            label="Tên người nhận"
          />
          <label htmlFor="">Địa chỉ</label>
          <input type="text" placeholder="Hồ Chí Minh city" />

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
      </div>
      <ReceiveInvoice hideCheckout />
    </Container>
  );
};

export default withRouter(YourTransaction);
