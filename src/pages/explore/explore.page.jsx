import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_SHOP_CATEGORIES } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import useDebounce from 'shared/hooks/useDebounce';
import SVG from 'react-inlinesvg';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';

const Symbol48px = styled.div`
  width: 48px;
  height: 48px;
`;

const CategoryItem = function ({ itemName, bgColor, iconSrc, url, isFirst }) {
  return (
    <>
      <Link
        to={url}
        className={`d-flex flex-column align-items-center ${!isFirst && 'ms-4'}`}
        style={{
          width: '110px',
          lineHeight: '1rem',
        }}
      >
        <Symbol48px
          className='d-flex justify-content-center align-items-center rounded-circle mb-2'
          style={{
            backgroundColor: `${bgColor}`,
          }}
        >
          <SVG src={toAbsoluteUrl(`${iconSrc}`)}></SVG>
        </Symbol48px>
        <div className='text-center'>
          <span>{itemName}</span>
        </div>
      </Link>
    </>
  );
};

const ExplorePage = () => {
  const [shopCategories, setShopCategories] = useState([]);
  const [getAllShopCategories, { loading: getAllShopCategoriesLoading, error: getAllShopCategoriesError, data: getAllShopCategoriesData }] =
    useLazyQuery(GET_ALL_SHOP_CATEGORIES);
  // console.log("test", !shopCategories?.length)
  useEffect(() => {
    if (!shopCategories?.length) {
      getAllShopCategories();
      if (getAllShopCategoriesData?.getAllShopCategories?.data) {
        setShopCategories(getAllShopCategoriesData?.getAllShopCategories?.data);
      }
    }
  }, [getAllShopCategories, getAllShopCategoriesData, shopCategories]);

  return (
    <>
      <div className='container mt-3'>
        <div
          style={{
            fontSize: '14px',
            color: '#6E7678',
          }}
        >
          <span
            style={{
              marginRight: '.5rem',
            }}
          >
            Home
          </span>
          <span
            style={{
              marginRight: '.5rem',
            }}
          >
            /
          </span>
          <span
            style={{
              marginRight: '.5rem',
            }}
          >
            Explore
          </span>
        </div>
        <div aria-label='title' className='row'>
          <div>
            <h1 className='fw-bold'>Explore Shops</h1>
          </div>
        </div>
        <div aria-label='category-selection-bar' className='row pt-4 pb-4'>
          <div className='d-flex justify-content-start align-items-start'>
            <CategoryItem itemName='Food & Beverages' bgColor='#FFA800' iconSrc='/assets/food.svg' url='/' isFirst></CategoryItem>
          </div>
        </div>

        <div aria-label='title' className='row pt-2'>
          <div>
            <h2 className='fw-bold pb-0'>Popular Shops</h2>
            <p className='pt-0'>Explore the trending businesses that are growing online</p>
          </div>
        </div>
        <div aria-label='popular-shop' className='d-flex flex-row-fluid flex-wrap pb-5 justify-content-start'>
          <div aria-label='shop-item-wrapper' className='d-flex flex-column col-3 justify-content-center align-items-center pt-3'>
            <div aria-label='shop-item'>
              <div aria-label='shop-item-logo' className=''>
                <img aria-label='logo' width={216} height={216} />
              </div>
              <div aria-label='shop-item-title' className='mt-2'>
                <div aria-label='shop-name' className=''>
                  <h5 className='fw-bold'>Houseeker</h5>
                </div>
                <div aria-label='rating' className='d-inline rounded-pill bg-primary px-2 py-2'>
                  <span className='text-white fw-bold'>
                    <SVG src={toAbsoluteUrl('/assets/star.svg')}></SVG>
                  </span>
                  <span className='text-white fw-bold'>5</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-label='shop-item-wrapper' className='d-flex flex-column col-3 justify-content-center align-items-center pt-3'>
            <div aria-label='shop-item'>
              <div aria-label='shop-item-logo' className=''>
                <img aria-label='logo' width={216} height={216} />
              </div>
              <div aria-label='shop-item-title' className='mt-2'>
                <div aria-label='shop-name' className=''>
                  <h5 className='fw-bold'>Houseeker</h5>
                </div>
                <div aria-label='rating' className='d-inline rounded-pill bg-primary px-2 py-2'>
                  <span className='text-white fw-bold'>
                    <SVG src={toAbsoluteUrl('/assets/star.svg')}></SVG>
                  </span>
                  <span className='text-white fw-bold'>5</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-label='shop-item-wrapper' className='d-flex flex-column col-3 justify-content-center align-items-center pt-3'>
            <div aria-label='shop-item'>
              <div aria-label='shop-item-logo' className=''>
                <img aria-label='logo' width={216} height={216} />
              </div>
              <div aria-label='shop-item-title' className='mt-2'>
                <div aria-label='shop-name' className=''>
                  <h5 className='fw-bold'>Houseeker</h5>
                </div>
                <div aria-label='rating' className='d-inline rounded-pill bg-primary px-2 py-2'>
                  <span className='text-white fw-bold'>
                    <SVG src={toAbsoluteUrl('/assets/star.svg')}></SVG>
                  </span>
                  <span className='text-white fw-bold'>5</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-label='shop-item-wrapper' className='d-flex flex-column col-3 justify-content-center align-items-center pt-3'>
            <div aria-label='shop-item'>
              <div aria-label='shop-item-logo' className=''>
                <img aria-label='logo' width={216} height={216} />
              </div>
              <div aria-label='shop-item-title' className='mt-2'>
                <div aria-label='shop-name' className=''>
                  <h5 className='fw-bold'>Houseeker</h5>
                </div>
                <div aria-label='rating' className='d-inline rounded-pill bg-primary px-2 py-2'>
                  <span className='text-white fw-bold'>
                    <SVG src={toAbsoluteUrl('/assets/star.svg')}></SVG>
                  </span>
                  <span className='text-white fw-bold'>5</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-label='shop-item-wrapper' className='d-flex flex-column col-3 justify-content-center align-items-center pt-3'>
            <div aria-label='shop-item'>
              <div aria-label='shop-item-logo' className=''>
                <img aria-label='logo' width={216} height={216} />
              </div>
              <div aria-label='shop-item-title' className='mt-2'>
                <div aria-label='shop-name' className=''>
                  <h5 className='fw-bold'>Houseeker</h5>
                </div>
                <div aria-label='rating' className='d-inline rounded-pill bg-primary px-2 py-2'>
                  <span className='text-white fw-bold'>
                    <SVG src={toAbsoluteUrl('/assets/star.svg')}></SVG>
                  </span>
                  <span className='text-white fw-bold'>5</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-label='shop-item-wrapper' className='d-flex flex-column col-3 justify-content-center align-items-center pt-3'>
            <div aria-label='shop-item'>
              <div aria-label='shop-item-logo' className=''>
                <img aria-label='logo' width={216} height={216} />
              </div>
              <div aria-label='shop-item-title' className='mt-2'>
                <div aria-label='shop-name' className=''>
                  <h5 className='fw-bold'>Houseeker</h5>
                </div>
                <div aria-label='rating' className='d-inline rounded-pill bg-primary px-2 py-2'>
                  <span className='text-white fw-bold'>
                    <SVG src={toAbsoluteUrl('/assets/star.svg')}></SVG>
                  </span>
                  <span className='text-white fw-bold'>5</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-label='shop-item-wrapper' className='d-flex flex-column col-3 justify-content-center align-items-center pt-3'>
            <div aria-label='shop-item'>
              <div aria-label='shop-item-logo' className=''>
                <img aria-label='logo' width={216} height={216} />
              </div>
              <div aria-label='shop-item-title' className='mt-2'>
                <div aria-label='shop-name' className=''>
                  <h5 className='fw-bold'>Houseeker</h5>
                </div>
                <div aria-label='rating' className='d-inline rounded-pill bg-primary px-2 py-2'>
                  <span className='text-white fw-bold'>
                    <SVG src={toAbsoluteUrl('/assets/star.svg')}></SVG>
                  </span>
                  <span className='text-white fw-bold'>5</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
