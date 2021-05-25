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
import { GET_SHOP_BY_ID } from 'graphQL/repository/shop.repository';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import phoneImg from 'shared/assets/phone-circle.svg';
import locationImg from 'shared/assets/location.svg';
import mailImg from 'shared/assets/mail-black.svg';

import NewProductList from 'components/product-listcard/new-product-list.component';
import ShopVerifies from 'components/shop-verifies/shop-verifies.component';

const Container = styled.div`
  margin: auto;

  .btn-info {
    margin-top: 16px;
    display: flex;
    #locationImg {
      align-self: flex-start;
      padding-top: 4px;
    }
  }

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

  .title {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #000000;
  }

  .cost {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 36px;
    color: #000000;
    margin-top: 16px;
  }

  .contact-wrapper {
    margin-top: 4px;
    display: flex;
    border-radius: 3px;
    width: 98px;
    height: 22px;
    img.heedImg {
      width: 11.67px;
      height: 11.67px;
      margin-left: 5.17px;
    }
  }

  .creditImg {
    width: 55px;
    height: 24px;
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
    p {
      color: #2b74e4;
    }
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
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
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
  display: grid;
  grid-template-columns: 367px 471px 260px;
  grid-gap: 24px;
  background: #ffffff;
  margin-bottom: 24px;
  padding: 32px 24px 24px;
`;

const HeadContact = styled.div`
  padding: 24px;
  width: 260px;
  height: 403px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: center;

  .contact {
    height: 403px;
  }

  .head {
    display: flex;
  }

  .sign {
    margin-left: 16px;
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

  return searchProductLoading || getProductLoading || getShopByIdLoading ? (
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
          <div>
            <Title>
              Amazfit GTS 2e Smartwatch with 24H Heart Rate Monitor, Sleep,
              Stress and SpO2 Monitor, Activity Tracker Sports Watch with 90
              Sports Modes, 14 Day Battery Life, Black
            </Title>
            <p className="cost">13.150.000 đ</p>
            <ProductBox>
              <SkuType>Product category:</SkuType>
              <div className="item">Sport, Watch, fashion</div>
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
          </div>
          <HeadContact>
            <div className="contact">
              <div className="head">
                <img className="avatarImg" alt="" />
                <div className="sign">
                  <h3>Blue Bird Shop</h3>
                  <div className="contact-wrapper">
                    <img className="creditImg" alt="" />
                    <p className="status">
                      <b>Good</b>
                    </p>
                    <img className="heedImg" alt="" />
                  </div>
                </div>
              </div>
              {productData.shopInfo && (
                <ShopVerifies
                  status={productData.shopInfo.kyb?.status}
                  kycStatus={productData.shopInfo?.kycStatus}
                  shopUrls={productData.shopInfo?.shopUrls}
                />
              )}

              <div className="phone-container">
                <img className="phoneImg" src={phoneImg} alt="" />
                <p>0901 *** ****</p>
                <p className="btn-click">Show</p>
              </div>
              <div className="btn-info">
                <img src={locationImg} alt="" />
                <p>
                  CirCo Coworking Space, H3 Building, 384 Hoàng Diệu, Phường 6,
                  Quận 4, tp Hồ Chí Minh, Việt Nam
                </p>
              </div>
              <div className="btn-info">
                <img src={mailImg} alt="" />
                <p>address@email.com</p>
              </div>
            </div>
          </HeadContact>
        </HeadRow>
        <Row>
          <p>
            <b>About this product</b>
          </p>
          <Description>
            3D CURVED DESIGN & HD AMOLED SCREEN: The Amazfit GTS 2 is a curved
            1.65" hd amoled screen, covered in 3d glass, boasts a crystal-clear
            341ppi pixel density, the bezel-less design naturally transitions to
            the aluminum alloy watch body for an enhanced visual aesthetic."
            LONG 7-DAY BATTERY LIFE & GPS BUILT-IN: The GTS 2 is equipped with a
            powerful 246mah battery that can last 7 days with typical use, and
            is always ready to escort you on your journeys and track your
            progress. Basic usage battery life-20 days. Heavy usage battery
            life-3.5 days
          </Description>
          <div className="btn-readmore">
            <p>
              <b>Read more</b>
            </p>
          </div>
        </Row>

        <Row>
          <div className="row-header">
            <h3>New Product</h3>
            <p>
              <b>See all</b>
            </p>
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
