import React from 'react';

import { ShopContainer, Card, MainContent } from './shop-profile.styles';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { ReactComponent as Phone } from '../../assets/phone-icon.svg';

import { GET_SHOP_BY_ID } from '../../graphQL/repository/shop.repository';
import { SEARCH_PRODUCT } from '../../graphQL/repository/product.repository';

import Spinner from '../../components/spinner/spinner.component';
import ShopCategory from '../../components/shop-category/shop-category.component';
import WebsiteUrl from '../../components/website-url/website-url.component';
import KypStatus from '../../components/kyb-status/kyb-status.component';
import ProductListCard from '../../components/product-listcard/product-listcard.component';
import ShopNameCard from '../../components/shop-name-card/shop-name-card.component';

const ShopProfile = () => {
  const { shopId } = useParams();
  const { loading: shopLoading, error: shopError, data: shopData } = useQuery(
    GET_SHOP_BY_ID,
    {
      variables: { id: shopId },
    }
  );
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(SEARCH_PRODUCT, {
    variables: {
      searchInput: {
        page: 0,
        pageSize: 5,
        filters: null,
        queries: `shopId:${shopId}` ,
        sorts: null,
      },
    },
  });

  if (shopLoading && productLoading) return <Spinner />;
  if (shopError || productError) return `Error! ${shopError || productError}`;
  debugger;

  const {
    name,
    phoneCountryCode,
    phoneNumber,
    description,
    logoUrl,
    categories,
    shopUrls,
    kyb,
  } = shopData?.getShopById?.data;

  const { records } = productData?.searchProduct?.data || { records: [] };

  console.log({ records });
  console.log({ shopData });
  return (
    <ShopContainer>
      <div className="left-panel">
        <ShopNameCard name={name} logoUrl={logoUrl} />
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
            <ShopCategory category={category} key={category} />
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
            <WebsiteUrl url={x} key={x} />
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
