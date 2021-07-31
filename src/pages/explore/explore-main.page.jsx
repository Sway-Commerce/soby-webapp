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
import { toAbsoluteUrl } from 'shared/utils/assetsHelper';
import { categoryIconMapper } from './icon.mapper';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ScrollContainer from 'react-indiana-drag-scroll';
import { getColor } from 'shared/constants/shop.constant';

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
            <div className='d-block p-0' style={{ marginLeft: '-2px', marginTop: '-1px' }}>
              <SVG
                className=''
                src={toAbsoluteUrl('/assets/commons/star.svg')}
                style={{ width: '12px', height: '12px', fill: 'white', marginTop: '-2px' }}
              ></SVG>
            </div>
            <div style={{ marginTop: '0px' }}>
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

const ExploreMainPage = () => {
  const [shopCategories, setShopCategories] = useState([]);
  const [shopsByCategory, setShopsByCategory] = useState([]);
  const [numOfShopsInRow, setNumOfShopsInRow] = useState(5);
  const [topValueShops, setTopValueShops] = useState([]);
  const [breadcrumbs, setBreadcrumb] = useState([
    {
      name: 'Trang chủ',
      src: '/',
    },
  ]);
  const [query, setQuery] = useState({
    page: 0,
    pageSize: 10,
    filters: [],
    queries: [],
    sorts: [],
  });

  const [getAllShopCategories, { loading: getAllShopCategoriesLoading, error: getAllShopCategoriesError, data: getAllShopCategoriesData }] =
    useLazyQuery(GET_ALL_SHOP_CATEGORIES);
  console.log('test', shopCategories);

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
    if (!shopCategories?.length) {
      getAllShopCategories();
      if (getAllShopCategoriesData?.getAllShopCategories?.data) {
        setShopCategories(getAllShopCategoriesData?.getAllShopCategories?.data);
      }
    }
  }, [getAllShopCategories, getAllShopCategoriesData, shopCategories]);

  useEffect(() => {
    if (!shopsByCategory.length) {
      searchAggregatedShop({
        variables: {
          query,
        },
      });
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
    <div className='container-fluid mt-3 mb-5' style={{ minHeight: '100vh' }}>
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />

      <div aria-label='title' className='row'>
        <div>
          <h1 className='fw-bold'>Khám phá cửa hàng</h1>
        </div>
      </div>
      <div aria-label='category-selection-bar' className='row pt-4 pb-4'>
        <ScrollContainer horizontal={true} vertical={false} className='d-flex'>
          {shopCategories.map(function (currCategory, index) {
            return (
              <Link key={currCategory.id} to={`/explore/${currCategory.id}`}>
                <CategoryItem
                  imgSrc={categoryIconMapper[currCategory.id]?.iconSrc}
                  value={currCategory?.name}
                  isFirst={index === 0}
                  bgColor='#F3F4F4'
                  fill={categoryIconMapper[currCategory.id]?.fill}
                  stroke={categoryIconMapper[currCategory.id]?.stroke}
                ></CategoryItem>
              </Link>
            );
          })}
        </ScrollContainer>
      </div>

      <div aria-label='title' className='pt-2'>
        <div>
          <h2 className='fw-bold pb-0'>Cửa hàng phổ biến</h2>
          <p className='pt-0'>Khám phá các doanh nghiệp thịnh hành đang phát triển trực tuyến</p>
        </div>
      </div>
      <div aria-label='popular-shop' className=''>
        <div aria-label='shop-item-wrapper' className=''>
          {shopsByCategory?.length ? (
            <>
              <div className='d-flex flex-column align-items-center'>
                <div>
                  <table className='table w-100 table-borderless' style={{ border: '' }}>
                    <thead className=''>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </thead>
                    <tbody>
                      {shopsByCategory.map(function (shopRow, index) {
                        return (
                          <tr key={index}>
                            {shopRow.map(function (shop, index) {
                              return (
                                <td key={index} style={{ width: `${100 / numOfShopsInRow}%` }}>
                                  <Shop key={shop.id} isFirst={index === 0} imgSrc={'/assets/commons/no-shop-img.svg'} shopData={shop} />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className='my-3 text-center'>
              <span className='fst-italic'>Hiện tại chưa có cửa hàng nào bán các sản phẩm thuộc danh mục này</span>
            </div>
          )}
          <hr className='hr' style={{ color: '#E7E8E9' }} />
        </div>
      </div>
    </div>
  );
};

export default ExploreMainPage;
