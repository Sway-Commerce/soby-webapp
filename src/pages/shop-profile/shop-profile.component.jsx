/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { ReactComponent as Phone } from 'shared/assets/phone-icon.svg';

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

const ShopContainer = styled.div`
  min-height: 150vh;
  font-family: 'Work Sans', sans-serif;
  margin-top: 80px;
  display: flex;
  * + * {
    margin-right: 24px;
  }
`;

const BoxLeft = styled.div``;
const KycWrapper = styled.div`
  margin-top: 32px;
`;

const TitleInfo = styled.h3`
  margin-bottom: 16px;
`;

const ShopDescription = styled.p`
  margin-bottom: 56px;
`;

const CategoryList = styled.div`
  display: flex;
  margin-bottom: 56px;
`;

//         <div className="shop-info">
//           <div className="wrapper">
//             <Phone />
//             <p>
//               {formatPhoneNumberIntl(
//                 `${shopInfo.phoneCountryCode}${shopInfo.phoneNumber}`
//               )}
//             </p>
//           </div>
//         </div>

export const MainContent = styled.div`
  .shop-info {
    display: flex;

    p {
      font-size: 18px;
    }

    .wrapper {
      display: flex;
      width: 364px;
    }

    svg {
      margin-right: 16px;
    }
  }
`;

const WebsiteWrapper = styled.div`
  margin: 56px 0;
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(2, 1fr);
`;

const ShopProfile = () => {
  const { shopId } = useParams();
  const { loading: shopLoading, error: shopError, data: shopData } = useQuery(
    GET_SHOP_BY_ID,
    {
      variables: { id: shopId },
    }
  );
  const {
    loading: getAllShopCategoriesLoading,
    error: getAllShopCategoriesError,
    data: getAllShopCategoriesData,
  } = useQuery(GET_ALL_SHOP_CATEGORIES);
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
        queries: `shopId:${shopId}`,
        sorts: null,
      },
    },
  });

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
  });

  useEffect(() => {
    if (
      shopError?.message ||
      productError?.message ||
      getAllShopCategoriesError?.message
    ) {
      setFormError(
        shopError?.message ??
          productError?.message ??
          getAllShopCategoriesError?.message
      );
      setOpen(true);
    }
  }, [shopError, productError, getAllShopCategoriesError]);

  useEffect(() => {
    if (
      shopData?.getShopById?.data &&
      getAllShopCategoriesData?.getAllShopCategories?.data
    ) {
      const {
        name,
        phoneCountryCode,
        phoneNumber,
        description,
        logoUrl,
        categoryIds,
        shopUrls,
        kyb,
      } = shopData?.getShopById?.data;
      const categories = getAllShopCategoriesData?.getAllShopCategories?.data
        ?.filter((x) => categoryIds?.includes(x.id))
        ?.map((x) => x.name);

      setShopInfo({
        name,
        phoneCountryCode,
        phoneNumber,
        description,
        logoUrl,
        categories,
        shopUrls,
        kyb,
      });
    }
  }, [
    shopData?.getShopById?.data,
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

  return shopLoading || productLoading || getAllShopCategoriesLoading ? (
    <Spinner />
  ) : (
    <ShopContainer>
      <BoxLeft>
        <ShopNameCard name={shopInfo.name} logoUrl={shopInfo.logoUrl} />
        <KycWrapper>
          <KybCard status={shopInfo.kyb?.status} />
        </KycWrapper>
      </BoxLeft>

      <MainContent>
        <TitleInfo>Shop Description</TitleInfo>
        <ShopDescription>{shopInfo.description}</ShopDescription>
        <TitleInfo>Shop Categories</TitleInfo>
        <CategoryList>
          {shopInfo.categories.map((category) => (
            <ShopCategory category={category} key={category} />
          ))}
        </CategoryList>

        <div className="shop-info">
          <div className="wrapper">
            <Phone />
            <p>
              {formatPhoneNumberIntl(
                `${shopInfo.phoneCountryCode}${shopInfo.phoneNumber}`
              )}
            </p>
          </div>
        </div>

        <WebsiteWrapper>
          {shopInfo.shopUrls.map((x) => (
            <WebsiteUrl url={x} key={x} />
          ))}
        </WebsiteWrapper>

        <TitleInfo>Product</TitleInfo>
        <ProductListCard records={shopInfo.records} />
      </MainContent>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </ShopContainer>
  );
};

export default ShopProfile;
