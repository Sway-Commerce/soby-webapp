import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory, Switch, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_SHOP_CATEGORIES } from 'graphQL/repository/shop.repository';
import { GET_PRODUCT, SEARCH_PRODUCT } from 'graphQL/repository/product.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal, { ModalContainer } from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import useDebounce from 'shared/hooks/useDebounce';
import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';

import SVG from 'react-inlinesvg';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
import { categoryIconMapper } from '../explore/icon.mapper';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ScrollContainer from 'react-indiana-drag-scroll';
import { getColor } from 'shared/constants/shop.constant';
import { Carousel, Modal, ModalBody, ModalDialog } from 'react-bootstrap';

const ArrowRight = function ({ ...props }) {
  return (
    <div
      className='rounded-circle d-flex justify-content-center align-items-center bg-light'
      style={{
        width: '32px',
        height: '32px',
        filter: `drop-shadow(0px 4px 8px rgba(13, 27, 30, 0.1))`,
        cursor: 'pointer',
      }}
    >
      <div className='d-block'>
        <SVG src={toAbsoluteUrl('/assets/commons/vector-right.svg')} style={{ width: '24px', height: '24px', marginTop: '-2px' }}></SVG>
      </div>
    </div>
  );
};

const ArrowLeft = function ({ ...props }) {
  return (
    <div
      className='rounded-circle d-flex justify-content-center align-items-center bg-light'
      style={{
        width: '32px',
        height: '32px',
        filter: `drop-shadow(0px 4px 8px rgba(13, 27, 30, 0.1))`,
        transform: `rotate(180deg)`,
        cursor: 'pointer',
      }}
    >
      <div className='d-block'>
        <SVG src={toAbsoluteUrl('/assets/commons/vector-right.svg')} style={{ width: '24px', height: '24px', marginTop: '-2px' }}></SVG>
      </div>
    </div>
  );
};

const CategoryIcon = function ({ ...props }) {
  const { imgSrc, fill, stroke, bgColor, border } = props;

  return (
    <div
      className={`rounded-circle d-flex justify-content-center align-items-center ${border && 'border'}`}
      style={{ width: '48px', height: '48px', backgroundColor: bgColor }}
    >
      <div className='d-block'>
        <SVG
          src={toAbsoluteUrl(imgSrc)}
          style={{ width: '24px', height: '24px', marginTop: '-2px', fill: `${fill}`, stroke: `${stroke}` }}
        ></SVG>
      </div>
    </div>
  );
};

const CategoryItem = function ({ ...props }) {
  const { imgSrc, value, isFirst, bgColor, fill, stroke, border } = props;
  return (
    <div className={''.concat(!isFirst && 'ms-3')} tabIndex={0}>
      <div className='d-flex justify-content-center align-items-center'>
        <CategoryIcon imgSrc={imgSrc} bgColor={bgColor} fill={fill} stroke={stroke} border={border} />
      </div>
      <div
        className='text-center mt-2'
        style={{ width: '72px', height: 'auto', wordWrap: 'break-word', fontSize: '12px', lineHeight: '1rem' }}
      >
        <span className=''>{value}</span>
      </div>
    </div>
  );
};

