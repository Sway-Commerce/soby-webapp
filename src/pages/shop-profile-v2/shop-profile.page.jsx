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
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ChannelIconLink = function ({ ...props }) {
  const { url, imgSrc } = props;
  return (
    <div>
      <a href={url}>
        <div
          className='d-flex rounded-circle bg-light justify-content-center align-items-center p-0'
          style={{ width: '40px', height: '40px' }}
        >
          <SVG className='p-0' src={toAbsoluteUrl(imgSrc)} width={23} height={23}></SVG>
        </div>
      </a>
    </div>
  );
};

const Promotion = function ({ ...props }) {
  return (
    <div className='mt-2 border d-flex' style={{ width: '320px' }}>
      <div aria-label='img-group' className=''>
        <div className='d-flex'>
          <div className='bg-primary' style={{ width: '59px', height: '59px' }}>
            {/* <img src='' alt='img-1' className='bg-light' style={{width: '59px', height: '59px'}} /> */}
          </div>
          <div className='bg-success' style={{ width: '59px', height: '59px', marginLeft: '1px' }}>
            {/* <img src='' alt='img-1' className='bg-light' style={{width: '59px', height: '59px'}} /> */}
          </div>
        </div>
        <div aria-label='img-group' className='d-flex' style={{ marginTop: '1px' }}>
          <div className='bg-warning' style={{ width: '59px', height: '59px' }}>
            {/* <img src='' alt='img-1' className='bg-light' style={{width: '59px', height: '59px'}} /> */}
          </div>
          <div className='bg-danger' style={{ width: '59px', height: '59px', marginLeft: '1px' }}>
            {/* <img src='' alt='img-1' className='bg-light' style={{width: '59px', height: '59px'}} /> */}
          </div>
        </div>
      </div>
      <div className='p-2'>
        <h6 className='fw-bold mb-0' style={{ fontSize: '16px' }}>
          End of Season Sale
        </h6>
        <div className='p-0' style={{ fontSize: '12px' }}>
          <span aria-label='numOfDays' className=''>
            5 Days
          </span>
          <span aria-label='hour' className='ms-1'>
            20
          </span>
          <span aria-label='seperator' className='ms-1'>
            :
          </span>
          <span aria-label='minute' className='ms-1'>
            27
          </span>
          <span aria-label='seperator' className='ms-1'>
            :
          </span>
          <span aria-label='minute' className='ms-1'>
            54
          </span>
          <span aria-label='text' className='ms-1'>
            Left
          </span>
        </div>
        <div className='' style={{ marginTop: '16px', fontSize: '12px', color: 'white' }}>
          <span aria-label='numOfDays' className='bg-danger rounded p-1'>
            5 Days
          </span>
          <span aria-label='hour' className='ms-2 bg-danger rounded p-1'>
            20
          </span>
          <span aria-label='seperator' className='ms-1 text-danger'>
            :
          </span>
          <span aria-label='minute' className='ms-1 bg-danger rounded p-1'>
            27
          </span>
          <span aria-label='seperator' className='ms-1 text-danger'>
            :
          </span>
          <span aria-label='minute' className='ms-1 bg-danger rounded p-1'>
            54
          </span>
        </div>
      </div>
    </div>
  );
};

const Product = function ({ ...props }) {
  return (
    <div className='' style={{ width: '190px', height: '190px' }}>
      <SVG src={toAbsoluteUrl('/assets/products/no-product-img.svg')} style={{ width: '190px', height: '190px' }}></SVG>
    </div>
  );
};

const ProductRow = function ({ ...props }) {
  return (
    <div className='d-flex flex-wrap mt-3 justify-content-between'>
      <Product></Product>
      <Product></Product>
      <Product></Product>
      <Product></Product>
    </div>
  );
};

const ContactRow = function ({ ...props }) {
  const { imgSrc, value, bold } = props;

  return (
    <div className='row border-bottom py-2'>
      <div className='' style={{ width: '40px' }}>
        <SVG src={toAbsoluteUrl(imgSrc)} style={{ width: '19px', height: '19px', marginTop: '-1px' }}></SVG>
      </div>
      <div className='col' style={{ fontSize: '14px' }}>
        <span className={bold && 'fw-bold'}>{value}</span>
      </div>
    </div>
  );
};

const ChannelRow = function ({ ...props }) {
  const { imgSrc, value, bold } = props;

  return (
    <div className='row border-bottom py-2'>
      <div className='' style={{ width: '40px' }}>
        <SVG src={toAbsoluteUrl(imgSrc)} style={{ width: '24px', height: '24px', marginTop: '-2px' }}></SVG>
      </div>
      <div className='col' style={{ fontSize: '14px' }}>
        <span className={bold && 'fw-bold'}>{value}</span>
      </div>
      <div className='' style={{ width: '40px' }}>
        <SVG src={toAbsoluteUrl('/assets/right-black.svg')} style={{ width: '19px', height: '19px' }}></SVG>
      </div>
    </div>
  );
};

