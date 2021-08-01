import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import SVG from 'react-inlinesvg';
import phoneValidation from 'shared/utils/phoneValidation';
import passwordValidation from 'shared/utils/passwordValidation';
import emailValidation from 'shared/utils/emailValidation';
import { toAbsoluteUrl } from 'shared/utils/assetsHelper';
// import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { FormInput, FormTextArea, createSellerTabs } from './create-seller.page';
import { Upload, Modal } from 'antd';

const UploadBtn = function ({ ...props }) {
  return (
    <div
      className='d-flex flex-wrap justify-content-center align-items-center bg-light rounded p-2'
      style={{ width: '128px', height: '128px', backgroundColor: '#F3F4F4' }}
    >
      <div className=''>
        <div className='d-inline-block text-center mb-1'>
          <div
            className='d-flex rounded-circle align-middle justify-content-center align-items-center'
            style={{ width: '48px', height: '48px', backgroundColor: '#3D494B' }}
          >
            <SVG src={toAbsoluteUrl('/assets/camera.svg')}></SVG>
          </div>
        </div>
        <div style={{ lineHeight: '.8rem' }}>
          <span style={{ fontSize: '12px', whiteSpace: 'pre-line' }}>Upload business logo</span>
        </div>
      </div>
    </div>
  );
};

export function BasicInfo({ ...props }) {
  const { getBasicInfo, basicInfo, generateEncryptionKey, generateSignInKey } = props;
  const [businessName, setBusinessName] = useState(basicInfo.businessName);
  const [owner, setOwner] = useState(basicInfo.owner);
  const [password, setPassword] = useState(basicInfo.password);
  const [phoneNumber, setPhoneNumber] = useState(basicInfo.phoneNumber);
  const [email, setEmail] = useState(basicInfo.email);
  const [intro, setIntro] = useState(basicInfo.intro);
  const [inputValidation, setInputValidation] = useState({
    isBusinessNameValid: true,
    isPasswordValid: true,
    isPhoneValid: true,
    isEmailValid: true,
  });
  const [fileList, setFileList] = useState([]);

  const { isBusinessNameValid, isPasswordValid, isPhoneValid, isEmailValid } = inputValidation;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isPasswordValid = passwordValidation(password);
    const isPhoneValid = phoneValidation(phoneNumber);
    const isEmailValid = emailValidation(email);
    const isBusinessNameValid = !!businessName;

    setInputValidation({
      isBusinessNameValid: isBusinessNameValid,
      isPasswordValid: isPasswordValid,
      isPhoneValid: isPhoneValid,
      isEmailValid: isEmailValid,
    });

    if (isPasswordValid && isPhoneValid && isEmailValid && !!businessName) {
      const { encryptionSecret, encryptionPublicKey } = await generateEncryptionKey(password);
      const { signingSecretKey, signingPublicKey } = generateSignInKey(password);

      getBasicInfo(
        {
          businessName,
          owner,
          phoneNumber,
          email,
          intro,
          encryptionPublicKey,
          encryptionSecret,
          signingPublicKey,
          signingSecretKey,
          password,
        },
        createSellerTabs.shopChannel.key,
        { 1: { state: 'done' }, 2: { state: 'active' } }
      );
    }
  };

  return (
    <div aria-label='basic-info' className=''>
      <div aria-label='title' className='text-center'>
        <h3 className='fw-bold' style={{ fontSize: '24px' }}>
          Bắt đầu với những thông tin cơ bản
        </h3>
      </div>
      {/* <div aria-label='upload-profile-img' className='d-flex justify-content-center text-center'>
        <Upload>{fileList.length === 0 && UploadBtn}</Upload>
      </div> */}
      <div aria-label='basic-info-form' className='mt-3'>
        <form>
          <FormInput
            key='businessname'
            label='Tên doanh nghiệp'
            initialValue={businessName}
            onChange={function (evt) {
              setBusinessName(evt.target.value);
            }}
          />
          {!isBusinessNameValid ? <p className='error-title'>*Tên không được để trống</p> : null}
          <FormInput
            label='Chủ sỡ hữu'
            initialValue={owner}
            onChange={function (evt) {
              setOwner(evt.target.value);
            }}
          />
          <FormInput
            key='password'
            label='Mật khẩu'
            inputType='password'
            initialValue={password}
            onChange={function (evt) {
              if (!evt) {
                return;
              }
              setPassword(evt.target.value);
            }}
          />
          {!isPasswordValid ? (
            <p className='error-title'>* Mật khẩu của bạn phải từ 8-20 kí tự, ít nhất 1 chữ cái, 1 chữ viết hoa, 1 chữ cái đặc biệt</p>
          ) : (
            <p className='fs-14'>* Mật khẩu của bạn phải từ 8-20 kí tự, ít nhất 1 chữ cái, 1 chữ viết hoa, 1 chữ cái đặc biệt</p>
          )}
          <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Thông tin liên hệ
          </h4>
          <FormInput
            label='Số điện thoại'
            initialValue={phoneNumber}
            onChange={function (evt) {
              if (!evt) {
                return;
              }
              setPhoneNumber(evt.target.value);
            }}
          />
          {!isPhoneValid ? <p className='error-title'>* Số điện thoại bạn không đúng format</p> : null}
          <FormInput
            label='Email'
            initialValue={email}
            onChange={function (evt) {
              if (!evt) {
                return;
              }
              setEmail(evt.target.value);
            }}
          />
          {!isEmailValid ? <p className='error-title'>* Email bạn không đúng format</p> : null}
          <FormTextArea
            label='Giới thiệu'
            rows={3}
            initialValue={intro}
            onChange={function (evt) {
              if (!evt) {
                return;
              }
              setIntro(evt.target.value);
            }}
          />
        </form>
        <div aria-label='button-row' className='row mt-3 '>
          <div className='d-flex justify-content-center align-items-center'>
            <button
              type='button'
              className='btn btn-primary rounded-pill d-flex justify-content-center px-3 align-items-center'
              style={{ fontSize: '14px', height: '40px' }}
              onClick={handleSubmit}
            >
              <span>Tiếp theo</span>
              <SVG
                className='ms-1'
                src={toAbsoluteUrl('/assets/commons/vector-right.svg')}
                style={{ fill: '#ffffff', marginTop: '1px', width: '20px', height: '20px' }}
              ></SVG>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