const CarouselComp = function ({ ...props }) {
  const { imgList } = props;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      nextLabel={null}
      prevLabel={null}
      activeIndex={index}
      slide={true}
      interval={null}
      onSelect={handleSelect}
      nextIcon={<ArrowRight />}
      prevIcon={<ArrowLeft />}
      className='bg-success d-flex justify-content-center align-items-center'
      style={{ width: '100%', height: '100%' }}
    >
      {imgList?.map(function (currImg, index) {
        return (
          <Carousel.Item key={index} className=''>
            <div className='d-flex justify-content-center align-items-center'>
              <img alt='' className='d-block' src={currImg} style={{ width: '100%', height: '100%' }} />
            </div>
          </Carousel.Item>
        );
      })}
      <Carousel.Item className=''>
        <div className='d-flex justify-content-center align-items-center'>
          <img className='d-block' src={toAbsoluteUrl('/images/icon-phone.png')} />
        </div>
      </Carousel.Item>
      <Carousel.Item className=''>
        <div className='d-flex justify-content-center align-items-center'>
          <img className='d-block ' src={toAbsoluteUrl('/images/icon-mail.png')} />
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

const CustomModal = function ({ ...props }) {
  const { goBack, productData } = props;
  console.info(window.innerHeight);
  const modalHeight = window.innerHeight < 800 && 720;
  const modalWidth = window.innerWidth < 1280 ? window.innerWidth : (window.innerWidth * 80) / 100;
  let temp = {
    id: 'String',
    shopId: 'String',
    name: 'String',
    category: 'ProductDataCategory',
    imageUrls: [
      'https://giaxeoto.vn/admin/upload/images/resize/640-ngoai-that-xe-hyundai-tucson-2021.jpg',
      'https://files01.danhgiaxe.com/eKq6aJIpR2XaeQsgNY6cUQbEWCw=/fit-in/1280x0/20201128/2021-hyundai-tucson-9-160014058622898887272-105551.jpg',
      'https://image.thanhnien.vn/1024/uploaded/chicuong/2021_03_10/tcmotor/hyundai-uk-all-new-tucson-1220-47_yuft.jpg',
    ],
    description: 'String',
    deleted: false,
    masterTag: 'String',
    subTags: ['String', 'an', 'dsdas das dasd ad a', 'dasf dad as das da', 'dasd  dasd sdas asd asd as'],
    skus: ['Sku'],
    createdAt: 'String',
    updatedAt: 'String',
  };
  return (
    <div
      className='my-5 d-block'
      style={{
        width: modalWidth,
        height: modalHeight,
      }}
    >
      <div className='d-flex py-3 justify-content-start align-items-center'>
        <div className='col-3 d-flex justify-content-start align-items-center'>
          <button
            className='btn rounded-circle d-flex justify-content-center align-items-center bg-light'
            style={{
              width: '40px',
              height: '40px',
              filter: `drop-shadow(0px 4px 8px rgba(13, 27, 30, 0.1))`,
              cursor: 'pointer',
            }}
            onClick={function (evt) {
              goBack(evt);
            }}
          >
            <div className='d-block'>
              <SVG src={toAbsoluteUrl('/assets/commons/cross.svg')} style={{ width: '24px', height: '24px', marginTop: '-2px' }}></SVG>
            </div>
          </button>
        </div>
        <div className='col-9 d-flex justify-content-end align-items-center'>
          <button
            type='button'
            className='btn border rounded-pill px-3 align-items-center bg-white'
            style={{ fontSize: '14px', height: '40px' }}
            onClick={function () {}}
          >
            <span className='fw-bold'>Ghé cửa hàng</span>
          </button>
          <button
            type='button'
            className='btn bg-white rounded-pill border px-3 align-items-center d-flex justify-content-center align-items-center ms-1'
            style={{ fontSize: '14px', height: '40px', width: '120px' }}
            onClick={() => {
              navigator?.clipboard?.writeText(window.location.href);
              window.alert('Shop url is copied');
            }}
          >
            <SVG className='me-2' src={toAbsoluteUrl('/assets/share-2.svg')} width={20} height={20}></SVG>
            <span className='fw-bold'>Chia sẻ</span>
          </button>
          <button
            type='button'
            className='btn btn-primary rounded-pill px-3 align-items-center d-flex justify-content-center align-items-center ms-1'
            style={{ fontSize: '14px', height: '40px', width: '100px' }}
            onClick={() => {
              navigator?.clipboard?.writeText(window.location.href);
              window.alert('Shop url is copied');
            }}
          >
            <span className='fw-bold'>Contact</span>
            {/* <SVG className='me-2' src={toAbsoluteUrl('/assets/share-2.svg')} width={20} height={20}></SVG> */}
          </button>
        </div>
      </div>
      <div className='d-flex'>
        <div className='col-6 d-flex justify-content-center align-items-center p-0' style={{ minHeight: '600px' }}>
          <CarouselComp imgList={temp.imageUrls} />
        </div>
        <div className='col-6 bg-white' style={{ minHeight: '600px', padding: '24px' }}>
          <div aria-label='title' className=''>
            <h1 className='fw-bold' style={{ fontSize: '24px' }}>
              {temp.name}
            </h1>
          </div>
          <div className=''>
            <div className='d-flex justify-content-start align-items-center' style={{ flexWrap: 'wrap' }}>
              <div
                aria-label='master-tag'
                className='mb-2 border d-flex justify-content-center rounded-pill px-3 align-items-center bg-dark'
                style={{ fontSize: '14px', height: '40px', color: 'white' }}
              >
                <span className='fw-bold'>{temp.masterTag}</span>
              </div>
              {temp.subTags.map(function (currTag) {
                return (
                  <div
                    key={currTag}
                    className='mb-2 rounded-pill border px-3 align-items-center d-flex justify-content-center align-items-center ms-1'
                    style={{ fontSize: '14px', height: '40px' }}
                  >
                    <span className=''>{currTag}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='pt-1'>
            <div className='' style={{ color: '#6E7678', fontSize: '14px' }}>
              <span className=''>{temp.price ? temp.price : 0}</span>
              <span className='ms-1'>đ</span>
              <span className='ms-1'>•</span>
              <span className='ms-1'>Game retro</span>
            </div>
          </div>
          <div className='pt-2'>
            <p style={{ fontSize: '14px' }}>
              Bàn điều khiển trò chơi điện tử cầm tay Bulit-in 400 Trò chơi cổ điển Retro Trò chơi màn hình 3.0 inch Máy chơi trò chơi
              Arcade di động, Trò chơi 400 Retro FC tích hợp, Một người bạn đồng hành hoàn hảo để thúc đẩy khả năng phối hợp mắt của trẻ em,
              Nó cũng có thể đưa bạn về tuổi thơ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailV2Page = () => {
  const history = useHistory();
  const location = useLocation();
  console.info('locationProduct', location);
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    skus: [],
    id: null,
    imageUrls: [],
    description: '',
    name: '',
    category: { id: '', name: '' },
    shopId: '',
    productsRelate: [],
    shopInfo: null,
    sizes: [],
    colors: [],
    status: null,
    sku: { currentPrice: 0 },
    records: [],
    typesObj: null,
  });

  const {
    loading: getProductLoading,
    error: getProductError,
    data: getProductData,
  } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  const goBack = function (evt) {
    evt?.preventDefault();
    evt?.stopPropagation();
    history.goBack();
  };

  useEffect(
    function () {
      if (getProductData?.getProduct?.data) {
        const { skus, id, imageUrls, description, name, category, shopId } = getProductData?.getProduct?.data;
        setProductData({
          ...productData,
          skus,
          id,
          imageUrls,
          description,
          name,
          category,
          shopId,
        });
      }
    },
    [getProductData?.getProduct?.data, productData]
  );

  return (
    <Modal
      className='p-0 d-flex justify-content-center'
      show={true}
      dialogAs={function () {
        return <CustomModal goBack={goBack} productData={productData}></CustomModal>;
      }}
      // dialogClassName='w-75'
      onHide={goBack}
      style={{
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   bottom: 0,
        //   right: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        //   zIndex: '999',
      }}
    ></Modal>
  );
};

export default ProductDetailV2Page;
