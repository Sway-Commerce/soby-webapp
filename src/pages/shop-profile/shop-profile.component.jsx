import React from 'react';

import {
  CardShadow,
  ShopContainer,
  Card,
  MainContent,
} from './shop-profile.styles';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { ReactComponent as Phone } from '../../assets/phone-icon.svg';

import { GET_SHOP_BY_ID } from '../../graphQL/repository/shop.repository';

import Spinner from '../../components/spinner/spinner.component';
import ShopCategory from '../../components/shop-category/shop-category.component';
import WebsiteUrl from '../../components/website-url/website-url.component';
import KypStatus from '../../components/kyb-status/kyb-status.component';
import ProductListCard from '../../components/product-listcard/product-listcard.component';

const ShopProfile = () => {
  const { shopId } = useParams();
  const { loading, error, data } = useQuery(GET_SHOP_BY_ID, {
    variables: { id: shopId },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  const {
    name,
    phoneCountryCode,
    phoneNumber,
    description,
    logoUrl,
    categories,
    shopUrls,
    kyb,
  } = data.getShopById?.data;

  console.log({ data });
  return (
    <ShopContainer>
      <div className="left-panel">
        <CardShadow className="shop-name">
          <img src={logoUrl} alt="logo" />
          <div className="info">
            <h2 className="title">{name}</h2>
          </div>
        </CardShadow>
        <Card className="personal-kyb">
          <div className="title">
            <h4>Personal KYB</h4>
            <KypStatus status={kyb?.status} />
          </div>
        </Card>
      </div>

      <MainContent>
        <h3>Shop Decripsiton</h3>
        <p>{description}</p>
        <h3>Shop Categories</h3>
        <div className="category-list">
          {categories.map((category) => (
            <ShopCategory category={category} />
          ))}
        </div>

        <div className="shop-info">
          <div className="wrapper">
            <Phone />
            <p>{formatPhoneNumberIntl(`${phoneCountryCode}${phoneNumber}`)}</p>
          </div>
        </div>

        <div className="website-group">
          {shopUrls.map((x) => (
            <WebsiteUrl url={x} />
          ))}
        </div>

        <h3>Product</h3>
        <div className="product-group">
          <ProductListCard />
        </div>
      </MainContent>
    </ShopContainer>
  );
};

export default ShopProfile;
// <div className="shop-info">
//   <Location />
//   <p>
//     CirCo Coworking Space, H3 Building, 384 Hoàng Diệu, Phường 6, Quận
//     4, Thành phố Hồ Chí Minh
//   </p>
// </div>
