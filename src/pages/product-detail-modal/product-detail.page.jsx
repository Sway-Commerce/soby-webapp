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
      className='bg-dark d-flex justify-content-center align-items-center'
      style={{ width: '100%', height: '100%' }}
    >
      {imgList?.map(function (currImg, index) {
        return (
          <Carousel.Item key={index} className=''>
            <div className='d-flex justify-content-center align-items-center'>
              <img
                alt=''
                className='d-block'
                src={currImg}
                style={{ height: '600px', width: '100%', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}
              />
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

const CustomModal = function ({ ...props }) {
  const { goBack, productData, getProductError, getProductLoading } = props;
  const modalHeight = window.innerHeight < 800 && 720;
  const modalWidth = window.innerWidth < 1280 ? window.innerWidth : (window.innerWidth * 80) / 100;
  const [skuList, setSkuList] = useState(productData?.skus ? productData?.skus : []);
  const defaultSku = {
    id: productData?.id,
    productId: '',
    originPrice: '0',
    currentPrice: '0',
    totalQuantity: 0,
    remainingQuantity: 0,
    description: productData?.description,
    masterTag: productData?.masterTag,
    subTags: productData?.subTags ? productData?.subTags : [],
    imageUrls: productData?.imageUrls ? productData?.imageUrls : [],
    properties: [],
    deleted: false,
  };
  const [activeSku, setActiveSku] = useState(skuList.length > 0 ? skuList[0] : defaultSku);

  return (
    <>
      {getProductLoading ? (
        <Spinner />
      ) : (
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
                onClick={goBack}
              >
                <span className='fw-bold'>Ghé cửa hàng</span>
              </button>
              <button
                type='button'
                className='btn bg-white rounded-pill border px-3 align-items-center d-flex justify-content-center align-items-center ms-1'
                style={{ fontSize: '14px', height: '40px' }}
                onClick={() => {
                  navigator?.clipboard?.writeText(window.location.href);
                  window.alert('Shop url is copied');
                }}
              >
                <SVG
                  className='me-2'
                  src={toAbsoluteUrl('/assets/commons/share.svg')}
                  width={20}
                  height={20}
                  style={{ fill: '#0D1B1E' }}
                ></SVG>
                <span className='fw-bold' style={{ marginTop: '-2px' }}>
                  Chia sẻ
                </span>
              </button>
              <button
                type='button'
                className='btn btn-primary rounded-pill px-3 align-items-center d-flex justify-content-center align-items-center ms-1'
                style={{ fontSize: '14px', height: '40px' }}
                onClick={() => {
                  // navigator?.clipboard?.writeText(window.location.href);
                  // window.alert('Shop url is copied');
                }}
              >
                <span className='fw-bold'>Contact</span>
                <SVG
                  className='ms-1'
                  src={toAbsoluteUrl('/assets/commons/vector-right.svg')}
                  width={20}
                  height={20}
                  style={{ transform: 'rotate(90deg)', marginTop: '2px', fill: '#FFFFFF' }}
                ></SVG>
              </button>
            </div>
          </div>
          <div className='d-flex'>
            <div className='col-6 d-flex justify-content-center align-items-center p-0' style={{ minHeight: '600px' }}>
              <CarouselComp imgList={activeSku?.imageUrls} />
            </div>
            <div className='col-6 bg-white' style={{ minHeight: '600px', padding: '24px' }}>
              <div aria-label='title' className=''>
                <h1 className='fw-bold' style={{ fontSize: '24px' }}>
                  {productData?.name}
                </h1>
              </div>
              <div className=''>
                <div className='d-flex justify-content-start align-items-center' style={{ flexWrap: 'wrap' }}>
                  {skuList.length > 0 ? (
                    skuList.map(function (currSku) {
                      const activeTagStyle = {
                        color: 'white',
                        backgroundColor: 'bg-dark',
                      };
                      return (
                        <div
                          key={currSku.id}
                          className={`mb-2 rounded-pill border px-3 align-items-center d-flex justify-content-center align-items-center me-1 ${
                            activeSku.masterTag === currSku.masterTag && activeTagStyle.backgroundColor
                          }`}
                          style={{
                            fontSize: '14px',
                            height: '40px',
                            color: activeSku.masterTag === currSku.masterTag && activeTagStyle.color,
                          }}
                          onClick={function (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                            setActiveSku(currSku);
                          }}
                        >
                          <span className=''>{currSku.masterTag}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      aria-label='master-tag'
                      className='mb-2 border d-flex justify-content-center rounded-pill px-3 align-items-center bg-dark'
                      style={{ fontSize: '14px', height: '40px', color: 'white' }}
                    >
                      <span className='fw-bold'>{activeSku?.masterTag}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className='pt-1'>
                <div className='' style={{ color: '#6E7678', fontSize: '14px' }}>
                  <span className=''>{activeSku?.currentPrice}</span>
                  <span className='ms-1'>đ</span>
                  {activeSku?.subTags.length > 0 && <span className='ms-2 me-1'>•</span>}
                  {activeSku?.subTags.map(function (currSubTag, index) {
                    if (index === 0) {
                      return (
                        <span key={index} className=''>
                          {currSubTag}
                        </span>
                      );
                    } else {
                      return (
                        <span key={index}>
                          <span className=''>,</span>
                          <span className='ms-1'>{currSubTag}</span>
                        </span>
                      );
                    }
                  })}
                </div>
              </div>
              <div className='pt-2'>
                <p style={{ fontSize: '14px' }}>{activeSku?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ProductDetailV2Page = () => {
  const history = useHistory();
  const location = useLocation();
  console.info('locationProduct', location);
  const { productId } = useParams();
  console.info('productId', productId);
  const [productData, setProductData] = useState({
    id: '',
    shopId: '',
    name: '',
    category: {},
    imageUrls: [],
    description: '',
    skus: [],
    masterTag: '',
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
        const { category, description, id, imageUrls, name, skus, shopId, masterTag } = getProductData?.getProduct?.data;
        console.info('productData', getProductData?.getProduct?.data);
        setProductData({
          ...productData,
          skus,
          id,
          imageUrls,
          description,
          name,
          category,
          shopId,
          masterTag,
        });
      }
    },
    [getProductData?.getProduct?.data]
  );

  return (
    <Modal
      className='p-0 d-flex justify-content-center'
      show={true}
      dialogAs={function () {
        return (
          <CustomModal
            goBack={goBack}
            productData={productData}
            getProductLoading={getProductLoading}
            getProductError={getProductError}
          ></CustomModal>
        );
      }}
      onHide={goBack}
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
      }}
    ></Modal>
  );
};

export default ProductDetailV2Page;
