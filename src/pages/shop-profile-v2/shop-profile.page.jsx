import React, { useEffect, useState, lazy } from 'react';
import styled from 'styled-components';
import { Link, Redirect, Route, Switch, useParams, BrowserRouter as Router, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { GET_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import { SEARCH_PRODUCT } from 'graphQL/repository/product.repository';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../shared/utils/assetsHelper';
import backgroundImg from 'shared/assets/home-background.svg';
import { CustomButton } from '../../components/ui/custom-button/custom-button.component';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
// import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';
import buildAddressString from 'shared/utils/buildAddressString';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from '../../components/shop-item/shop-item.component';
import useDebounce from 'shared/hooks/useDebounce';
import { getColor } from 'shared/constants/shop.constant';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { borderColor } from 'shared/css-variable/variable';

const ProductDetailV2Page = lazy(() => import('pages/product-detail-modal/product-detail.page'));

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
  const { imgSrc, productId } = props;
  return (
    <div
      key={productId}
      onClick={() => {
        window.location = `/product/${productId}`;
      }}
      className=''
      style={{ width: '190px', height: '190px', borderColor: 'black' }}
    >
      <img src={imgSrc} style={{ width: '190px', height: '190px' }} />
    </div>
  );
};

const ProductRow = function ({ ...props }) {
  const { products } = props;
  return (
    <div className='d-flex flex-wrap mt-3 justify-content-between'>
      {products.map((product) => {
        return <Product imgSrc={product.imageUrls[0]} productId={product.id} />;
      })}
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
    </div>
  );
};

const ShopProfileV2Page = () => {
  const location = useLocation();

  console.info('locationShop', location);
  const background = location?.state?.background;
  const { shopId } = useParams();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [shopInfo, setShopInfo] = useState({
    name: '',
    phoneCountryCode: '',
    phoneNumber: '',
    description: '',
    logoUrl: '',
    categories: [],
    shopUrls: [],
    kyb: { status: null },
    records: [],
    email: '',
    coverUrl: '',
    shippingLocation: {
      addressLine: '',
      country: '',
      district: '',
      province: '',
      ward: '',
    },
    shopRank: {
      items: [],
      rank: {},
    },
    kycStatus: '',
  });

  const [breadcrumbs, setBreadcrumb] = useState([
    {
      name: 'Trang chủ / Cửa hàng',
      src: '/',
    },
  ]);

  const [getAggregatedShop, { loading: getAggregatedShopLoading, error: getAggregatedShopError, data: getAggregatedShopData }] =
    useLazyQuery(GET_AGGREGATED_SHOP);

  const [searchProduct, { loading: productLoading, error: productError, data: productData }] = useLazyQuery(SEARCH_PRODUCT);

  useEffect(() => {
    if (shopId) {
      for (const tooltip of document.querySelectorAll('.__react_component_tooltip')) {
        tooltip.addEventListener('click', (e) => e.stopPropagation());
      }
      getAggregatedShop({
        variables: { id: shopId },
      });
    }

    return () => {
      for (const tooltip of document.querySelectorAll('.__react_component_tooltip')) {
        tooltip.removeEventListener('click', (e) => e.stopPropagation());
      }
    };
  }, [shopId]);

  useEffect(() => {
    if (getAggregatedShopError?.message || productError?.message) {
      setFormError(getAggregatedShopError?.message || productError?.message);
      setOpen(true);
    }
  }, [getAggregatedShopError, productError]);

  useEffect(() => {
    if (getAggregatedShopData?.getAggregatedShop?.data) {
      const {
        name,
        phoneCountryCode,
        phoneNumber,
        description,
        logoUrl,
        categories,
        shopUrls,
        kyb,
        email,
        coverUrl,
        shippingLocations,
        shopRank,
        kycStatus,
      } = getAggregatedShopData?.getAggregatedShop?.data;
      const [shippingLocation] = shippingLocations;

      setShopInfo({
        ...shopInfo,
        name,
        phoneCountryCode,
        phoneNumber,
        description,
        logoUrl,
        categories,
        shopUrls,
        kyb,
        email,
        coverUrl,
        shippingLocation,
        shopRank,
        kycStatus,
      });

      setBreadcrumb([
        {
          name: 'Trang chủ / Cửa hàng ',
          src: '/',
        },
        {
          name: name,
          src: `/shop-profile/${shopId}`,
        },
      ]);

      searchProduct({
        variables: {
          searchInput: {
            page: 0,
            pageSize: 8,
            filters: null,
            queries: `shopId:${shopId}`,
            sorts: null,
          },
        },
      });
    }
  }, [getAggregatedShopData?.getAggregatedShop?.data]);

  useEffect(() => {
    if (productData?.searchProduct?.data?.records?.length) {
      setShopInfo({
        ...shopInfo,
        records: productData?.searchProduct?.data?.records,
      });
    }
  }, [productData?.searchProduct?.data]);

  console.info('productData', shopInfo?.records);

  return getAggregatedShopLoading || productLoading ? (
    <Spinner />
  ) : (
    <>
      <Route exact path='/product/:productId' children={<ProductDetailV2Page />} />
      <div className='container-fluid mb-5' style={{ filter: background && 'blur(3px)' }}>
        <SharedBreadcrumb breadcrumbs={breadcrumbs} />

        <Link to={{ pathname: `/product/testId`, state: { background: location } }}>view product</Link>
        <div className='row mt-3 justify-content-center py-2'>
          <div className='col-2 p-0'>
            <div className=''>
              <div className='bg-white border' style={{ width: '160px', height: '160px' }}>
                <img className='avatar' style={{ width: '160px', height: '160px' }} src={shopInfo.logoUrl} alt='' />
              </div>
            </div>
          </div>
          <div className='col-7'>
            <div className='row p-0 pt-2'>
              <h4 className='fw-bold' style={{ fontSize: '32px' }}>
                {shopInfo.name}
              </h4>
            </div>
            <div className='row p-0 pb-2'>
              <div className='d-flex align-items-center'>
                {shopInfo.shopUrls.map((x) => {
                  let imgPath = '';
                  switch (x.type) {
                    case 'FACEBOOK':
                      imgPath = '/assets/facebook.svg';
                      break;
                    case 'INSTAGRAM':
                      imgPath = '/assets/instagram-icon.svg';
                      break;
                    case 'TIKTOK':
                      imgPath = '/assets/instagram-icon.svg';
                      break;
                    case 'ZALO':
                      imgPath = '/assets/instagram-icon.svg';
                      break;
                    case 'SHOPEE':
                      imgPath = '/assets/instagram-icon.svg';
                      break;
                    case 'LAZADA':
                      imgPath = '/assets/instagram-icon.svg';
                      break;
                    default:
                      imgPath = '/assets/instagram-icon.svg';
                      break;
                  }
                  return <ChannelIconLink url={x.url} imgSrc={imgPath} />;
                })}
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
                  onClick={() => {
                    navigator?.clipboard?.writeText(window.location.href);
                    window.alert('Shop url is copied');
                  }}
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
                  value={shopInfo.shopRank.totalPoints / 10}
                  counterClockwise
                  strokeWidth={6}
                  styles={buildStyles({
                    trailColor: '#F3F4F4',
                    pathColor: getColor(shopInfo.shopRank.totalPoints / 10),
                  })}
                >
                  <h4 className='fw-bold' style={{ fontSize: '32px', color: 'black', marginTop: '10px', marginLeft: '-2px' }}>
                    {shopInfo.shopRank.totalPoints / 10}
                  </h4>
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <div className='row text-center mt-2'>
              <h4 className='fw-bold' style={{ fontSize: '16px', color: getColor(shopInfo.shopRank.totalPoints / 10) }}>
                {shopInfo.shopRank.rank.description}
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
                <ProductRow products={shopInfo.records.slice().splice(0, 4)} />
                <ProductRow products={shopInfo.records.slice().splice(4, 8)} />
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
                  {shopInfo.description}
                </p>
              </div>
              <div className='mt-2 py-2'>
                <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                  Thông tin liên hệ
                </h5>
                <div className='mt-2 px-2'>
                  <ContactRow
                    bold
                    imgSrc='/assets/phone-outline-black.svg'
                    value={formatPhoneNumberIntl(`${shopInfo.phoneCountryCode}${shopInfo.phoneNumber}`)}
                  ></ContactRow>
                  <ContactRow imgSrc='/assets/email-outline-black.svg' value={shopInfo.email}></ContactRow>
                </div>
              </div>
              <div className='mt-2 py-2'>
                <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                  Kênh
                </h5>
                <div className='mt-2 px-2'>
                  {shopInfo.shopUrls.map((x) => {
                    let imgPath = '';
                    switch (x.type) {
                      case 'FACEBOOK':
                        imgPath = '/assets/facebook.svg';
                        break;
                      case 'INSTAGRAM':
                        imgPath = '/assets/instagram-icon.svg';
                        break;
                      case 'TIKTOK':
                        imgPath = '/assets/instagram-icon.svg';
                        break;
                      case 'ZALO':
                        imgPath = '/assets/instagram-icon.svg';
                        break;
                      case 'SHOPEE':
                        imgPath = '/assets/instagram-icon.svg';
                        break;
                      case 'LAZADA':
                        imgPath = '/assets/instagram-icon.svg';
                        break;
                      default:
                        imgPath = '/assets/instagram-icon.svg';
                        break;
                    }
                    return <ChannelRow imgSrc={imgPath} value={x.url}></ChannelRow>;
                  })}
                </div>
              </div>
              <div className='mt-2 py-2'>
                <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                  Địa chỉ
                </h5>
                <p className='mt-2' style={{ fontSize: '14px' }}>
                  {buildAddressString(shopInfo.shippingLocation)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <SobyModal open={open} setOpen={setOpen}>
          {formError ? <ErrorPopup content={formError} setOpen={setOpen} /> : null}
        </SobyModal>
      </div>
    </>
  );
};

export default ShopProfileV2Page;
