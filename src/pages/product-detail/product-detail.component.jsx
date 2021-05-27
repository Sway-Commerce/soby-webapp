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
import { bodyColor } from 'shared/css-variable/variable';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import shareImg from 'shared/assets/product-share.svg';

const Container = styled.div`
  margin: auto;
  padding-bottom: 92px;

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

  @media screen and (max-width: 768px) {
    color: ${bodyColor};
    padding-bottom: 40px;
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

const Tag = styled.div`
  background: #e4e4e4;
  border-radius: 3px;
  padding: 6px 16px;
  font-size: 0.7rem;
  @media screen and (max-width: 768px) {
    min-width: max-content;
  }
`;

const TagBox = styled.div`
  display: flex;
  margin-top: 8px;
  flex-wrap: wrap;
  @media screen and (max-width: 760px) {
    margin-bottom: 16px;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  gap: 8px;
`;

const ProductBox = styled.div`
  display: flex;
  margin-top: 20px;
  h5 + p {
    margin-left: 8px;
  }
`;

const Title = styled.h2`
  margin: 16px 0px;
  @media screen and (max-width: 600px) {
    -webkit-line-clamp: 2;
  }
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
  .sub-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    img {
      width: 2.2rem;
      height: 2.2rem;
      cursor: pointer;
    }

    .price {
      font-size: 1.6rem;
      line-height: 36px;
    }
  }
`;

const MobileSection = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  background-color: white;
  margin-bottom: ${(props) => (props.show ? '16px' : '0')};
  @media screen and (max-width: 760px) {
    margin: 1rem 0;
    padding: 0.8rem 1.2rem;
    display: ${(props) => (props.hide ? 'block' : 'none')};
    color: ${bodyColor};
  }
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
    typesObj: null,
  });
  const [phoneString, setPhoneString] = useState('');
  const [togglePhone, setTogglePhone] = useState(false);
  const [breadcrumbs, setBreadcrumb] = useState([
    {
      name: 'Home',
      src: '/',
    },
  ]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const {
    loading: getProductLoading,
    error: getProductError,
    data: getProductData,
  } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  useEffect(() => {
    if (getProductData?.getProduct?.data) {
      window.addEventListener('resize', update);
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

      setBreadcrumb([
        {
          name: 'Home',
          src: '/',
        },
        {
          name: name,
          src: `/product/${productId}`,
        },
      ]);

      getAggregatedShop({ variables: { id: shopId } });
    }
    return () => {
      window.removeEventListener('resize', update);
    };
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
      let typesObj = {};
      productData.skus.map((x) =>
        x.properties.map((y) => {
          const array = typesObj[y.name];
          typesObj = {
            ...typesObj,
            [y.name]: array
              ? !array.includes(y.value)
                ? [...array, y.value]
                : array
              : [y.value],
          };
          return null;
        })
      );

      const sku = productData.skus[productData.skus.length - 1];

      setProductData({ ...productData, typesObj, sku });
    }
  }, [productData.skus]);

  const update = () => {
    setWindowWidth(window.innerWidth);
  };

  return searchProductLoading ||
    getProductLoading ||
    getAggregatedShopLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />
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
            <Title className="truncate">{productData.name}</Title>
            <div className="sub-container">
              <h1 className="price">
                {currencyFormatter(productData.sku.currentPrice)}
              </h1>
              <img
                src={shareImg}
                alt=""
                onClick={() => {
                  navigator?.clipboard?.writeText(window.location.href);
                  window.alert('Product url is copied');
                }}
              />
            </div>
            <MobileSection show>
              <ProductBox>
                <h5>Product category:</h5>
                <p>{productData.category.name}</p>
              </ProductBox>
            </MobileSection>
            {productData.typesObj &&
              Object.keys(productData.typesObj).map((key) => {
                return (
                  <MobileSection show key={key}>
                    <h5>{key}</h5>
                    <TagBox>
                      {productData.typesObj[key].map((value) => (
                        <Tag key={value}>{value}</Tag>
                      ))}
                    </TagBox>
                  </MobileSection>
                );
              })}
          </InfoBox>
          {productData.shopInfo && windowWidth > 768 && (
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
        <MobileSection hide>
          <h5>Product category</h5>
          <p className="mg-b-16">{productData.category.name}</p>
          {productData.typesObj &&
            Object.keys(productData.typesObj).map((key) => {
              return (
                <React.Fragment key={key}>
                  <h5>{key}</h5>
                  <TagBox>
                    {productData.typesObj[key].map((value) => (
                      <Tag key={value}>{value}</Tag>
                    ))}
                  </TagBox>
                </React.Fragment>
              );
            })}
        </MobileSection>

        <Row>
          <h5>About this product</h5>
          <Description>{productData.description}</Description>
        </Row>
        {productData.shopInfo && windowWidth <= 768 && (
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
