/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import styled from 'styled-components';

import {
  GET_PRODUCT,
  SEARCH_PRODUCT,
} from 'graphQL/repository/product.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import ProductCard from 'components/product-card/product-card.component';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import SkuChip from 'components/sku-chip/sku-chip.component';
import ShopCategory from 'components/shop-category/shop-category.component';
import { GET_SHOP_BY_ID } from 'graphQL/repository/shop.repository';
import ProductListCard from 'components/product-listcard/product-listcard.component';
import ShopNameCard from 'components/shop-name-card/shop-name-card.component';
import KybCard from 'components/kyb-card/kyb-card.component';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

const Container = styled.div`
  margin: 20px auto;
  display: grid;
  grid-template-columns: 364px 1fr;
  grid-column-gap: 23px;
`;

const ShopCard = styled.div`
  margin: 80px 0 32px;
`;

const ProductName = styled.h2`
  margin-bottom: 16px;
  line-height: 38px;
`;

const ProductPrice = styled.h1`
  margin-bottom: 16px;
  line-height: 56px;
`;

const ProductDescription = styled.p`
  margin-bottom: 16px;
  line-height: 24px;
`;

const SkusWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const SkuName = styled.h3`
  margin-bottom: 24px;
`;

const SkuItem = styled.div``;

const CategoryTitle = styled.h3`
  margin-top: 32px;
`;

const Option = styled.h3`
  display: flex;

  * + * {
    margin-left: 16px;
  }
`;

const ListCardWrapper = styled.div`
  margin-top: 152px;
`;

const ProductDetail = () => {
  const { productId } = useParams();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [productData, setProductData] = useState({
    skus: [],
    id: null,
    imageUrls: [],
    description: '',
    name: '',
    category: { id: '', name: '' },
    shopId: '',
    productsRelate: [],
    shopInfo: {
      name: '',
      logoUrl: '',
      id: '',
    },
    sizes: [],
    colors: [],
    weights: [],
    status: null,
    sku: { currentPrice: 0 },
  });

  const {
    loading: getProductLoading,
    error: getProductError,
    data: getProductData,
  } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  useEffect(() => {
    if (getProductData?.getProduct?.data) {
      const {
        skus,
        id,
        imageUrls,
        description,
        name,
        category,
        shopId,
      } = getProductData?.getProduct?.data;

      setProductData({
        ...productData,
        skus,
        id,
        imageUrls,
        description,
        name,
        category,
        shopId,
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

      getShopById({ variables: { id: shopId } });
    }
  }, [getProductData?.getProduct?.data]);

  const [
    searchProduct,
    {
      loading: searchProductLoading,
      error: searchProductError,
      data: searchProductData,
    },
  ] = useLazyQuery(SEARCH_PRODUCT);

  const [
    getShopById,
    {
      loading: getShopByIdLoading,
      error: getShopByIdError,
      data: getShopByIdData,
    },
  ] = useLazyQuery(GET_SHOP_BY_ID);

  useEffect(() => {
    if (
      getProductError?.message ||
      searchProductError?.message ||
      getShopByIdError?.message
    ) {
      setFormError(
        getProductError?.message ??
          searchProductError?.message ??
          getShopByIdError?.message
      );
    }
  }, [getProductError, searchProductError, getShopByIdError]);

  useEffect(() => {
    if (searchProductData?.searchProduct?.data?.records) {
      const { records } = searchProductData?.searchProduct?.data;
      setProductData({ ...productData, records });
    }
  }, [searchProductData?.searchProduct?.data]);

  useEffect(() => {
    if (getShopByIdData?.getShopById?.data) {
      const shopInfo = getShopByIdData?.getShopById?.data;
      const { status } = shopInfo.kyb ?? { status: null };

      setProductData({ ...productData, shopInfo, status });
    }
  }, [getShopByIdData?.getShopById?.data]);

  useEffect(() => {
    if (productData.skus.length) {
      let sizes = [];
      let colors = [];
      let weights = [];
      productData.skus.map((x) =>
        x.properties.map((y) => {
          switch (y.name) {
            case 'SIZE':
              sizes = [...sizes, y.value];
              return null;
            case 'WEIGHT':
              weights = [...weights, y.value];
              return null;
            case 'COLOR':
              colors = [...colors, y.value];
              return null;
            default:
              return null;
          }
        })
      );

      const sku = productData.skus[productData.skus.length - 1];

      setProductData({ ...productData, sizes, colors, weights, sku });
    }
  }, [productData.skus]);

  return searchProductLoading || getProductLoading || getShopByIdLoading ? (
    <Spinner />
  ) : (
    <Container>
      <div>
        <ProductCard
          id={productData.id}
          imageUrls={productData.imageUrls}
          currentPrice={productData.sku.currentPrice}
          description={productData.description}
          isMain
        />
        <ShopCard>
          <ShopNameCard
            name={productData.shopInfo.name}
            logoUrl={productData.shopInfo.logoUrl}
            productView
            id={productData.shopInfo.id}
          />
        </ShopCard>
        <KybCard status={productData.status} productView />
      </div>

      <div>
        <ProductName>{productData.name}</ProductName>
        <ProductPrice>
          {currencyFormatter(productData.sku.currentPrice)}
        </ProductPrice>
        <ProductDescription>{productData.description}</ProductDescription>
        <SkusWrapper>
          <SkuItem>
            <SkuName>Colours</SkuName>
            <Option>
              {productData.colors.map((x) => (
                <SkuChip name={x} key={x} />
              ))}
            </Option>
          </SkuItem>
          <SkuItem>
            <SkuName>Size</SkuName>
            <Option>
              {productData.sizes.map((x) => (
                <SkuChip name={x} key={x} />
              ))}
            </Option>
          </SkuItem>
        </SkusWrapper>

        <CategoryTitle>Category</CategoryTitle>
        <ShopCategory category={productData.category.name} noBorder />

        <ListCardWrapper>
          <ProductListCard records={productData.records} key={Math.random()} />
        </ListCardWrapper>
      </div>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </Container>
  );
};

export default ProductDetail;
