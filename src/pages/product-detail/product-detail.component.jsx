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
import { GET_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

import NewProductList from 'components/product-listcard/new-product-list.component';
import { getColor } from 'shared/constants/shop.constant';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import ShopCard from 'pages/shop-profile/shop-card.component';

const Container = styled.div`
  margin: auto;

  .status {
    color: #4f4f4f;
    font-size: 14px;
    margin-left: 8px;
  }

  .info-wrapper {
    flex-wrap: wrap;
    width: 400px;
    margin-left: 24px;
    margin-right: 24px;
  }

  .price {
    font-size: 32px;
    line-height: 36px;
    margin-top: 16px;
  }

  .contact-wrapper {
    margin-top: 4px;
    display: flex;
    border-radius: 3px;
    width: 98px;
    height: 22px;
    img.heed-icon {
      width: 11.67px;
      height: 11.67px;
      margin-left: 5.17px;
      cursor: pointer;
    }
  }
`;

const Description = styled.p`
  color: #4f4f4f;
`;

const Row = styled.div`
  background-color: white;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  .row-header {
    display: flex;
    justify-content: space-between;
  }
`;

const SkuType = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
`;

const Tag = styled.div`
  background: #e4e4e4;
  border-radius: 3px;
  padding: 6px 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 14px;
  margin-right: 8px;
`;

const TagBox = styled.div`
  display: flex;
  margin-top: 8px;
`;

const ProductBox = styled.div`
  display: flex;
  .item {
    margin-top: 20px;
    margin-left: 8px;
    line-height: 24px;
    color: #4f4f4f;
  }
`;

const Title = styled.div`
  margin: 16px 0px;
  line-height: 32px;
  font-size: 24px;
`;

const HeadRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  background: #ffffff;
  margin-bottom: 24px;
  padding: 32px 24px 24px;
`;

const InfoBox = styled.div`
  flex: 1;
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
    shopInfo: null,
    sizes: [],
    colors: [],
    status: null,
    sku: { currentPrice: 0 },
    records: [],
  });
  const [phoneString, setPhoneString] = useState('');
  const [togglePhone, setTogglePhone] = useState(false);
  const [breadcrumbs, setBreadcrumb] = useState([
    {
      name: 'Home',
      src: '/',
    },
  ]);

  const {
    loading: getProductLoading,
    error: getProductError,
    data: getProductData,
  } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  useEffect(() => {
    if (getProductData?.getProduct?.data) {
      const { skus, id, imageUrls, description, name, category, shopId } =
        getProductData?.getProduct?.data;

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

      getAggregatedShop({ variables: { id: shopId } });
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
    getAggregatedShop,
    {
      loading: getAggregatedShopLoading,
      error: getAggregatedShopError,
      data: getAggregatedShopData,
    },
  ] = useLazyQuery(GET_AGGREGATED_SHOP);

  useEffect(() => {
    if (
      getProductError?.message ||
      searchProductError?.message ||
      getAggregatedShopError?.message
    ) {
      setFormError(
        getProductError?.message ??
          searchProductError?.message ??
          getAggregatedShopError?.message
      );
    }
  }, [getProductError, searchProductError, getAggregatedShopError]);

  useEffect(() => {
    if (searchProductData?.searchProduct?.data?.records) {
      const { records } = searchProductData?.searchProduct?.data;
      setProductData({ ...productData, records });
    }
  }, [searchProductData?.searchProduct?.data]);

  useEffect(() => {
    if (getAggregatedShopData?.getAggregatedShop?.data) {
      const shopInfo = getAggregatedShopData?.getAggregatedShop?.data;
      const { phoneNumber, phoneCountryCode } = shopInfo;
      setPhoneString(`${phoneCountryCode} ${phoneNumber.slice(0, 4)} ****`);

      setProductData({ ...productData, shopInfo });
    }
  }, [getAggregatedShopData?.getAggregatedShop?.data]);

  useEffect(() => {
    if (productData.skus.length) {
      let sizes = [];
      let colors = [];
      productData.skus.map((x) =>
        x.properties.map((y) => {
          switch (y.name) {
            case 'SIZE': {
              if (!sizes.includes(y.value)) {
                sizes = [...sizes, y.value];
              }
              return null;
            }
            case 'COLOR': {
              if (!colors.includes(y.value)) {
                colors = [...colors, y.value];
              }
              return null;
            }
            default:
              return null;
          }
        })
      );

      const sku = productData.skus[productData.skus.length - 1];

      setProductData({ ...productData, sizes, colors, sku });
    }
  }, [productData.skus]);

  return searchProductLoading ||
    getProductLoading ||
    getAggregatedShopLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Container>
        <HeadRow>
          <ProductCard
            id={productData.id}
            imageUrls={productData.imageUrls}
            currentPrice={productData.sku.currentPrice}
            description={productData.description}
            isMain
          />
          <InfoBox>
            <Title>{productData.name}</Title>
            <h1 className="price">
              {currencyFormatter(productData.sku.currentPrice)}
            </h1>
            <ProductBox>
              <SkuType>Product category:</SkuType>
              <div className="item">{productData.category.name}</div>
            </ProductBox>
            <SkuType>Colours:</SkuType>
            <TagBox>
              <Tag>Steel Blue</Tag>
              <Tag>Urban Grey</Tag>
            </TagBox>
            <SkuType>Style</SkuType>
            <TagBox>
              <Tag>GTS</Tag>
              <Tag>GTS 2</Tag>
              <Tag>GTS 2e</Tag>
            </TagBox>
          </InfoBox>
          {productData.shopInfo && (
            <ShopCard
              color={getColor(productData.shopInfo.shopRank.rank.name)}
              shopInfo={productData.shopInfo}
              togglePhone={togglePhone}
              phoneString={phoneString}
              setTogglePhone={setTogglePhone}
              show
            />
          )}
        </HeadRow>
        <Row>
          <p>
            <b>About this product</b>
          </p>
          <Description>{productData.description}</Description>
        </Row>
        {productData.shopInfo && (
          <ShopCard
            color={getColor(productData.shopInfo.shopRank.rank.name)}
            shopInfo={productData.shopInfo}
            togglePhone={togglePhone}
            phoneString={phoneString}
            setTogglePhone={setTogglePhone}
            hide
          />
        )}

        <Row>
          <div className="row-header">
            <h3>New Product</h3>
            <h5 className="primary-color">See all</h5>
          </div>
          <NewProductList records={productData.records} />
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

export default ProductDetail;
