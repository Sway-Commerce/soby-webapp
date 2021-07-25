import React, { useEffect, useState, useContext, useCallback } from 'react';
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
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { categoryIconMapper } from './icon.mapper';

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
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = useContext(VisibilityContext);
  const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <button
      type='button'
      onClick={function (evt) {
        scrollNext();
      }}
      disabled={disabled}
      style={{ border: '0', backgroundColor: `rgba(0,0,0,0)` }}
    >
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
    </button>
  );
};

const ArrowLeft = function ({ ...props }) {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators } = useContext(VisibilityContext);
  const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isFirstItemVisible);
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <button
      type='button'
      onClick={function (evt) {
        scrollPrev();
      }}
      disabled={disabled}
      style={{ border: '0', backgroundColor: `rgba(0,0,0,0)` }}
    >
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
    </button>
  );
};

const ScrollMenuV1 = function ({ ...props }) {
  // return (
  //   <ScrollMenu
  //   // arrowLeft={ArrowLeft}
  //   // arrowRight={ArrowRight}
  //   // data={function () {
  //   //   Object.keys(categoryIconMapper).map(function (currCategory, index) {
  //   //     return (
  //   //       <CategoryItem
  //   //         key={categoryIconMapper[currCategory].id}
  //   //         imgSrc={categoryIconMapper[currCategory].iconSrc}
  //   //         value={categoryIconMapper[currCategory].name}
  //   //         isFirst={index === 0}
  //   //       ></CategoryItem>
  //   //     );
  //   //   });
  //   // }}
  //   // dragging={true}
  //   // hideArrows={hideArrows}
  //   // hideSingleArrow={hideSingleArrow}
  //   // onFirstItemVisible={this.onFirstItemVisible}
  //   // onLastItemVisible={this.onLastItemVisible}
  //   // onSelect={this.onSelect}
  //   // onUpdate={this.onUpdate}
  //   // ref={(el) => (this.menu = el)}
  //   // scrollToSelected={scrollToSelected}
  //   // selected={selected}
  //   // transition={+0.3}
  //   // translate={0}
  //   // wheel={true}
  //   />
  // );
};

const onWheel = function (apiObj, evt) {
  const isThouchpad = Math.abs(evt.deltaX) !== 0 || Math.abs(evt.deltaY) < 15;

  if (isThouchpad) {
    evt.stopPropagation();
    return;
  }

  if (evt.deltaY < 0) {
    apiObj.scrollNext();
  } else if (evt.deltaY > 0) {
    apiObj.scrollPrev();
  }
};

const ExplorePage = () => {
  const [shopCategories, setShopCategories] = useState([]);
  const [position, setPosition] = React.useState(0);

  const [getAllShopCategories, { loading: getAllShopCategoriesLoading, error: getAllShopCategoriesError, data: getAllShopCategoriesData }] =
    useLazyQuery(GET_ALL_SHOP_CATEGORIES);
  console.log('test', shopCategories);

  useEffect(() => {
    if (!shopCategories?.length) {
      getAllShopCategories();
      if (getAllShopCategoriesData?.getAllShopCategories?.data) {
        setShopCategories(getAllShopCategoriesData?.getAllShopCategories?.data);
      }
    }
  }, [getAllShopCategories, getAllShopCategoriesData, shopCategories]);

  const restorePosition = useCallback(
    function ({ scrollContainer }) {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft = position;
      }
    },
    [position]
  );

  const savePosition = React.useCallback(function ({ scrollContainer }) {
    !!scrollContainer.current && setPosition(scrollContainer.current.scrollLeft);
  }, []);

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
        <div aria-label='category-selection-bar' className='row pt-4 pb-4' style={{ width: '300px' }}>
          {/* <div className='d-flex bg-danger' style={{ overflow: 'hidden', width: '300px'  }}>
            <CategoryItem imgSrc='/assets/categories/food.svg' value='test'></CategoryItem>
            {Object.keys(categoryIconMapper).map(function (currCategory, index) {
              return (
                <CategoryItem
                  key={categoryIconMapper[currCategory].id}
                  imgSrc={categoryIconMapper[currCategory].iconSrc}
                  value={categoryIconMapper[currCategory].name}
                  isFirst={index === 0}
                ></CategoryItem>
              );
            })}
            <button type='button' style={{ position: 'absolute' }} onClick={{}}>next</button>;
          </div> */}

          <ScrollMenu LeftArrow={ArrowLeft} RightArrow={ArrowRight}>
            {Object.keys(categoryIconMapper).map(function (currCategory, index) {
              return (
                <CategoryItem
                  key={categoryIconMapper[currCategory].id}
                  imgSrc={categoryIconMapper[currCategory].iconSrc}
                  value={categoryIconMapper[currCategory].name}
                  isFirst={index === 0}
                ></CategoryItem>
              );
            })}
          </ScrollMenu>
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
