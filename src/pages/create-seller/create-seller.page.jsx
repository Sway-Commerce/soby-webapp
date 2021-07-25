import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
import backgroundImg from 'shared/assets/home-background.svg';
import { CustomButton } from '../../components/ui/custom-button/custom-button.component';
// import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';
import { REGISTER_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { BasicInfo } from './basic-info.component';
import { BusinessVerification } from './business-verfication.component';
import { ShopChannel } from './shop-channel.component';
import { PreviewAll } from './preview-all.component';
import { generateEncryptionKey, generateSignInKey } from 'graphQL/repository/individual.repository';

export const FormInput = function ({ ...props }) {
  const { label, initialValue, onChange, inputType } = props;
  return (
    <div className='mb-2'>
      {label ? (
        <label className='fw-bold' style={{ fontSize: '14px' }}>
          {label}
        </label>
      ) : null}
      {inputType !== 'password' ? (
        <input type={inputType} className='form-control' value={initialValue} onChange={onChange} style={{ fontSize: '14px' }}></input>
      ) : (
        <input
          type={inputType}
          className='form-control'
          defaultValue={initialValue}
          onChange={onChange}
          style={{ fontSize: '14px' }}
        ></input>
      )}
    </div>
  );
};

export const FormTextArea = function ({ ...props }) {
  const { label, rows, initialValue, onChange } = props;
  return (
    <div className='mb-2'>
      {label ? (
        <label className='fw-bold' style={{ fontSize: '14px' }}>
          {label}
        </label>
      ) : null}
      <textarea
        className='form-control'
        defaultValue={initialValue}
        rows={rows}
        onChange={onChange}
        style={{ fontSize: '14px' }}
      ></textarea>
    </div>
  );
};

export const FieldPreview = function ({ ...props }) {
  const { label, value, valueBold } = props;

  return (
    <div className='row border-bottom py-2 mx-1 align-middle' style={{ fontSize: '14px' }}>
      <div className='col-5 ps-0 align-left'>
        <span style={{ color: '#3D494B' }}>{label}</span>
      </div>
      <div className={`col-7 pe-0 text-end ${valueBold && 'fw-bold'}`}>
        <span style={{ color: '#0D1B1E' }}>{value}</span>
      </div>
    </div>
  );
};

export const ChannelPreview = function ({ ...props }) {
  const { logoSrc, value } = props;

  return (
    <div className='row mx-1' style={{ fontSize: '14px' }}>
      <div className='col-1 d-flex justify-content-start align-items-center p-0' style={{ height: '50px' }}>
        <span>
          <SVG src={toAbsoluteUrl(logoSrc)}></SVG>
        </span>
      </div>
      <div className='col-11 d-flex align-items-center justify-content-start ps-0'>
        <span className=''>{value}</span>
      </div>
    </div>
  );
};

export const createSellerTabs = {
  basicInfo: { label: 'Thông tin' },
  shopChannel: { label: 'Kênh cửa hàng' },
  businessVerification: { label: 'Xác thực doanh nghiệp' },
  preview: { label: 'Xem trước' },
};

const initialShopChannel = {
  website: { isSelected: false, label: 'Website', value: '', prefix: '', logoSrc: '/assets/shopChannels/website.svg' },
  facebook: {
    isSelected: false,
    label: 'Facebook',
    value: '',
    prefix: 'https://www.facebook.com/',
    logoSrc: '/assets/shopChannels/facebook.svg',
  },
  instagram: {
    isSelected: false,
    label: 'Instagram',
    value: '',
    prefix: 'https://www.instagram.com/',
    logoSrc: '/assets/shopChannels/instagram.svg',
  },
  tiktok: { isSelected: false, label: 'Tiktok', value: '', prefix: 'https://www.tiktok.com/', logoSrc: '/assets/shopChannels/tiktok.svg' },
  zalo: { isSelected: false, label: 'Zalo', value: '', prefix: 'zalo.me/', logoSrc: '/assets/shopChannels/zalo.svg' },
  shopee: { isSelected: false, label: 'Shopee', value: '', prefix: 'https://shopee.com/', logoSrc: '/assets/shopChannels/shopee.svg' },
  chotot: { isSelected: false, label: 'ChoTot', value: '', prefix: 'https://chotot.com/', logoSrc: '/assets/shopChannels/chotot.svg' },
};

const CreateSellerPage = function () {
  const { user } = useSelector((state) => ({ user: state.user }), shallowEqual);
  console.log('user', user);

  const [basicInfo, setBasicInfo] = useState({
    businessName: '',
    owner: '',
    password: '',
    phoneNumber: '',
    email: '',
    intro: '',
    signingPublicKey: '',
    signingSecret: '',
    encryptionPublicKey: '',
    encryptionSecret: '',
  });
  const [shopChannel, setShopChannel] = useState({});
  const [businessVerification, setBusinessVerification] = useState({ businessName: '', licenseNumber: '', address: '' });
  const [createSellerData, setCreateSellerData] = useState({});
  const [currPage, setCurrPage] = useState(createSellerTabs['basicInfo'].label);

  const getBasicInfo = function (data, nextPage) {
    setBasicInfo(data);
    setCurrPage(nextPage);
  };
  const getBusinessVerification = function (data, nextPage) {
    setBusinessVerification(data);
    setCurrPage(nextPage);
  };
  const getShopChannel = function (data, nextPage) {
    setShopChannel(data);
    setCurrPage(nextPage);
  };
  const getPreviewAll = function (data, nextPage) {
    setCreateSellerData(data);
    setCurrPage(nextPage);
  };

  const basicInfoProps = {
    getBasicInfo,
    basicInfo,
    generateEncryptionKey,
    generateSignInKey,
  };
  const businessVerificationProps = {
    getBusinessVerification,
    businessVerification,
  };
  const shopChannelProps = {
    getShopChannel,
    initialShopChannel,
  };
  const previewAllProps = {
    basicInfo,
    shopChannel,
    businessVerification,
    getPreviewAll,
  };
  console.log('shopChannel', shopChannel);
  console.log('basicInfo', basicInfo);
  console.log('businessVerification', businessVerification);
  console.log('createSellerData', createSellerData);

  return (
    <>
      <div className='container mt-2 mb-4'>
        <div className='row d-flex justify-content-center'>
          <div className='border border-secondary rounded p-4' style={{ width: '480px' }}>
            {currPage === createSellerTabs.basicInfo.label && <BasicInfo key='basic-info' {...basicInfoProps}></BasicInfo>}
            {currPage === createSellerTabs.businessVerification.label && (
              <BusinessVerification key='business-verification' {...businessVerificationProps}></BusinessVerification>
            )}
            {currPage === createSellerTabs.shopChannel.label && <ShopChannel key='shop-channel' {...shopChannelProps}></ShopChannel>}
            {currPage === createSellerTabs.preview.label && <PreviewAll key='preview' {...previewAllProps}></PreviewAll>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSellerPage;
