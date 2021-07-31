import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from 'shared/utils/assetsHelper';
// import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { createSellerTabs } from './create-seller.page';
import { configConsumerProps } from 'antd/lib/config-provider';

const ChannelInput = function ({ ...props }) {
  const { label, isSelected, initialValue, onSelect, onInputChange, logoSrc } = props;
  return (
    <div aria-label='channel-input'>
      <div className='row' style={{ fontSize: '16px' }}>
        <div className='col-1 d-flex justify-content-end align-items-center p-0' style={{ height: '50px' }}>
          <span>
            <SVG src={toAbsoluteUrl(logoSrc)}></SVG>
          </span>
        </div>
        <div className='col-8 d-flex justify-content-start align-items-center ps-2'>
          <span className=''>{label}</span>
        </div>
        <div className='col-3 d-flex justify-content-end align-items-center pe-1'>
          <div className='form-check form-switch d-flex align-middle align-items-center' style={{ marginBottom: '6px' }}>
            <input className='form-check-input' type='checkbox' defaultChecked={isSelected} onChange={onSelect} />
          </div>
        </div>
      </div>
      {isSelected && (
        <div className='row'>
          <input
            type='text'
            className='form-control'
            defaultValue={initialValue}
            style={{ fontSize: '14px' }}
            onChange={onInputChange}
          ></input>
        </div>
      )}
    </div>
  );
};

export function ShopChannel({ ...props }) {
  const { getShopChannel, initialShopChannel } = props;
  const [shopChannelData, setShopChannelData] = useState(initialShopChannel);

  return (
    <div aria-label='shop-channel' className=''>
      <div aria-label='title' className='text-center'>
        <h3 className='fw-bold' style={{ fontSize: '24px' }}>
          Thêm kênh cửa hàng
        </h3>
      </div>
      <div aria-label='shop-channel-form' className='mt-3'>
        {Object.keys(shopChannelData).map(function (channelName) {
          return (
            <ChannelInput
              key={channelName}
              label={shopChannelData[channelName].label}
              logoSrc={shopChannelData[channelName].logoSrc}
              isSelected={shopChannelData[channelName].isSelected}
              initialValue={shopChannelData[channelName].prefix.concat(shopChannelData[channelName].value)}
              onSelect={function (evt) {
                let updateValue = { ...shopChannelData };
                updateValue[channelName].isSelected = evt.target.checked;
                updateValue[channelName].value = '';
                setShopChannelData({ ...updateValue });
              }}
              onInputChange={function (evt) {
                evt.preventDefault();
                let updateValue = { ...shopChannelData };
                updateValue[channelName].value = evt.target.value;
                setShopChannelData({ ...updateValue });
              }}
            ></ChannelInput>
          );
        })}

        <div aria-label='button-row' className='row mt-3 '>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='col-4 d-flex justify-content-start align-items-center'>
              <button
                type='button'
                className='btn btn-light rounded-circle d-flex justify-content-center align-items-center'
                style={{ fontSize: '14px', height: '40px', width: '40px' }}
                onClick={function () {
                  getShopChannel({ shopChannelData }, createSellerTabs.basicInfo.key, { 1: { state: 'active' }, 2: { state: 'default' } });
                }}
              >
                <div className=''>
                  <SVG
                    className=''
                    src={toAbsoluteUrl('/assets/commons/vector-right.svg')}
                    style={{
                      fill: '#3D494B',
                      width: '20px',
                      height: '20px',
                      transform: 'rotate(180deg)',
                      marginLeft: '-1px',
                      marginTop: '',
                    }}
                  ></SVG>
                </div>
              </button>
            </div>
            <div className='col-8 d-flex justify-content-end align-items-center'>
              <button
                type='button'
                className='btn btn-primary rounded-pill px-3 d-flex justify-content-center align-items-center'
                style={{ fontSize: '14px', height: '40px' }}
                onClick={function () {
                  getShopChannel({ shopChannelData }, createSellerTabs.businessVerification.key, { 2: { state: 'done' }, 3: { state: 'active' } });
                }}
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
    </div>
  );
}
