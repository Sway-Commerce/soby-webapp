import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory, Switch, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
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
import { categoryIconMapper } from '../explore/icon.mapper';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ScrollContainer from 'react-indiana-drag-scroll';
import { getColor } from 'shared/constants/shop.constant';
import { Carousel } from 'react-bootstrap';

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
      className='bg-danger'
    >
      <Carousel.Item>
        <img className='d-block' src={toAbsoluteUrl('/images/icon-phone.png')} />
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block ' src={toAbsoluteUrl('/images/icon-mail.png')} />
      </Carousel.Item>
    </Carousel>
  );
};
const test = function ({ ...props }) {
  return <div>abc test</div>;
};
const test2 = function ({ ...props }) {
  return <div>abc tes31 3133t</div>;
};

const ProductDetailV2Page = () => {
  const location = useLocation();
  console.info('locationProduct', location);
  const [breadcrumbs, setBreadcrumb] = useState([
    {
      name: 'Trang chủ',
      src: '/',
    },
  ]);
  // const [index, setIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  useEffect(
    function () {
      breadcrumbs.push({
        name: 'Sản phẩm',
        src: '/product',
      });
      setBreadcrumb(breadcrumbs);
    },
    [breadcrumbs]
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className='container-fluid mt-3 mb-5 '>
        {/* <SharedBreadcrumb breadcrumbs={breadcrumbs} /> */}
        <div className='row'>
          dsads
          {/* <Switch>
            <Route path='/product/:id' children={<test />} />
            <Route path='/product/:id/:id2' children={<test2 />} />
          </Switch> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailV2Page;
