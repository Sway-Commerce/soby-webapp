/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { mainColor } from 'shared/css-variable/variable';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_DISTRICT_LIST,
  GET_PROVINCE_LIST,
  GET_WARD_LIST,
} from 'graphQL/repository/invoice.repository';
import {
  CREATE_INDIVIDUAL_SHIPPING_LOCATION,
} from 'graphQL/repository/shipping.repository';

import usePhoneNumber from 'shared/hooks/usePhoneNumber';
import FormInput from 'components/form-input/form-input.component';
import Dropdown from 'components/ui/dropdown/dropdown.component';
import PhoneInput from 'react-phone-number-input';
import Spinner from 'components/ui/spinner/spinner.component';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

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

  button.shipping-button {
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
    &.disable {
      pointer-events: none;
      color: white;
    }
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

export const InputGroup = styled.div`
  margin-top: 32px;
`;

const CreateShipping = ({ setOpenCreate }) => {
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [provinceId, setProvince] = useState('79');
  const [districtId, setDistrict] = useState('');
  const [wardId, setWard] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    addressLine: '',
    locationName: '',
  });
  const [inputValidation, setInputValidation] = useState({
    isPhoneValid: true,
  });
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    isPhoneValid,
  } = inputValidation;

  const [
    loadProvince,
    { data: provinceData, error: loadProvinceError },
  ] = useLazyQuery(GET_PROVINCE_LIST);

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);

  const [
    loadDistrictList,
    {
      data: districtData,
      error: loadDistrictListError,
    },
  ] = useLazyQuery(GET_DISTRICT_LIST);
  const [loadWardList, { data: wardData }] = useLazyQuery(GET_WARD_LIST);

  const [
    createShippingLocation,
    {
      data: createShippingLocationData,
      loading: createShippingLocationLoading,
      error: createShippingLocationError,
    },
  ] = useMutation(CREATE_INDIVIDUAL_SHIPPING_LOCATION, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (
      loadProvinceError?.message ||
      loadDistrictListError?.message ||
      createShippingLocationError?.message
    ) {
      setFormError(
        loadProvinceError?.message ??
          loadDistrictListError?.message ??
          createShippingLocationError?.message
      );
      setOpen(true);
    }
  }, [
    loadProvinceError?.message,
    loadDistrictListError?.message,
    createShippingLocationError?.message,
  ]);

  useEffect(() => {
    loadProvince();
    loadDistrictList({
      variables: { provinceId: provinceId },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (createShippingLocationData?.createIndividualShippingLocation?.data) {
      setOpenCreate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createShippingLocationData?.createIndividualShippingLocation?.data]);

  const mapData = (data) =>
    data?.map((x) => ({
      value: x.id,
      label: x.fullName,
    })) ?? [];

  useEffect(() => {
    setWardList(
      wardData?.getWardList?.data ? mapData(wardData?.getWardList?.data) : []
    );
  }, [wardData?.getWardList?.data]);

  useEffect(() => {
    setProvinceList(
      provinceData?.getProvinceList?.data
        ? mapData(provinceData?.getProvinceList?.data)
        : []
    );
  }, [provinceData?.getProvinceList?.data]);

  useEffect(() => {
    setDistrictList(
      districtData?.getDistrictList?.data
        ? mapData(districtData?.getDistrictList?.data)
        : []
    );
  }, [districtData?.getDistrictList?.data]);

  const onSelectDistrictChange = (value) => {
    setDistrict(value);
    setWardList([]);
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

    const province = provinceList?.find((x) => x.value === provinceId)?.label;
    const district = districtList?.find((x) => x.value === districtId)?.label;
    const ward = wardList?.find((x) => x.value === wardId)?.label;

    createShippingLocation({
      variables: {
        cmd: {
          locationName: shippingInfo.locationName,
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

  return createShippingLocationLoading ? (
    <Spinner />
  ) : (
    <Container>
      <h2>New Shipping address</h2>
      <form onSubmit={handleSubmit}>
        <React.Fragment>
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
                value={provinceId}
              />
            ) : null}
            <Dropdown
              options={districtList}
              onChange={onSelectDistrictChange}
              value={districtId}
            />
            <Dropdown options={wardList} onChange={setWard} value={wardId} />
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
        </React.Fragment>

        {!isPhoneValid ? (
          <ErrorTitle>Your phone number is not correct</ErrorTitle>
        ) : null}
        <button className={'shipping-button'}>Add</button>
      </form>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </Container>
  );
};

export default CreateShipping;
