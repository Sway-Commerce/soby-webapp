import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
import backgroundImg from 'shared/assets/home-background.svg';
import { CustomButton } from '../../components/ui/custom-button/custom-button.component';
// import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';
import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { BasicInfo } from './basic-info.component';
import { BusinessVerification } from './business-verfication.component';
import { ShopChannel } from './shop-channel.component';

export const FormInput = function ({ ...props }) {
  const { label, initialValue, onChange } = props;
  return (
    <div className='mb-2'>
      {label ? (
        <label className='fw-bold' style={{ fontSize: '14px' }}>
          {label}
        </label>
      ) : null}
      <input type='text' className='form-control' value={initialValue} onChange={onChange} style={{ fontSize: '14px' }}></input>
    </div>
  );
};

export const FormTextArea = function ({ ...props }) {
  const { label, rows, onChange } = props;
  return (
    <div className='mb-2'>
      {label ? (
        <label className='fw-bold' style={{ fontSize: '14px' }}>
          {label}
        </label>
      ) : null}
      <textarea className='form-control' id='' rows={rows} onChange={onChange} style={{ fontSize: '14px' }}></textarea>
    </div>
  );
};

export const createSellerTabs = {
  basicInfo: { label: 'Basic Info' },
  shopChannel: { label: 'Shop Channel' },
  businessVerification: { label: 'Business Verification' },
  preview: { label: 'Preview' },
};

const initialShopChannel = {
  website: { isSelected: false, label: 'Website', value: '', prefix: '', logoSrc: '/assets/shopChannels/website.svg' },
  facebook: { isSelected: false, label: 'Facebook', value: '', prefix: '', logoSrc: '/assets/shopChannels/facebook.svg' },
  instagram: { isSelected: false, label: 'Instagram', value: '', prefix: '', logoSrc: '/assets/shopChannels/instagram.svg' },
  tiktok: { isSelected: false, label: 'Tiktok', value: '', prefix: '', logoSrc: '/assets/shopChannels/tiktok.svg' },
  zalo: { isSelected: false, label: 'Zalo', value: '', prefix: '', logoSrc: '/assets/shopChannels/zalo.svg' },
  shopee: { isSelected: false, label: 'Shopee', value: '', prefix: '', logoSrc: '/assets/shopChannels/shopee.svg' },
  chotot: { isSelected: false, label: 'ChoTot', value: '', prefix: '', logoSrc: '/assets/shopChannels/chotot.svg' },
};

const initialBasicInfo = {
  businessName: '',
  owner: '',
  phoneNumber: '',
  email: '',
  intro: '',
};

const CreateSellerPage = function () {
  const [basicInfo, setBasicInfo] = useState({});
  const [shopChannel, setShopChannel] = useState({});
  const [businessVerification, setBusinessVerification] = useState({});
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

  const basicInfoProps = {
    getBasicInfo,
    initialBasicInfo,
  };
  const businessVerificationProps = {
    getBusinessVerification,
  };
  const shopChannelProps = {
    getShopChannel,
    initialShopChannel,
  };
  console.log('shopChannel', shopChannel);
  console.log('basicInfo', basicInfo);
  return (
    <>
      <div className='container mt-2 mb-4'>
        <div className='row d-flex justify-content-center'>
          <div className='border border-secondary rounded p-4' style={{ width: '480px' }}>
            {currPage === createSellerTabs.basicInfo.label && <BasicInfo {...basicInfoProps}></BasicInfo>}
            {currPage === createSellerTabs.businessVerification.label && (
              <BusinessVerification {...businessVerificationProps}></BusinessVerification>
            )}
            {currPage === createSellerTabs.shopChannel.label && <ShopChannel {...shopChannelProps}></ShopChannel>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSellerPage;
