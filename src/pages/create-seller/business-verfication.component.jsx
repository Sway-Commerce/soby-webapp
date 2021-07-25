import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
// import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { FormInput, FormTextArea, createSellerTabs } from './create-seller.page';

export function BusinessVerification({ ...props }) {
  const { getBusinessVerification, businessVerification } = props;
  const [businessName, setBusinessName] = useState(businessVerification.businessName);
  const [licenseNumber, setLicenseNumber] = useState(businessVerification.licenseNumber);
  const [address, setAddress] = useState(businessVerification.address);

  return (
    <div aria-label='business-verification' className=''>
      <div aria-label='title' className='text-center'>
        <h3 className='fw-bold' style={{ fontSize: '24px' }}>
          Xác thực doanh nghiệp
        </h3>
        <p style={{ color: '#6E7678', fontSize: '14px' }}>
          Gần xong rồi! Đây là một bước quan trọng để tạo dựng niềm tin với khách hàng và xếp hạng của bạn.
        </p>
      </div>
      <div aria-label='business-verification-form' className='mt-3'>
        <form>
          <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Info
          </h4>
          <FormInput
            label='Business Name'
            onChange={function (evt) {
              setBusinessName(evt.target.value);
            }}
          ></FormInput>
          <FormInput
            label='License Number'
            onChange={function (evt) {
              setLicenseNumber(evt.target.value);
            }}
          ></FormInput>
          <FormInput
            label='Address'
            onChange={function (evt) {
              setAddress(evt.target.value);
            }}
          ></FormInput>

          {/* <h4 className='fw-bold mt-4' style={{ fontSize: '20px' }}>
            Business License
          </h4>
          <p style={{ color: '#6E7678', fontSize: '14px' }}>Please provide the most updated license in PDF format</p>
          <div aria-label='upload-profile-img' className='d-flex justify-content-center text-center'>
            <div
              className='d-flex flex-wrap justify-content-center align-items-center border rounded p-2'
              style={{ width: '100%', height: '320px' }}
            >
              <div className=''>
                <div className='d-inline-block text-center mb-1'>
                  <div
                    className='d-flex bg-dark rounded-circle align-middle justify-content-center align-items-center'
                    style={{ width: '48px', height: '48px' }}
                  >
                    <SVG src={toAbsoluteUrl('/assets/upload.svg')}></SVG>
                  </div>
                </div>
                <div style={{ lineHeight: '.8rem' }}>
                  <span style={{ fontSize: '12px', whiteSpace: 'pre-line' }}>Upload</span>
                </div>
              </div>
            </div>
          </div> */}
        </form>
        <div aria-label='button-row' className='row mt-3 '>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='col-4 d-flex justify-content-start align-items-center'>
              <button
                type='button'
                className='btn btn-light rounded-circle align-items-center'
                style={{ fontSize: '14px', height: '40px', width: '40px' }}
                onClick={function () {
                  getBusinessVerification({ businessName, licenseNumber, address }, createSellerTabs.shopChannel.label);
                }}
              >
                <SVG className='' src={toAbsoluteUrl('/assets/vector-left.svg')}></SVG>
              </button>
            </div>
            <div className='col-8 d-flex justify-content-end align-items-center'>
              <button
                type='button'
                className='btn btn-light me-2 fw-bold'
                style={{ fontSize: '14px', backgroundColor: 'transparent', border: 'none' }}
                onClick={function () {
                  getBusinessVerification({}, createSellerTabs.preview.label);
                }}
              >
                Bỏ qua
              </button>
              <button
                type='button'
                className='btn btn-primary rounded-pill px-3 align-items-center'
                style={{ fontSize: '14px', height: '40px' }}
                onClick={function () {
                  getBusinessVerification({ businessName, licenseNumber, address }, createSellerTabs.preview.label);
                }}
              >
                <span>Tiếp theo</span>
                <SVG className='ms-2' src={toAbsoluteUrl('/assets/vector-right.svg')}></SVG>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
