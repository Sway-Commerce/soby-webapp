/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { ShopContainer, Card, MainContent } from './shop-profile.styles';
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
      debugger;
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
      <div className="left-panel">
        <ShopNameCard name={shopInfo.name} logoUrl={shopInfo.logoUrl} />
        <div className="kyb">
          <KybCard status={shopInfo.kyb?.status} />
        </div>
      </div>

      <MainContent>
        <h3>Shop Decripsiton</h3>
        <p>{shopInfo.description}</p>
        <h3>Shop Categories</h3>
        <div className="category-list">
          {shopInfo.categories.map((category) => (
            <ShopCategory category={category} key={category} />
          ))}
        </div>

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

        <div className="website-group">
          {shopInfo.shopUrls.map((x) => (
            <WebsiteUrl url={x} key={x} />
          ))}
        </div>

        <h3>Product</h3>
        <div className="product-group">
          <ProductListCard records={shopInfo.records} />
        </div>
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
