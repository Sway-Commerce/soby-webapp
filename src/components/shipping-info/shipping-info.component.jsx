/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { mainColor } from 'shared/css-variable/variable';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  GET_DISTRICT_LIST,
  GET_PROVINCE_LIST,
  GET_WARD_LIST,
  UPDATE_INVOICE_INDIVIDUAL_INFO,
} from 'graphQL/repository/invoice.repository';
import {
  CREATE_INDIVIDUAL_SHIPPING_LOCATION,
  GET_INDIVIDUAL_SHIPPING_LOCATION_LIST,
} from 'graphQL/repository/shipping.repository';
import { CREATE_INVOICE_PAYMENT } from 'graphQL/repository/transaction.repository';

import usePhoneNumber from 'shared/hooks/usePhoneNumber';
import FormInput from 'components/form-input/form-input.component';
import Dropdown from 'components/ui/dropdown/dropdown.component';
import PhoneInput from 'react-phone-number-input';
import Checkbox from 'components/ui/checkbox/checkbox.component';
import Spinner from 'components/ui/spinner/spinner.component';
import { useSelector } from 'react-redux';
import { signSignature } from 'graphQL/repository/individual.repository';

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

const ShippingInfo = ({ invoiceIndividualId }) => {
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [provinceId, setProvince] = useState('71');
  const [districtId, setDistrict] = useState('');
  const [wardId, setWard] = useState('');
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
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [shippingLocationId, setShippingLocationId] = useState('');
  const signing = useSelector((state) => {
    return state.user.signing;
  });

  const [
    loadProvince,
    { error, data: provinceData, loading: provinceLoading },
  ] = useLazyQuery(GET_PROVINCE_LIST);

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);

  const [
    loadDistrictList,
    {
      error: districtError,
      data: districtData,
      loading: loadDistrictListLoading,
    },
  ] = useLazyQuery(GET_DISTRICT_LIST);
  const [loadWardList, { error: wardError, data: wardData }] = useLazyQuery(
    GET_WARD_LIST
  );

  const {
    error: getIndividualShippingListError,
    data: getIndividualShippingListData,
  } = useQuery(GET_INDIVIDUAL_SHIPPING_LOCATION_LIST);

  const [
    createShippingLocation,
    {
      data: createShippingLocationData,
      error: createShippingLocationError,
      loading: createShippingLocationLoading,
    },
  ] = useMutation(CREATE_INDIVIDUAL_SHIPPING_LOCATION, {
    errorPolicy: 'all',
  });

  const [
    updateInvoiceIndividualInfo,
    {
      data: updateInvoiceIndividualInfoData,
      error: updateInvoiceIndividualInfoError,
      loading: updateInvoiceIndividualInfoLoading,
    },
  ] = useMutation(UPDATE_INVOICE_INDIVIDUAL_INFO, {
    errorPolicy: 'all',
  });

  const [
    createInvoicePayment,
    {
      data: createInvoicePaymentData,
      error: createInvoicePaymentError,
      loading: createInvoicePaymentLoading,
    },
  ] = useMutation(CREATE_INVOICE_PAYMENT, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (invoiceIndividualId) {
      loadProvince();
      loadDistrictList({
        variables: { provinceId: provinceId },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceIndividualId]);

  useEffect(() => {
    if (createShippingLocationData?.createIndividualShippingLocation?.data) {
      const shippingLocationId =
        createShippingLocationData?.createIndividualShippingLocation?.data?.id;
      updateInvoiceIndividualInfo({
        variables: {
          cmd: {
            shippingLocationId,
            invoiceIndividualId,
            paymentMethod,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createShippingLocationData?.createIndividualShippingLocation?.data]);

  const mapData = (data) =>
    data?.map((x) => ({
      value: x.id,
      label: x.name,
    })) ?? [];

  const mapShippingData = (data) =>
    data?.map((x) => ({
      value: x.id,
      label: x.locationName,
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

  useEffect(() => {
    if (updateInvoiceIndividualInfoData?.updateInvoiceIndividualInfo?.data) {
      debugger;
      const requestedAt = Date.now();
      const jsonString = JSON.stringify({ invoiceIndividualId, requestedAt });
      const signature = signSignature(signing, jsonString);
      createInvoicePayment({
        variables: {
          cmd: {
            invoiceIndividualId,
            requestedAt,
            signature,
          },
        },
      });
    }
  }, [updateInvoiceIndividualInfoData?.updateInvoiceIndividualInfo?.data]);

  const { isPhoneValid } = inputValidation;

  if (
    updateInvoiceIndividualInfoLoading ||
    provinceLoading ||
    loadDistrictListLoading ||
    createShippingLocationLoading
  ) {
    return <Spinner />;
  }

  if (
    error ||
    districtError ||
    wardError ||
    createShippingLocationError ||
    updateInvoiceIndividualInfoError
  )
    return `Error! ${
      error || districtError || wardError || updateInvoiceIndividualInfoError
    }`;

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

    // d5cad2df-201a-4ef9-b8ab-4fd09114a4b3

    console.log({
      locationName: shippingInfo.addressLine,
      phoneCountryCode,
      phoneNumber,
      country: 'VN',
      province,
      district,
      ward,
      addressLine: shippingInfo.addressLine,
      defaultLocation: true,
    });

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
          setPaymentMethod('COD');
        }
        break;
      case 'bank':
        setBank(value);
        if (value) {
          setCod(false);
          setCredit(false);
          setPaymentMethod('BANK');
        }
        break;
      case 'credit':
        setCredit(value);
        if (value) {
          setCod(false);
          setBank(false);
          setPaymentMethod('CREDIT');
        }
        break;
      default:
    }
  };

  if (createShippingLocationData?.createShopShippingLocation?.data) {
    console.log(createShippingLocationData?.createShopShippingLocation?.data);
  }

  if (createShippingLocationData?.createIndividualShippingLocation?.data) {
    // invoiceIndividualId: String!
    // shippingLocationId: String!
    // paymentMethod: OrderPaymentMethod!
    const shippingLocationId =
      createShippingLocationData?.createIndividualShippingLocation?.data?.id;
    updateInvoiceIndividualInfo({
      variables: {
        cmd: {
          shippingLocationId,
          invoiceIndividualId,
          paymentMethod,
        },
      },
    });
  }

  const handleSubmitHadShipping = () => {
    updateInvoiceIndividualInfo({
      variables: {
        cmd: {
          shippingLocationId,
          invoiceIndividualId,
          paymentMethod,
        },
      },
    });
  };

  return (
    <Container>
      <h2>Shipping information</h2>
      <form
        onSubmit={invoiceIndividualId ? handleSubmitHadShipping : handleSubmit}
      >
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
        {getIndividualShippingListData?.getIndividualShippingLocationList
          ?.data ? (
          <Dropdown
            options={mapShippingData(
              getIndividualShippingListData?.getIndividualShippingLocationList
                ?.data
            )}
            onChange={setShippingLocationId}
            value={shippingLocationId}
          />
        ) : (
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
        )}

        {!isPhoneValid ? (
          <ErrorTitle>Your phone number is not correct</ErrorTitle>
        ) : null}
        <button
          className={
            getIndividualShippingListData?.getIndividualShippingLocationList
              ?.data && !shippingLocationId
              ? 'disable'
              : null
          }
        >
          Next
        </button>
      </form>
    </Container>
  );
};

export default ShippingInfo;