const ShopProfileV2Page = function () {
  return (
    <div className='container-fluid mb-5'>
      <div className='row mt-3 justify-content-center py-2'>
        <div className='col-2 p-0'>
          <div className=''>
            <div className='bg-white border' style={{ width: '160px', height: '160px' }}></div>
            {/* <img alt='logo' src='' width={160} height={160} /> */}
          </div>
        </div>
        <div className='col-7'>
          <div className='row p-0 pt-2'>
            <h4 className='fw-bold' style={{ fontSize: '32px' }}>
              Houseeker
            </h4>
          </div>
          <div className='row p-0 pb-2'>
            <div className='d-flex align-items-center'>
              <ChannelIconLink url='/' imgSrc='/assets/shopChannels/facebook.svg'></ChannelIconLink>
              <ChannelIconLink url='/' imgSrc='/assets/shopChannels/instagram.svg'></ChannelIconLink>
              <ChannelIconLink url='/' imgSrc='/assets/shopChannels/website.svg'></ChannelIconLink>
            </div>
          </div>
          <div className='row p-0 justify-content-start align-items-center'>
            <div className='d-flex'>
              <button
                type='button'
                className='btn btn-primary rounded-pill px-3 align-items-center me-1'
                style={{ fontSize: '14px', height: '40px', width: '200px' }}
                onClick={function () {}}
              >
                <span>Liên hệ</span>
              </button>
              <button
                type='button'
                className='btn rounded-pill border px-3 align-items-center d-flex justify-content-center align-items-center '
                style={{ fontSize: '14px', height: '40px', width: '200px' }}
                onClick={function () {}}
              >
                <SVG className='me-2' src={toAbsoluteUrl('/assets/share-2.svg')} width={20} height={20}></SVG>
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </div>
        <div className='col-3'>
          <div className='row justify-content-center'>
            <div className='p-0' style={{ width: '98px', height: '98px' }}>
              <CircularProgressbarWithChildren
                minValue={0}
                maxValue={10}
                value={9.5}
                counterClockwise
                strokeWidth={6}
                styles={buildStyles({
                  trailColor: '#F3F4F4',
                  pathColor: '#28BD4B',
                })}
              >
                <h4 className='fw-bold' style={{ fontSize: '32px', color: 'black', marginTop: '10px', marginLeft: '-2px' }}>
                  9.5
                </h4>
              </CircularProgressbarWithChildren>
            </div>
          </div>
          <div className='row text-center mt-2'>
            <h4 className='fw-bold' style={{ fontSize: '16px', color: '#28BD4B' }}>
              Extremely good
            </h4>
          </div>
        </div>
      </div>
      <div className='row mt-3 justify-content-between'>
        <div className='' style={{ width: '73%' }}>
          <div className='row bg-white'>
            <div className='border py-2'>
              <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                Khuyến mãi
              </h5>
              <Promotion></Promotion>
            </div>
          </div>
          <div className='row bg-white mt-3'>
            <div className='border py-2'>
              <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                Sản phẩm
              </h5>
              <ProductRow></ProductRow>
              <ProductRow></ProductRow>
              <div className='d-flex justify-content-center align-items-center'>
                <button
                  type='button'
                  className='btn rounded-pill border px-3 align-items-center d-flex justify-content-center align-items-center fw-bold mt-3 mb-2'
                  style={{ fontSize: '14px', height: '40px' }}
                  onClick={function () {}}
                >
                  <span>Xem thêm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='' style={{ width: '25%' }}>
          <div className='row border bg-white'>
            <div className='mt-2 py-2'>
              <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                Giới thiệu
              </h5>
              <p className='mt-2' style={{ fontSize: '14px' }}>
                Houseeker tự hào dịch vụ khách hàng tuyệt vời. Bạn hài lòng, chúng tôi hạnh phúc. Cần một dịch vụ nhanh và gọn? Không còn
                băn khoăn nữa! Đơn đặt hàng số lượng lớn không có vấn đề
              </p>
            </div>
            <div className='mt-2 py-2'>
              <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                Thông tin liên hệ
              </h5>
              <div className='mt-2 px-2'>
                <ContactRow bold imgSrc='/assets/phone-outline-black.svg' value='090123456'></ContactRow>
                <ContactRow imgSrc='/assets/email-outline-black.svg' value='support@houseeker.vn'></ContactRow>
                <div className='row border-bottom py-2'>
                  <div className='' style={{ width: '40px' }}>
                    <SVG
                      src={toAbsoluteUrl('/assets/shopChannels/website.svg')}
                      style={{ width: '19px', height: '19px', marginTop: '-2px' }}
                    ></SVG>
                  </div>
                  <div className='col' style={{ fontSize: '14px' }}>
                    <span className='fw-bold'>Truy cập trang web</span>
                  </div>
                  <div className='' style={{ width: '40px' }}>
                    <SVG src={toAbsoluteUrl('/assets/right-black.svg')} style={{ width: '19px', height: '19px' }}></SVG>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-2 py-2'>
              <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                Kênh
              </h5>
              <div className='mt-2 px-2'>
                <ChannelRow imgSrc='/assets/shopChannels/facebook.svg' value='Houseeker'></ChannelRow>
                <ChannelRow imgSrc='/assets/shopChannels/instagram.svg' value='Houseeker'></ChannelRow>
                <ChannelRow imgSrc='/assets/shopChannels/shopee.svg' value='Houseeker'></ChannelRow>
              </div>
            </div>
            <div className='mt-2 py-2'>
              <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                Địa chỉ
              </h5>
              <p className='mt-2' style={{ fontSize: '14px' }}>
                CirCo Coworking Space, Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProfileV2Page;
