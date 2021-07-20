import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import SVG from 'react-inlinesvg';
import phoneValidation from 'shared/utils/phoneValidation';
import passwordValidation from 'shared/utils/passwordValidation';
import emailValidation from 'shared/utils/emailValidation';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
import { REGISTER_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { ChannelPreview, FieldPreview, createSellerTabs } from './create-seller.page';

export function PreviewAll({ ...props }) {
  const { shopChannel, basicInfo, businessVerification, getPreviewAll } = props;
  const { shopChannelData } = shopChannel;
  const [finalData, setFinalData] = useState({});
  let countSelectedChannel = 0;

  const [registerShop, { data: registerShopData, error: registerShopError, loading: registerShopLoading }] = useMutation(REGISTER_SHOP, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (registerShopData?.registerShop?.data?.id) {
      alert(`Created success with id ${registerShopData?.registerShop?.data?.id}`);
      // const signature = getSignature(signingPublicKey, signingSecret, password);
      // setSignature(signature);
    }
  }, [registerShopData?.registerShop?.data]);

  useEffect(() => {
    if (registerShopError?.message) {
      alert(registerShopError?.message);
      // setFormError(registerShopError?.message);
      // setOpen(true);
    }
  }, [registerShopError]);

  useEffect(() => {
    const shopUrls = [];
    Object.keys(shopChannelData).filter(function (channelName) {
      if (shopChannelData[channelName].isSelected) {
        shopUrls.push(shopChannelData[channelName].value);
        return channelName;
      }
    });
    console.log('shopUrls', shopUrls);
    setFinalData({
      name: basicInfo.businessName,
      phoneCountryCode: '+84',
      phoneNumber: basicInfo.phoneNumber,
      email: basicInfo.email,
      description: basicInfo.intro,
      logoUrl: '',
      incorporationDate: '',
      categoryIds: ['1011'],
      shopUrls,
      signingPublicKey: basicInfo.signingPublicKey,
      signingSecret: basicInfo.signingSecretKey,
      encryptionPublicKey: basicInfo.encryptionPublicKey,
      encryptionSecret: basicInfo.encryptionSecret,
      password: basicInfo.password,
      shippingFeeInCity: '',
      shippingFeeOutCity: '',
    });
  }, [shopChannel, basicInfo, businessVerification, shopChannelData]);

  const handleSubmit = async function (evt) {
    evt.preventDefault();
    registerShop({
      variables: {
        cmd: finalData,
      },
    });
  };

  console.log('finalData', finalData);

  return (
    <div key='preview-wrapper' aria-label='preview-all' className=''>
      <div aria-label='title' className='text-center'>
        <h3 className='fw-bold' style={{ fontSize: '24px' }}>
          Let's review one more time
        </h3>
        <p style={{ color: '#6E7678', fontSize: '14px' }}>Double-check the information</p>
      </div>
      <div aria-label='profile-img' className='d-flex justify-content-center text-center'>
        <div
          className='d-flex flex-wrap justify-content-center align-items-center bg-light rounded p-2'
          style={{ width: '128px', height: '128px', backgroundColor: '#F3F4F4' }}
        ></div>
      </div>
      <div aria-label='preview-all-form' className='mt-3'>
        <div className=''>
          <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Info
          </h4>
          <FieldPreview key='businessName-0' label={'Business Name'} value={basicInfo.businessName} valueBold></FieldPreview>
          <FieldPreview key='owner' label={'Owner'} value={basicInfo.owner}></FieldPreview>
          <FieldPreview key='phone' label={'Phone Number'} value={basicInfo.phoneNumber}></FieldPreview>
          <FieldPreview key='email' label={'Email'} value={basicInfo.email}></FieldPreview>
          <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Channel
          </h4>
          {Object.keys(shopChannelData).map(function (channelName) {
            if (shopChannelData[channelName]?.isSelected) {
              countSelectedChannel++;
              return (
                <ChannelPreview
                  key={channelName}
                  logoSrc={shopChannelData[channelName]?.logoSrc}
                  value={shopChannelData[channelName]?.value}
                ></ChannelPreview>
              );
            } else {
              return null;
            }
          })}
          {countSelectedChannel === 0 && (
            <div key='no-specified-url' className='row fst-italic' style={{ fontSize: '14px', color: '#6E7678' }}>
              <span>Not provided yet</span>
            </div>
          )}
          <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Introduction
          </h4>
          <div className='row' style={{ fontSize: '14px', color: '#6E7678' }}>
            {basicInfo.intro ? <p key='intro-preview' style={{ fontSize: '14px' }}>{basicInfo.intro}</p> : <span key='no-specified-intro' className='fst-italic'>Not provided yet</span>}
          </div>
          <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Business Verification
          </h4>
          <FieldPreview key='businessName-1' label={'Business Name'} value={businessVerification.businessName}></FieldPreview>
          <FieldPreview key='licenseNo' label={'License Number'} value={businessVerification.licenseNumber}></FieldPreview>
          <FieldPreview key='address' label={'Address'} value={businessVerification.address}></FieldPreview>
          <h5 className='fw-bold mt-4 mx-1' style={{ fontSize: '14px' }}>
            Business License
          </h5>
          <div aria-label='preview-doc-img' className='d-flex justify-content-center text-center'>
            <div
              className='d-flex flex-wrap justify-content-center align-items-center border rounded p-2'
              style={{ width: '100%', height: '320px', backgroundColor: '#F3F4F4' }}
            ></div>
          </div>
        </div>
        <div aria-label='button-row' className='row mt-3 '>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='col-4 d-flex justify-content-start align-items-center'>
              <button
                type='button'
                className='btn btn-light rounded-circle align-items-center'
                style={{ fontSize: '14px', height: '40px', width: '40px' }}
                onClick={function () {
                  getPreviewAll({ finalData }, createSellerTabs.businessVerification.label);
                }}
              >
                <SVG className='' src={toAbsoluteUrl('/assets/vector-left.svg')}></SVG>
              </button>
            </div>
            <div className='col-8 d-flex justify-content-end align-items-center'>
              <button
                type='button'
                className='btn btn-primary rounded-pill px-3 align-items-center'
                style={{ fontSize: '14px', height: '40px' }}
                onClick={handleSubmit}
              >
                <span>Complete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
