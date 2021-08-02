import React, { useEffect, useState, lazy } from 'react';
import styled from 'styled-components';
import { Link, Redirect, Route, Switch, useParams, BrowserRouter as Router, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { GET_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import { SEARCH_PRODUCT } from 'graphQL/repository/product.repository';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from 'shared/utils/assetsHelper';
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
import { Helmet } from 'react-helmet';

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
  const { imgSrc, productId, location } = props;
  return (
    <Link key={productId} to={{ pathname: `/product/${productId}`, state: { background: location } }}>
      <div
        className=''
        // style={{ width: '190px', height: '190px', borderColor: 'black', marginLeft: !isFirst && '1.25rem' }}
      >
        <img src={imgSrc} style={{ width: '190px', height: '190px' }} />
      </div>
    </Link>
  );
};

const ShopProfileV2Page = () => {
  const location = useLocation();
  const history = useHistory();

  console.info('locationShop', location);
  const background = location?.state?.background;
  const { shopId } = useParams();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [shopProducts, setShopProducts] = useState([]);
  const [numOfProductsInRow, setNumOfProductsInRow] = useState(4);
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

      let shopProductData = [...productData?.searchProduct?.data?.records];
      let tempArr = [];
      while (shopProductData.length > 0) {
        tempArr.push(shopProductData.splice(0, numOfProductsInRow));
      }
      setShopProducts(tempArr);
    }
  }, [productData?.searchProduct?.data]);

  console.info('productData', shopInfo?.records);

  return getAggregatedShopLoading || productLoading ? (
    <Spinner />
  ) : (
    <>
      <Helmet>
        <meta property='og:url' content={`${'http://dev.soby.vn/shop-profile/'.concat(shopId)}`} />
        <meta
          property='og:title'
          content={`${shopInfo.name} - Điểm: ${shopInfo?.shopRank?.totalPoints ? shopInfo?.shopRank?.totalPoints / 10 : 0} - ${
            shopInfo.shopRank.rank.description
          } `}
        />
        <meta property='og:image' content={shopInfo.logoUrl} />
        <meta property='og:image:width' content='475' />
        <meta property='og:image:height' content='308' />
        <meta property='og:image:type' content='image/jpg' />
        <meta
          property='og:description'
          content={`${shopInfo.name} - Điểm: ${shopInfo?.shopRank?.totalPoints ? shopInfo?.shopRank?.totalPoints / 10 : 0} - ${
            shopInfo.shopRank.rank.description
          } `}
        />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:description'
          content={`${shopInfo.name} - Điểm: ${shopInfo?.shopRank?.totalPoints ? shopInfo?.shopRank?.totalPoints / 10 : 0} - ${
            shopInfo?.shopRank?.rank?.description
          } `}
        />
        <meta property='twitter:image' content={shopInfo.logoUrl} />
      </Helmet>
      <div
        className='container-fluid mb-0 p-0 d-flex flex-column align-items-center'
        style={{ filter: background && 'blur(5px)', minHeight: '100vh' }}
      >
        <Route exact path='/product/:productId' children={<ProductDetailV2Page />} />
        <div className='bg-white'>
          <div className='d-flex flex-column align-items-center' style={{ width: '100vw' }}>
            <div className='' style={{ width: '1200px' }}>
              <div>
                <SharedBreadcrumb breadcrumbs={breadcrumbs} />
              </div>
            </div>
          </div>

          <div className='d-flex flex-column mt-2 justify-content-center align-items-center m-0 py-2 mb-2' style={{ width: '100vw' }}>
            <div className='d-flex justify-content-center' style={{ width: '1200px' }}>
              <div className='col-2 p-0'>
                <div className='d-flex'>
                  <div className='bg-white border'>
                    <img className='avatar' style={{ width: '160px', height: '160px' }} src={shopInfo.logoUrl} alt='' />
                  </div>
                </div>
              </div>
              <div className='col-7'>
                <div className='p-0 pt-2'>
                  <h4 className='fw-bold' style={{ fontSize: '32px' }}>
                    {shopInfo?.name}
                  </h4>
                </div>
                <div className='p-0 pb-2'>
                  <div className='d-flex align-items-center'>
                    {shopInfo.shopUrls.map((x, index) => {
                      let imgPath = '';
                      switch (x.type) {
                        case 'FACEBOOK':
                          imgPath = '/assets/shopChannels/facebook.svg';
                          break;
                        case 'INSTAGRAM':
                          imgPath = '/assets/shopChannels/instagram.svg';
                          break;
                        case 'TIKTOK':
                          imgPath = '/assets/shopChannels/tiktok.svg';
                          break;
                        case 'ZALO':
                          imgPath = '/assets/shopChannels/zalo.svg';
                          break;
                        case 'SHOPEE':
                          imgPath = '/assets/shopChannels/shopee.svg';
                          break;
                        case 'WEBSITE':
                          imgPath = '/assets/shopChannels/website.svg';
                          break;
                        default:
                          imgPath = '/assets/shopChannels/.svg';
                          break;
                      }
                      return <ChannelIconLink key={index} url={x.url} imgSrc={imgPath} />;
                    })}
                  </div>
                </div>
                <div className='d-flex p-0 justify-content-start align-items-center'>
                  <div className='d-flex'>
                    <button
                      type='button'
                      className='btn btn-primary rounded-pill d-flex px-3 justify-content-center align-items-center me-1'
                      style={{ fontSize: '14px', height: '40px', width: '200px' }}
                      onClick={function () {}}
                    >
                      <span className='' style={{ marginTop: '-2px' }}>
                        Liên hệ
                      </span>
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
                      <SVG
                        className='me-2'
                        src={toAbsoluteUrl('/assets/commons/share.svg')}
                        width={20}
                        height={20}
                        style={{ fill: '#0D1B1E' }}
                      ></SVG>
                      <span className='' style={{ marginTop: '-2px' }}>
                        Chia sẻ
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-3 d-flex flex-column justify-content-center align-items-center'>
                <div className='d-flex justify-content-center'>
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
                        {shopInfo?.shopRank?.totalPoints ? shopInfo?.shopRank?.totalPoints / 10 : 0}
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
          </div>
        </div>
        <div className='d-flex mt-2 py-4 justify-content-center' style={{ backgroundColor: '#F3F4F4', width: '100vw' }}>
          <div className='d-flex justify-content-between' style={{ width: '1200px' }}>
            <div className='' style={{ width: '73%' }}>
              {/* <div aria-label='promotion' className='d-flex bg-white'>
                <div className='bg-white p-3'>
                  <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                    Khuyến mãi
                  </h5>
                  <Promotion></Promotion>
                </div>
              </div> */}
              <div className='d-flex bg-white mt-0'>
                <div className='d-flex flex-column py-2' style={{ width: '100%' }}>
                  <h5 className='fw-bold p-2 ms-2' style={{ fontSize: '20px' }}>
                    Sản phẩm
                  </h5>
                  {shopProducts?.length > 0 ? (
                    <>
                      <div className='d-flex flex-column justify-content-start align-items-center'>
                        <div>
                          <table className='table w-100 table-borderless' style={{}}>
                            <thead>
                              <th></th>
                              <th></th>
                              <th></th>
                              <th></th>
                            </thead>
                            <tbody>
                              {shopProducts.map(function (productRow, index) {
                                return (
                                  <tr key={index}>
                                    {productRow.map(function (product, index) {
                                      return (
                                        <td key={index} style={{ width: `${100 / numOfProductsInRow}%` }}>
                                          <Product
                                            isFirst={index === 0}
                                            imgSrc={product.imageUrls[0]}
                                            productId={product.id}
                                            location={location}
                                          />
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
                    </>
                  ) : (
                    <div className='my-3 text-center'>
                      <span className='fst-italic'>Hiện tại cửa hàng này chưa có sản phẩm</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='d-flex flex-column p-0 bg-white' style={{ width: '25%' }}>
              <div className='d-flex flex-column '>
                <div className='mx-3 mt-2 py-2'>
                  <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                    Giới thiệu
                  </h5>
                  <p className='mt-2' style={{ fontSize: '' }}>
                    {shopInfo.description}
                  </p>
                </div>
                <div className='mx-3 mt-2 py-2'>
                  <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                    Thông tin liên hệ
                  </h5>
                  <div className='mt-2 px-2'>
                    <table className='table' style={{ width: '100%', tableLayout: 'fixed' }}>
                      <thead>
                        <th style={{ width: '40px' }}></th>
                        <th></th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <SVG
                              src={toAbsoluteUrl('/assets/commons/phone-outline.svg')}
                              style={{ width: '19px', height: '19px', marginTop: '-1px', fill: '#0D1B1E' }}
                            ></SVG>
                          </td>
                          <td>
                            <span className='fw-bold' style={{ wordWrap: 'break-word' }}>
                              {formatPhoneNumberIntl(`${shopInfo.phoneCountryCode}${shopInfo.phoneNumber}`)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <SVG
                              src={toAbsoluteUrl('/assets/commons/email-outline.svg')}
                              style={{ width: '19px', height: '19px', marginTop: '-1px', fill: '#0D1B1E' }}
                            ></SVG>
                          </td>
                          <td>
                            <span className='' style={{ wordWrap: 'break-word' }}>
                              {shopInfo.email}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='mx-3 mt-2 py-2'>
                  <h5 className='fw-bold m-0' style={{ fontSize: '20px' }}>
                    Kênh
                  </h5>
                  <div className='mt-2 px-2'>
                    <table className='table' style={{ width: '100%', tableLayout: 'fixed' }}>
                      <thead>
                        <th style={{ width: '40px' }}></th>
                        <th></th>
                      </thead>
                      <tbody>
                        {shopInfo.shopUrls.map((x, index) => {
                          console.info('shopdata', x);
                          let imgPath = '';
                          switch (x.type) {
                            case 'FACEBOOK':
                              imgPath = '/assets/shopChannels/facebook.svg';
                              break;
                            case 'INSTAGRAM':
                              imgPath = '/assets/shopChannels/instagram.svg';
                              break;
                            case 'TIKTOK':
                              imgPath = '/assets/shopChannels/tiktok.svg';
                              break;
                            case 'ZALO':
                              imgPath = '/assets/shopChannels/zalo.svg';
                              break;
                            case 'SHOPEE':
                              imgPath = '/assets/shopChannels/shopee.svg';
                              break;
                            case 'WEBSITE':
                              imgPath = '/assets/shopChannels/website.svg';
                              break;
                            default:
                              imgPath = '/assets/shopChannels/.svg';
                              break;
                          }
                          return (
                            <tr key={index}>
                              <td>
                                <SVG src={toAbsoluteUrl(imgPath)} style={{ width: '24px', height: '24px', marginTop: '-2px' }}></SVG>
                              </td>
                              <td>
                                <span className='' style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                                  {x.url}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='mx-3 mt-2 py-2'>
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
        </div>
      </div>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? <ErrorPopup content={formError} setOpen={setOpen} /> : null}
      </SobyModal>
    </>
  );
};

export default ShopProfileV2Page;
