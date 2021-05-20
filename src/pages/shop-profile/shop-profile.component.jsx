import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { ReactComponent as Phone } from 'shared/assets/phone-icon.svg';
import { ReactComponent as Location } from 'shared/assets/location.svg';

import {
  GET_ALL_SHOP_CATEGORIES,
  GET_SHOP_BY_ID,
} from 'graphQL/repository/shop.repository';
import { SEARCH_PRODUCT } from 'graphQL/repository/product.repository';

import Spinner from 'components/ui/spinner/spinner.component';
import ShopCategory from 'components/shop-category/shop-category.component';
import WebsiteUrl from 'components/website-url/website-url.component';
import ProductListCard from 'components/product-listcard/product-listcard.component';
import ShopNameCard from 'components/shop-name-card/shop-name-card.component';
import KybCard from 'components/kyb-card/kyb-card.component';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import airpod from 'shared/assets/airpod.svg';
import facebookImg from 'shared/assets/facebook.svg';
import instagramImg from 'shared/assets/instagram.svg';
import locationImg from 'shared/assets/location.svg';
import mailImg from 'shared/assets/mail-black.svg';
import tickImg from 'shared/assets/tick.svg';
import twowatchImg from 'shared/assets/twowatch.svg';
import wallpaperImg from 'shared/assets/wallpaper.svg';
import shareImg from 'shared/assets/share.svg';
import appleImg from 'shared/assets/apple.svg';
import phoneImg from 'shared/assets/phone-circle.svg';
import heedImg from 'shared/assets/heed.svg';
import greenlineImg from 'shared/assets/greenline.svg';
import greenmarkImg from 'shared/assets/greenmark.svg';
import id1Img from 'shared/assets/id-1.svg';
import id2Img from 'shared/assets/id-2.svg';
import shopeeImg from 'shared/assets/shopee.svg';
import networkImg from 'shared/assets/network.svg';

const Container = styled.div`
  margin: auto;
  .container-1 {
    background-color: white;
    height: 5.2rem;
    padding: 1.2rem;
    margin-bottom: 1.2rem;
  }

  .btn-address {
    margin-top: 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.4rem;
  }

  .address-1 {
    display: flex;
  }

  .address-2 {
    display: flex;
    margin-left: 1.2rem;
  }

  .address-icon {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.6rem;
  }

  .btn-rank {
    display: flex;
  }

  .heed-icon {
    margin-left: 0.2665rem;
    width: 0.6665rem;
    height: 0.6665rem;
  }

  .btn-point {
    display: flex;
  }

  .point {
    color: #73cf11;
    font-size: 1.2rem;
  }

  .mean {
    margin-left: 0.4rem;
    color: #4f4f4f;
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
`;

const Description = styled.p`
  color: #4f4f4f;
`;

const PromotionBox = styled.div`
  display: flex;
  img {
    width: 5.4rem;
    height: 5.4rem;
    margin-right: 1.15rem;
  }
`;

const Date = styled.p`
  font-size: 0.7rem;
  color: #f53535;
`;

const Row = styled.div`
  background-color: white;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  .row-header {
    display: flex;
    justify-content: space-between;
    p {
      color: #2b74e4;
    }
  }
`;

const NewProductBox = styled.div`
  img {
    width: 8.6rem;
    height: 8.6rem;
    margin-bottom: 13.6.4rem;
  }
`;

const PromotionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.4rem, 18.4rem));
  grid-gap: 1.2rem;
  margin-top: 0.8rem;
  justify-content: center;
  @media screen and (max-width: 785px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8.6rem, 8.6rem));
  grid-gap: 1.2rem;
  margin-top: 0.8rem;
  justify-content: center;
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
  }
  img.avatar {
    width: 6rem;
    height: 6rem;
    position: absolute;
    bottom: -3rem;
    left: 1.35rem;
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
  h3 {
    padding: 1.85rem 0 0 8.55rem;
  }
  display: flex;
  .phone-container {
    height: 2rem;
    background: #2b74e4;
    padding: 0.2rem 0.6rem;
    display: flex;
    align-items: center;
    color: white;
    border-radius: 3px;
    img.phone-icon {
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.5rem;
    }
    .btn-click {
      font-size: 0.7rem;
      margin-left: 1.2rem;
      text-transform: uppercase;
    }
    margin: 1rem 1.25rem 0 0;
    @media screen and (max-width: 500px) {
      .btn-click {
        display: none;
      }
    }
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
  }
`;

const InfoBox = styled.div`
  .status-bar {
    display: flex;
    border-radius: 100px;
    width: 100%;
    height: 0.5rem;
    justify-content: flex-end;
    background-color: #73cf11;
    img {
      width: 1.25rem;
      height: 1.25rem;
      margin: -0.3rem -0.15rem 0 0;
    }
  }
`;

const NewInfoBox = styled.div`
  .info-header {
    font-size: 0.8rem;
  }
`;

const ShopInfo = styled.div`
  font-size: 0.8rem;
  color: #4f4f4f;
`;

const TagIcon = styled.div`
  display: flex;
`;

const Icon = styled.div`
  width: 2rem;
  height: 2rem;
  margin-top: 1.5rem;
  margin-right: 0.4rem;
  background: #f2f2f2;
  border-radius: 0.15rem;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img.tick {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Categories = styled.div`
  margin-top: 0.8rem;
`;

const Option = styled.div`
  background: #f2f2f2;
  border-radius: 0.15rem;
  padding: 0.5rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
  .option-info {
    color: #4f4f4f;
    font-size: 0.8rem;
  }
`;

const TagOption = styled.div`
  margin-top: 0.4rem;
  display: flex;
`;

const ShopProfile = () => {
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
  });

  const [
    getShopById,
    {
      loading: getShopByIdLoading,
      error: getShopByIdError,
      data: getShopByIdData,
    },
  ] = useLazyQuery(GET_SHOP_BY_ID);
  const [
    getAllShopCategories,
    {
      loading: getAllShopCategoriesLoading,
      error: getAllShopCategoriesError,
      data: getAllShopCategoriesData,
    },
  ] = useLazyQuery(GET_ALL_SHOP_CATEGORIES);
  const [
    searchProduct,
    { loading: productLoading, error: productError, data: productData },
  ] = useLazyQuery(SEARCH_PRODUCT);

  useEffect(() => {
    if (shopId) {
      getShopById({
        variables: { id: shopId },
      });
      getAllShopCategories();
    }
  }, [shopId]);

  useEffect(() => {
    if (
      getShopByIdError?.message ||
      productError?.message ||
      getAllShopCategoriesError?.message
    ) {
      setFormError(
        getShopByIdError?.message ??
          productError?.message ??
          getAllShopCategoriesError?.message
      );
      setOpen(true);
    }
  }, [getShopByIdError, productError, getAllShopCategoriesError]);

  useEffect(() => {
    if (
      getShopByIdData?.getShopById?.data &&
      getAllShopCategoriesData?.getAllShopCategories?.data
    ) {
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
      } = getShopByIdData?.getShopById?.data;
      // const categories = getAllShopCategoriesData?.getAllShopCategories?.data
      //   ?.filter((x) => categoryIds?.includes(x.id))
      //   ?.map((x) => x.name);

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
      });

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
  }, [
    getShopByIdData?.getShopById?.data,
    getAllShopCategoriesData?.getAllShopCategories?.data,
  ]);

  useEffect(() => {
    if (productData?.searchProduct?.data?.records?.length) {
      setShopInfo({
        ...shopInfo,
        records: productData?.searchProduct?.data?.records,
      });
    }
  }, [productData?.searchProduct?.data]);

  return getShopByIdLoading || productLoading || getAllShopCategoriesLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Container>
        <div class="container">
          <HeadRow>
            <HeadPromotion>
              <img className="share-icon" src={shareImg} alt="" />
              <img className="avatar" src={appleImg} alt="" />
            </HeadPromotion>
            <NewHeadPromotion>
              <h3>Apple shop</h3>
              <div className="phone-container">
                <img className="phone-icon" src={phoneImg} alt="" />
                <p>0901 *** ****</p>
                <p className="btn-click">Click to show</p>
              </div>
            </NewHeadPromotion>
          </HeadRow>
          <InfoContainer>
            <InfoBox>
              <div className="rank-info">
                <div className="btn-rank">
                  <div className="info-header">
                    <p>
                      <b>Soby Rank</b>
                    </p>
                  </div>
                  <img className="heed-icon" src={heedImg} alt="" />
                </div>
                <div className="btn-point">
                  <p className="point">
                    <b>8.9</b>
                  </p>
                  <p className="mean">
                    <b>Extremely Good</b>
                  </p>
                </div>
              </div>
              <p className="btn-number">01</p>
              <div className="status-bar">
                <img className="greenmark-icon" src={greenmarkImg} alt="" />
              </div>
              <TagIcon>
                <Icon>
                  <img className="tick" src={tickImg} alt="" />
                  <img className="id1" src={id1Img} alt="" />
                </Icon>
                <Icon>
                  <img className="id2" src={id2Img} alt="" />
                </Icon>
                <Icon>
                  <img className="tick" src={tickImg} alt="" />
                  <img className="shopee" src={shopeeImg} alt="" />
                </Icon>
                <Icon>
                  <img className="id2" src={facebookImg} alt="" />
                </Icon>
                <Icon>
                  <img className="id2" src={networkImg} alt="" />
                </Icon>
                <Icon>
                  <img className="id2" src={instagramImg} alt="" />
                </Icon>
              </TagIcon>
              <Categories>
                <div className="info-header">
                  <p>
                    <b>Shop categories</b>
                  </p>
                </div>
                <TagOption>
                  <Option>
                    <p className="option-info">Toys</p>
                  </Option>
                  <Option>
                    <p className="option-info">Technology</p>
                  </Option>
                  <Option>
                    <p className="option-info">Home and Garden</p>
                  </Option>
                </TagOption>
              </Categories>
            </InfoBox>
            <NewInfoBox>
              <div className="info-header">
                <p>
                  <b>Shop description</b>
                </p>
              </div>
              <ShopInfo>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </ShopInfo>
              <div className="btn-address">
                <div className="address-1">
                  <img className="address-icon" src={locationImg} alt="" />
                  <ShopInfo>
                    H3 Building, 384 Hoàng Diệu, Phường 6, Quận 4, Hồ Chí Minh
                  </ShopInfo>
                </div>
                <div className="address-2">
                  <img className="address-icon" src={mailImg} alt="" />
                  <ShopInfo>address@email.com</ShopInfo>
                </div>
              </div>
            </NewInfoBox>
          </InfoContainer>
          <Row>
            <div className="row-header">
              <h3>Promotion</h3>
              <p>
                <b>See all</b>
              </p>
            </div>
            <PromotionContainer>
              <PromotionBox>
                <img src={airpod} alt="" />
                <div>
                  <Description>
                    Amazfit GTS 2e Smartwatch with 24H Heart Rate Monitor,
                    Sleep, Stress and SpO2...
                  </Description>
                  <p>
                    <b>8.220.000 đ</b>
                  </p>
                  <Date>
                    <b>Offer end in - 3 days</b>
                  </Date>
                </div>
              </PromotionBox>
              <PromotionBox>
                <img src={airpod} alt="" />
                <div>
                  <Description>
                    Amazfit GTS 2e Smartwatch with 24H Heart Rate Monitor,
                    Sleep, Stress and SpO2...
                  </Description>
                  <p>
                    <b>8.220.000 đ</b>
                  </p>
                  <Date>
                    <b>Offer end in - 3 days</b>
                  </Date>
                </div>
              </PromotionBox>
              <PromotionBox>
                <img src={airpod} alt="" />
                <div>
                  <Description>
                    Amazfit GTS 2e Smartwatch with 24H Heart Rate Monitor,
                    Sleep, Stress and SpO2...
                  </Description>
                  <p>
                    <b>8.220.000 đ</b>
                  </p>
                  <Date>
                    <b>Offer end in - 3 days</b>
                  </Date>
                </div>
              </PromotionBox>
            </PromotionContainer>
          </Row>
          <Row>
            <div className="row-header">
              <h3>New Product</h3>
              <p>
                <b>See all</b>
              </p>
            </div>
            <ProductContainer>
              <NewProductBox>
                <img src={twowatchImg} alt="" />
                <Description>Apple Watch Series 6 - new</Description>
                <p>
                  <b>8.220.000 đ</b>
                </p>
              </NewProductBox>
              <NewProductBox>
                <img src={twowatchImg} alt="" />
                <Description>Apple Watch Series 6 - new</Description>
                <p>
                  <b>8.220.000 đ</b>
                </p>
              </NewProductBox>
              <NewProductBox>
                <img src={twowatchImg} alt="" />
                <Description>Apple Watch Series 6 - new</Description>
                <p>
                  <b>8.220.000 đ</b>
                </p>
              </NewProductBox>
              <NewProductBox>
                <img src={twowatchImg} alt="" />
                <Description>Apple Watch Series 6 - new</Description>
                <p>
                  <b>8.220.000 đ</b>
                </p>
              </NewProductBox>
              <NewProductBox>
                <img src={twowatchImg} alt="" />
                <Description>Apple Watch Series 6 - new</Description>
                <p>
                  <b>8.220.000 đ</b>
                </p>
              </NewProductBox>
              <NewProductBox>
                <img src={twowatchImg} alt="" />
                <Description>Apple Watch Series 6 - new</Description>
                <p>
                  <b>8.220.000 đ</b>
                </p>
              </NewProductBox>
            </ProductContainer>
          </Row>
        </div>
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
