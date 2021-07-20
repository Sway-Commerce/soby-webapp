import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { FormInput, FormTextArea, createSellerTabs } from './create-seller.page';

export function BasicInfo({ ...props }) {
  const { getBasicInfo, initialBasicInfo } = props;
  const [businessName, setBusinessName] = useState(initialBasicInfo.businessName);
  const [owner, setOwner] = useState(initialBasicInfo.owner);
  const [phoneNumber, setPhoneNumber] = useState(initialBasicInfo.phoneNumber);
  const [email, setEmail] = useState(initialBasicInfo.email);
  const [intro, setIntro] = useState(initialBasicInfo.intro);
  console.log(initialBasicInfo);

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
            }}
          ></FormInput>
          <FormInput
            label='Owner'
            onChange={function (evt) {
              setOwner(evt.target.value);
            }}
          ></FormInput>
          <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Business Contract
          </h4>
          <FormInput
            label='Phone Number'
            onChange={function (evt) {
              setPhoneNumber(evt.target.value);
            }}
          ></FormInput>
          <FormInput
            label='Email'
            onChange={function (evt) {
              setEmail(evt.target.value);
            }}
          ></FormInput>
          <FormTextArea
            label='Introduction'
            rows={3}
            onChange={function (evt) {
              setIntro(evt.target.value);
            }}
          ></FormTextArea>
        </form>
        <div aria-label='button-row' className='row mt-3 '>
          <div className='d-flex justify-content-center align-items-center'>
            <button
              type='button'
              className='btn btn-primary rounded-pill px-3 align-items-center'
              style={{ fontSize: '14px', height: '40px' }}
              onClick={function () {
                getBasicInfo({ businessName, owner, phoneNumber, email, intro }, createSellerTabs.shopChannel.label);
              }}
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
