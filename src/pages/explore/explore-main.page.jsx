import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_SHOP_CATEGORIES } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import useDebounce from 'shared/hooks/useDebounce';
import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import SVG from 'react-inlinesvg';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
import { categoryIconMapper } from './icon.mapper';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ScrollContainer from 'react-indiana-drag-scroll';

const CategoryIcon = function ({ ...props }) {
  const { imgSrc, fill } = props;

  return (
    <div
      className='rounded-circle d-flex justify-content-center align-items-center'
      style={{ width: '48px', height: '48px', backgroundColor: '#F3F4F4' }}
    >
      <div className='d-block'>
        <SVG src={toAbsoluteUrl(imgSrc)} style={{ width: '24px', height: '24px', marginTop: '-2px', fill: `${fill}` }}></SVG>
      </div>
    </div>
  );
};

const CategoryItem = function ({ ...props }) {
  const { imgSrc, value, isFirst } = props;
  return (
    <div className={''.concat(!isFirst && 'ms-3')} tabIndex={0}>
      <div className='d-flex justify-content-center align-items-center'>
        <CategoryIcon imgSrc={imgSrc}></CategoryIcon>
      </div>
      <div
        className='text-center mt-1'
        style={{ width: '72px', height: 'auto', wordWrap: 'break-word', fontSize: '12px', lineHeight: '.8rem' }}
      >
        <span className=''>{value}</span>
      </div>
    </div>
  );
};

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

const Shop = function ({ ...props }) {
  const { imgSrc, shopId } = props;
  return (
    <div
      key={shopId}
      // onClick={() => {window.location = `/product/${shopId}`}}
      className=''
      style={{ width: '216px' }}
    >
      <div className=''>
        <SVG src={toAbsoluteUrl(imgSrc)} style={{ width: '216px', height: '216px' }}></SVG>
        {/* <img src={imgSrc} style={{ width: '190px', height: '190px' }} /> */}
      </div>
      <div className='' style={{ marginTop: '8px' }}>
        <h5 className='fw-bold mb-0' style={{ fontSize: '16px' }}>
          Houseeker
        </h5>
      </div>
      <div className='' style={{ marginTop: '8px' }}>
        <div
          className='rounded-pill d-flex justify-content-center align-items-center p-0'
          style={{ backgroundColor: '#725CFD', width: '48px' }}
        >
          <div className='d-block p-0' style={{ marginLeft: '-2px' }}>
            <SVG
              className=''
              src={toAbsoluteUrl('/assets/commons/star.svg')}
              style={{ width: '12px', height: '12px', fill: 'white', marginTop: '-2px' }}
            ></SVG>
          </div>
          <div>
            <span className='' style={{ fontSize: '12px', color: 'white', marginLeft: '5px' }}>
              9.5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopRow = function ({ ...props }) {
  const { isFirst, shopList } = props;
  return (
    <div className={`d-flex flex-wrap justify-content-between ${!isFirst && 'mt-4'}`}>
      {shopList?.map(function (shop) {
        return <Shop imgSrc={'/assets/commons/no-shop-img.svg'} />;
      })}
      {/* {shops.map((product) => {
        return <Shop imgSrc={product.imageUrls[0]} productId={product.id} />;
      })} */}
    </div>
  );
};

const ExploreMainPage = () => {
  const [shopCategories, setShopCategories] = useState([]);
  const [topValueShops, setTopValueShops] = useState([]);
  const [breadcrumbs, setBreadcrumb] = useState([
    {
      name: 'Trang chủ',
      src: '/',
    },
  ]);

  const [getAllShopCategories, { loading: getAllShopCategoriesLoading, error: getAllShopCategoriesError, data: getAllShopCategoriesData }] =
    useLazyQuery(GET_ALL_SHOP_CATEGORIES);
  console.log('test', shopCategories);

  useEffect(
    function () {
      breadcrumbs.push({
        name: 'Khám phá',
        src: '/explore',
      });
      setBreadcrumb(breadcrumbs);
    },
    [breadcrumbs]
  );

  useEffect(() => {
    if (!shopCategories?.length) {
      getAllShopCategories();
      if (getAllShopCategoriesData?.getAllShopCategories?.data) {
        setShopCategories(getAllShopCategoriesData?.getAllShopCategories?.data);
      }
    }
  }, [getAllShopCategories, getAllShopCategoriesData, shopCategories]);

  return (
    <div className='container-fluid mt-3 mb-5'>
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />

      <div aria-label='title' className='row'>
        <div>
          <h1 className='fw-bold'>Khám phá cửa hàng</h1>
        </div>
      </div>
      <div aria-label='category-selection-bar' className='row pt-4 pb-4'>
        <ScrollContainer horizontal={true} vertical={false} className='d-flex'>
          {Object.keys(categoryIconMapper).map(function (currCategory, index) {
            return (
              <Link key={categoryIconMapper[currCategory].id} to={`/explore/${categoryIconMapper[currCategory].id}`}>
                <CategoryItem
                  imgSrc={categoryIconMapper[currCategory].iconSrc}
                  value={categoryIconMapper[currCategory].name}
                  isFirst={index === 0}
                ></CategoryItem>
              </Link>
            );
          })}
        </ScrollContainer>
      </div>

      <div aria-label='title' className='row pt-2'>
        <div>
          <h2 className='fw-bold pb-0'>Cửa hàng phổ biến</h2>
          <p className='pt-0'>Khám phá các doanh nghiệp thịnh hành đang phát triển trực tuyến</p>
        </div>
      </div>
      <div aria-label='popular-shop' className='row'>
        <div aria-label='shop-item-wrapper' className=''>
          <ShopRow isFirst></ShopRow>
          <ShopRow></ShopRow>
          <hr className='hr' style={{ color: '#E7E8E9' }} />
        </div>
      </div>
    </div>
  );
};

export default ExploreMainPage;