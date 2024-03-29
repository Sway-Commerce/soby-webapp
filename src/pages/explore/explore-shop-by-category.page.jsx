import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
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
import { getColor } from 'shared/constants/shop.constant';

const Shop = function ({ ...props }) {
  const { imgSrc, shopData } = props;
  const score = shopData?.shopRank?.totalPoints / 10;
  return (
    <Link className='' to={`/shop-profile/${shopData.id}`}>
      <div
        // onClick={() => {window.location = `/product/${shopId}`}}
        className='pb-2'
        style={{ width: '216px' }}
      >
        <div className='d-flex justify-content-center align-items-center border' style={{ height: '216px' }}>
          {/* <SVG src={toAbsoluteUrl(imgSrc)} style={{ width: '216px', height: '216px' }}></SVG> */}
          <div className=''>
            <img className='' src={shopData.logoUrl} style={{ width: '100%' }} />
          </div>
        </div>
        <div className='' style={{ marginTop: '8px' }}>
          <h5 className='fw-bold mb-0' style={{ fontSize: '16px' }}>
            {shopData.name}
          </h5>
        </div>
        <div className='' style={{ marginTop: '8px' }}>
          <div
            className='rounded-pill d-flex justify-content-center align-items-center p-0'
            style={{ backgroundColor: getColor(score), width: '48px' }}
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
                {score}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ShopRow = function ({ ...props }) {
  const { isFirst, shopList } = props;
  return (
    <div className={`d-flex flex-wrap justify-content-between ${!isFirst && 'mt-4'}`}>
      {shopList?.map(function (shop) {
        return <Shop key={shop.id} imgSrc={'/assets/commons/no-shop-img.svg'} shopData={shop} />;
      })}
    </div>
  );
};

const ExploreShopByCategoryPage = () => {
  const { categoryId } = useParams();

  const [shopsByCategory, setShopsByCategory] = useState([]);
  const [numOfShopsInRow, setNumOfShopsInRow] = useState(5);
  const [breadcrumbs, setBreadcrumb] = useState([
    {
      name: 'Trang chủ',
      src: '/',
    },
  ]);
  const [query, setQuery] = useState({
    page: 0,
    pageSize: 6,
    filters: [`categories.id:${categoryId}`],
    queries: [],
    sorts: [],
  });

  const [searchAggregatedShop, { data: searchAggregatedShopData, loading: searchAggregatedShopLoading, error: searchAggregatedShopError }] =
    useLazyQuery(SEARCH_AGGREGATED_SHOP, {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    });

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
    if (query.filters.length) {
      if (!shopsByCategory.length) {
        searchAggregatedShop({
          variables: {
            query,
          },
        });
      }
    }
  }, [query, searchAggregatedShop, shopsByCategory.length]);

  useEffect(() => {
    if (searchAggregatedShopData?.searchAggregatedShop?.data) {
      let shopCategoryData = [...searchAggregatedShopData?.searchAggregatedShop?.data?.records];
      let tempArr = [];
      while (shopCategoryData.length > 0) {
        tempArr.push(shopCategoryData.splice(0, numOfShopsInRow));
      }
      setShopsByCategory(tempArr);
    }
  }, [numOfShopsInRow, searchAggregatedShopData?.searchAggregatedShop?.data]);

  console.info('shopsByCategory', shopsByCategory);

  return (
    <div className='container-fluid mt-3 mb-5'>
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />
      <div aria-label='title' className='row'>
        <div>
          <h1 className='fw-bold'>Khám phá cửa hàng</h1>
        </div>
      </div>
      <div aria-label='shops-by-category' className='row'>
        <div aria-label='shop-item-wrapper' className=''>
          {shopsByCategory.map(function (shopRow, index) {
            if (index === 0) {
              return <ShopRow key={index} isFirst shopList={shopRow}></ShopRow>;
            } else {
              return <ShopRow key={index} shopList={shopRow}></ShopRow>;
            }
          })}
          <hr className='hr' style={{ color: '#E7E8E9' }} />
        </div>
      </div>
    </div>
  );
};

export default ExploreShopByCategoryPage;
