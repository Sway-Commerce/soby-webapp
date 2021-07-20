import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import SVG from 'react-inlinesvg';
import phoneValidation from 'shared/utils/phoneValidation'
import passwordValidation from 'shared/utils/passwordValidation';
import emailValidation from 'shared/utils/emailValidation';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { FormInput, FormTextArea, createSellerTabs } from './create-seller.page';

export function BasicInfo({ ...props }) {
  const { getBasicInfo, basicInfo } = props;
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
    isEmailValid: true
  });
  console.log(basicInfo);

  const { isBusinessNameValid, isPasswordValid, isPhoneValid, isEmailValid } = inputValidation

  const handleSubmit = async(event) => {
    event.preventDefault();
    const isPasswordValid = passwordValidation(password);
    const isPhoneValid = phoneValidation(phoneNumber);
    const isEmailValid = emailValidation(email)
    const isBusinessNameValid = !!businessName

    setInputValidation({
      isBusinessNameValid: isBusinessNameValid,
      isPasswordValid: isPasswordValid,
      isPhoneValid: isPhoneValid,
      isEmailValid: isEmailValid
    });

    if (isPasswordValid && isPhoneValid && isEmailValid && !!businessName) {
      getBasicInfo({ businessName, owner, phoneNumber, email, intro }, createSellerTabs.shopChannel.label);
    }
  }

  return (
    <div aria-label='basic-info' className=''>
      <div aria-label='title' className='text-center'>
        <h3 className='fw-bold' style={{ fontSize: '24px' }}>
          Let's get you started with some basic info
        </h3>
      </div>
      <div aria-label='upload-profile-img' className='d-flex justify-content-center text-center'>
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
      </div>
      <div aria-label='basic-info-form' className='mt-3'>
        <form>
          <FormInput
            key='businessname'
            label='Business Name'
            initialValue={businessName}
            onChange={function (evt) {
              setBusinessName(evt.target.value);
            }} />
            {!isBusinessNameValid ? (
                <p className="error-title">*Your name must not be empty</p>
              ) : null}
          <FormInput
            label='Owner'
            initialValue={owner}
            onChange={function (evt) {
              setOwner(evt.target.value);
            }}/>
          <FormInput
            key='passowrd'
            label='Password'
            type='password'
            initialValue={password}
            onChange={function (evt) {
              if (!evt) {
                return;
              }
              setPassword(evt.target.value);
            }}/>
          {!isPasswordValid ? (
            <p className="error-title">
              *Your password must be between 8 to 20 characters which
              contain at least one numeric digit, one uppercase and one
              lowercase letter
            </p>
          ) : (
            <p className="fs-14">
              Your password must be between 8 to 20 characters which
              contain at least one numeric digit, one uppercase and one
              lowercase letter
            </p>
          )}
          <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Business Contract
          </h4>
          <FormInput
            label='Phone Number'
            initialValue={phoneNumber}
            onChange={function (evt) {
              if (!evt) {
                return;
              }
              setPhoneNumber(evt.target.value);
            }}/>
          {!isPhoneValid ? (
                <p className="error-title">*Your phone number is not correct</p>
              ) : null}
          <FormInput
            label='Email'
            initialValue={email}
            onChange={function (evt) {
              if (!evt) {
                return;
              }
              setEmail(evt.target.value);
            }}/>
            {!isEmailValid ? (
              <p className="error-title">*Your email is not correct</p>
            ) : null}
          <FormTextArea
            label='Introduction'
            rows={3}
            initialValue={intro}
            onChange={function (evt) {
              if (!evt) {
                return;
              }
              setIntro(evt.target.value);
            }}/>
        </form>
        <div aria-label='button-row' className='row mt-3 '>
          <div className='d-flex justify-content-center align-items-center'>
            <button
              type='button'
              className='btn btn-primary rounded-pill px-3 align-items-center'
              style={{ fontSize: '14px', height: '40px' }}
              onClick={handleSubmit}
            >
              <span>Continue</span>
              <SVG className='ms-2' src={toAbsoluteUrl('/assets/vector-right.svg')}></SVG>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
