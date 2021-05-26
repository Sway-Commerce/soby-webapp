/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { GET_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import { SEARCH_PRODUCT } from 'graphQL/repository/product.repository';

import Spinner from 'components/ui/spinner/spinner.component';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import locationImg from 'shared/assets/location.svg';
import mailImg from 'shared/assets/mail-black.svg';
import wallpaperImg from 'shared/assets/wallpaper.svg';
import shareImg from 'shared/assets/share.svg';
import heedImg from 'shared/assets/heed.svg';
import { ReactComponent as MarkIcon } from 'shared/assets/greenmark.svg';

import buildAddressString from 'shared/utils/buildAddressString';
import { bodyColor, borderColor, redColor } from 'shared/css-variable/variable';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import ShopVerifies from 'components/shop-verifies/shop-verifies.component';
import NewProductList from 'components/product-listcard/new-product-list.component';
import PhoneButton from './phone-button.component';
import { getColor } from 'shared/constants/shop.constant';

const Container = styled.div`
  margin: auto;
  color: ${bodyColor};
  padding-bottom: 92px;
  .container-1 {
    background-color: white;
    height: 5.2rem;
    padding: 1.2rem;
  }

  .btn-rank {
    display: flex;
  }

  .heed-icon {
    margin-left: 0.2665rem;
    width: 0.6665rem;
    height: 0.6665rem;
    cursor: pointer;
  }

  .btn-point {
    display: flex;
  }

  .mean {
    margin-left: 0.4rem;
    color: ${bodyColor};
    font-size: 1rem;
  }

  .rank-info {
    display: flex;
    justify-content: space-between;
  }

  .btn-number {
    color: #bdbdbd;
    font-size: 0.6rem;
  }

  @media screen and (max-width: 1024px) {
    .rank-info {
      justify-content: flex-start;
      .mean {
        font-weight: normal;
        font-size: 14px;
        color: ${bodyColor};
        &::before {
          content: '- ';
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    padding-bottom: 40px;
  }
`;

const Row = styled.div`
  background-color: white;
  padding: 1.2rem;
  .row-header {
    display: flex;
    justify-content: space-between;
    h3 {
      color: #000000;
    }
  }
`;

const HeadPromotion = styled.div`
  height: 10rem;
  background-image: url(${wallpaperImg});
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
  img.share-icon {
    width: 2.2rem;
    height: 2.2rem;
    margin: 0.8rem 0.8rem 0 0;
    cursor: pointer;
  }
  img.avatar {
    width: 6rem;
    height: 6rem;
    position: absolute;
    bottom: -3rem;
    left: 1.35rem;
    object-fit: cover;
  }

  @media screen and (max-width: 600px) {
    img.avatar {
      width: 56px;
      height: 56px;
      bottom: -33px;
    }
  }
`;

const HeadRow = styled.div`
  background-color: white;
  margin-bottom: 1.2rem;
`;

const NewHeadPromotion = styled.div`
  background-color: white;
  height: 4.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1.2rem;
  h3 {
    padding: 1.85rem 0 0 7.35rem;
  }
  display: flex;

  @media screen and (max-width: 600px) {
    h3 {
      padding: 10px 0 0 76.8px;
    }
    height: 49px;
  }
`;

const InfoContainer = styled.div`
  background: #ffffff;
  padding: 1.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.2rem;
  margin-bottom: 1.2rem;
  justify-content: center;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`;

const StatusContainer = styled.div`
  background-color: ${borderColor};
  border-radius: 100px;
  .status-bar {
    display: flex;
    width: ${(props) => (props?.percent ? `${props?.percent}%` : '0%')};
    height: 0.5rem;
    justify-content: flex-end;
    border-radius: 100px;
    background-color: ${(props) => props?.color || redColor};
    svg {
      width: 25px;
      height: 25px;
      margin: -6px -3px 0 0;
      g rect {
        fill: ${(props) => props?.color || redColor};
      }
    }

    h2 {
      position: relative;
      top: -24px;
      right: -26px;
    }
  }
`;

const Categories = styled.div`
  margin-top: 0.8rem;
`;

const Option = styled.div`
  background: #f2f2f2;
  border-radius: 0.15rem;
  padding: 0.525rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${bodyColor};
  font-size: 0.8rem;
  @media screen and (max-width: 600px) {
    flex: 1;
    min-width: max-content;
  }
`;

const TagOption = styled.div`
  margin-top: 0.4rem;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
`;

const ContactGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1.2rem;
  grid-gap: 1.4rem;

  .contact-item {
    display: flex;

    img {
      width: 24px;
      height: 24px;
      margin-right: 0.6rem;
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-gap: 0.4rem;
  }
`;

const MobileSection = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  background-color: white;
  @media screen and (max-width: 1024px) {
    margin: 1rem 0;
    padding: 0.8rem 1.2rem;
    display: ${(props) => (props.hide ? 'block' : 'none')};
    color: ${bodyColor};
  }
`;

const RankPoint = styled.h2`
  display: ${(props) => (props.show ? 'block' : 'none')};
  @media screen and (max-width: 1024px) {
    display: ${(props) => (props.hide ? 'block' : 'none')};
  }
`;

const TooltipData = styled.div`
  background-color: white;
`;

const ShopProfile = () => {
  //   enum ConfirmationStatus {
  //     NOT_CONFIRMED
  //     CONFIRMED
  //     COMPLETED
  // }
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
  const [phoneString, setPhoneString] = useState('');
  const [togglePhone, setTogglePhone] = useState(false);

  const [breadcrumbs, setBreadcrumb] = useState([
    {
      name: 'Home',
      src: '/',
    },
  ]);

  const [
    getAggregatedShop,
    {
      loading: getAggregatedShopLoading,
      error: getAggregatedShopError,
      data: getAggregatedShopData,
    },
  ] = useLazyQuery(GET_AGGREGATED_SHOP);
  const [
    searchProduct,
    { loading: productLoading, error: productError, data: productData },
  ] = useLazyQuery(SEARCH_PRODUCT);

  useEffect(() => {
    if (shopId) {
      getAggregatedShop({
        variables: { id: shopId },
      });
    }
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

      setPhoneString(`${phoneCountryCode} ${phoneNumber.slice(0, 4)} *** ****`);

      setBreadcrumb([
        {
          name: 'Home',
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
            pageSize: 5,
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

  return getAggregatedShopLoading || productLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />
      <Container>
        <HeadRow>
          <HeadPromotion
            style={{ backgroundImage: shopInfo.coverUrl || wallpaperImg }}
          >
            <img
              className="share-icon"
              src={shareImg}
              alt=""
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                window.alert('Shop url is copied');
              }}
            />
            <img className="avatar" src={shopInfo.logoUrl} alt="" />
          </HeadPromotion>
          <NewHeadPromotion>
            <h3>{shopInfo.name}</h3>
            <PhoneButton
              togglePhone={togglePhone}
              phoneNumber={formatPhoneNumberIntl(
                `${shopInfo.phoneCountryCode}${shopInfo.phoneNumber}`
              )}
              phoneNumberCovered={phoneString}
              setTogglePhone={setTogglePhone}
              showText="Click to show"
              hideText="Click to hide"
              wide
              show
            />
          </NewHeadPromotion>
        </HeadRow>
        <InfoContainer>
          <div>
            <div className="rank-info">
              <div className="btn-rank">
                <h5>Soby Rank</h5>
                <img
                  className="heed-icon"
                  src={heedImg}
                  alt=""
                  data-tip
                  data-for="rank-info"
                  data-event="click focus"
                />
                <ReactTooltip
                  id="rank-info"
                  aria-haspopup="true"
                  role="example"
                  place="right"
                  type="light"
                  effect="solid"
                  globalEventOff="dbclick"
                >
                  <TooltipData>
                    <h5>Soby Rank – Chỉ số uy tín</h5>
                    <p className="mg-b-8">
                      Giá trị của Soby Rank đối với một cửa hàng sẽ tương đương
                      với tầm quan trọng của điểm IMDB đối với một bộ phim, hay
                      của số sao Michelin đối với một nhà hàng.
                    </p>
                    <h5 className="primary-color clickable">Read more</h5>
                  </TooltipData>
                </ReactTooltip>
              </div>
              <div className="btn-point">
                <RankPoint
                  style={{
                    color: getColor(shopInfo.shopRank.rank.name),
                  }}
                  show
                >
                  {shopInfo.shopRank.totalPoints
                    ? +shopInfo.shopRank.totalPoints / 10
                    : ''}
                </RankPoint>

                <h5 className="mean">{shopInfo.shopRank.rank.description}</h5>
              </div>
            </div>
            <p className="btn-number">01</p>
            <StatusContainer
              percent={+shopInfo.shopRank.totalPoints}
              color={getColor(shopInfo.shopRank.rank.name)}
            >
              <div className="status-bar">
                <RankPoint
                  style={{
                    color: getColor(shopInfo.shopRank.rank.name),
                  }}
                  hide
                >
                  {shopInfo.shopRank.totalPoints
                    ? +shopInfo.shopRank.totalPoints / 10
                    : ''}
                </RankPoint>
                <MarkIcon />
              </div>
            </StatusContainer>

            <ShopVerifies
              status={shopInfo.kyb?.status}
              kycStatus={shopInfo.kycStatus}
              shopUrls={shopInfo.shopUrls}
              className="mg-t-30"
            />

            <MobileSection show>
              <Categories>
                <h5>Shop categories</h5>
                <TagOption>
                  {shopInfo.categories.length ? (
                    shopInfo.categories.map((x) => {
                      const { id, name } = x;
                      return (
                        <Option key={id}>
                          <p className="option-info">{name}</p>
                        </Option>
                      );
                    })
                  ) : (
                    <p className="body-color">Không có phân loại</p>
                  )}
                </TagOption>
              </Categories>
            </MobileSection>
          </div>
          <PhoneButton
            togglePhone={togglePhone}
            phoneNumber={formatPhoneNumberIntl(
              `${shopInfo.phoneCountryCode}${shopInfo.phoneNumber}`
            )}
            phoneNumberCovered={phoneString}
            setTogglePhone={setTogglePhone}
            showText="Show"
            hideText="Hide"
            hide
          />
          <div>
            <MobileSection show>
              <h5>Shop description</h5>
              <p>{shopInfo.description}</p>
            </MobileSection>

            <ContactGroup>
              <div className="contact-item">
                <img src={locationImg} alt="" />
                <p className="body-color">
                  {buildAddressString(shopInfo.shippingLocation)}
                </p>
              </div>
              <div className="contact-item">
                <img src={mailImg} alt="" />
                <p className="body-color">address@email.com</p>
              </div>
            </ContactGroup>
          </div>
        </InfoContainer>

        <MobileSection hide>
          <h3>Shop description</h3>
          <p>{shopInfo.description}</p>
        </MobileSection>

        <MobileSection hide>
          <h3>Shop categories</h3>
          <TagOption>
            {shopInfo.categories.length ? (
              shopInfo.categories.map((x) => {
                const { id, name } = x;
                return (
                  <Option key={id} className="truncate">
                    {name}
                  </Option>
                );
              })
            ) : (
              <p className="body-color">Không có phân loại</p>
            )}
          </TagOption>
        </MobileSection>

        <Row>
          <div className="row-header">
            <h3>New Product</h3>
            <h5 className="primary-color">See all</h5>
          </div>
          <NewProductList records={shopInfo.records} />
        </Row>
      </Container>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default ShopProfile;
