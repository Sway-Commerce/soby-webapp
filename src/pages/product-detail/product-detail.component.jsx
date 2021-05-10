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

import { ReactComponent as FbIcon } from 'shared/assets/facebook.svg';
import { ReactComponent as ZaloIcon } from 'shared/assets/zalo.svg';
import { ReactComponent as LinkIcon } from 'shared/assets/link.svg';
import { ReactComponent as MailIcon } from 'shared/assets/mail.svg';
import { ReactComponent as InstaIcon } from 'shared/assets/instagram.svg';
import { ReactComponent as BlueBirdIcon } from 'shared/assets/bluebird.svg';
import { ReactComponent as TalkIcon } from 'shared/assets/talk.svg';
import { ReactComponent as LocationIcon } from 'shared/assets/location.svg';
import { ReactComponent as InboxIcon } from 'shared/assets/inbox.svg';
import { ReactComponent as CallIcon } from 'shared/assets/call.svg';

const Container = styled.div`
  display: flex;
  background: #ffffff;
  padding: 28px;
  margin-top: 40px;

  .advertise {
    background-color: #393e46;
    width: 367px;
    height: 479, 39px;
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

  .product-info {
    margin-top: 16px;
    display: flex;
  }

  .product {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }

  .item {
    margin-left: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #4f4f4f;
  }

  .options {
    display: flex;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #4f4f4f;
  }

  .box-1 {
    background: #e4e4e4;
    border-radius: 3px;
    padding: 6px 16px;
    margin-left: 8px;
  }

  .steel-blue {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #4f4f4f;
    text-align: center;
  }

  .urban-grey {
    display: flex;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #4f4f4f;
  }

  .obsidian-black {
    display: flex;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #4f4f4f;
  }

  .lava-grey {
    display: flex;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #4f4f4f;
  }

  .vermillion-orange {
    display: flex;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #4f4f4f;
  }

  .color-info {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-top: 16px;
    margin-bottom: 14px;
  }

  .style-info {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-top: 16px;
    margin-bottom: 14px;
  }

  .share-info {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-top: 22px;
    margin-bottom: 30px;
  }

  .share {
    display: flex;
  }

  .fb {
    margin-left: 16px;
    width: 36px;
    height: 36px;
  }

  .zalo {
    margin-left: 8px;
    width: 36px;
    height: 36px;
  }

  .link {
    margin-left: 8px;
    width: 36px;
    height: 36px;
  }

  .mail {
    margin-left: 8px;
    width: 36px;
    height: 36px;
  }

  .ins {
    margin-left: 8px;
    width: 36px;
    height: 36px;
  }

  .head {
    display: flex;
  }

  .contact-wrapper {
    margin-top: 4px;
    display: flex;
    background: #f2f2f2;
    border-radius: 3px;
    padding: 4px 12px;
    width: 98px;
    height: 22px;
  }

  .sign {
    margin-left: 16px;
  }

  .talk {
    margin-right: 10px;
    width: 10px;
    height: 10px;
    margin-top: 2px;
  }

  .shop {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
  }

  .contact-info {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: #000000;
  }

  .head {
    margin-left: 46px;
  }

  .location-info {
    display: flex;
    margin-top: 24px;
  }

  .location {
    width: 16px;
    height: 16px;
    margin-top: 3px;
  }

  .address {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #4f4f4f;
    margin-left: 12px;
  }

  .inbox-info {
    display: flex;
    margin-top: 8px;
    margin-right: 20px;
  }

  .call-info {
    display: flex;
    margin-top: 8px;
  }

  .inbox {
    width: 25px;
    height: 25px;
    margin-top: 3px;
    margin-left: -4px;
  }

  .contact {
    width: 290px;
  }
`;

const ShareTo = styled.div`
  padding: 15px 0 0 0;
  margin-left: 16px;
  * + * {
    margin-left: 8px;
  }
`;

const Description = styled.div`
  height: 204px;
  background: #ffffff;
  padding: 28px;
  margin-top: 24px;

  .main-info {
    margin: 8px 0 4px;
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
    shopInfo: {
      name: '',
      logoUrl: '',
      id: '',
    },
    sizes: [],
    colors: [],
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
        <div className="advertise"></div>
        <div className="info-wrapper">
          <p className="title">
            Amazfit GTS 2e Smartwatch with 24H Heart Rate Monitor, Sleep, Stress
            and SpO2 Monitor, Activity Tracker Sports Watch with 90 Sports
            Modes, 14 Day Battery Life, Black
          </p>
          <p className="cost">13.150.000 đ</p>
          <div className="product-info">
            <div className="product">Product category:</div>
            <div className="item">Sport, Watch, fashion</div>
          </div>
          <div className="color">
            <p className="color-info">Colours:</p>
          </div>
          <div className="options">
            <div className="box-1">
              <p className="steel-blue">Steel Blue</p>
            </div>
            <div className="box-1">
              <p className="urban-grey">Urban Grey</p>
            </div>
          </div>
          <div className="style">
            <p className="style-info">Style</p>
          </div>
          <div className="options">
            <div className="box-1">
              <p className="steel-blue">GTS</p>
            </div>
            <div className="box-1">
              <p className="urban-grey">GTS 2</p>
            </div>
            <div className="box-1">
              <p className="obsidian-black">GTS 2e</p>
            </div>
          </div>
          <div className="share">
            <p className="share-info">Share</p>
            <ShareTo>
              <FbIcon />
              <ZaloIcon />
              <LinkIcon />
              <MailIcon />
              <InstaIcon />
            </ShareTo>
          </div>
        </div>
        <div className="contact">
          <div className="head">
            <BlueBirdIcon />
            <div className="sign">
              <p className="shop">Blue Bird Shop</p>
              <div className="contact-wrapper">
                <TalkIcon />
                <p className="contact-info">CONTACT</p>
              </div>
            </div>
          </div>
          <div className="location-info">
            <LocationIcon />
            <p className="address">
              CirCo Coworking Space, H3 Building, 384 Hoàng Diệu, Phường 6, Quận
              4, tp Hồ Chí Minh, Việt Nam
            </p>
          </div>
          <div className="location-info">
            <InboxIcon />
            <p className="address">address@email.com</p>
          </div>
          <div className="location-info">
            <CallIcon />
            <p className="address">+84 90 123 456 78</p>
          </div>
        </div>
      </Container>

      <Description>
        <p>
          <b>About this product</b>
        </p>
        <p className="main-info body-color">
          3D CURVED DESIGN & HD AMOLED SCREEN: The Amazfit GTS 2 is a curved
          1.65" hd amoled screen, covered in 3d glass, boasts a crystal-clear
          341ppi pixel density, the bezel-less design naturally transitions to
          the aluminum alloy watch body for an enhanced visual aesthetic." LONG
          7-DAY BATTERY LIFE & GPS BUILT-IN: The GTS 2 is equipped with a
          powerful 246mah battery that can last 7 days with typical use, and is
          always ready to escort you on your journeys and track your progress.
          Basic usage battery life-20 days. Heavy usage battery life-3.5 days
        </p>
        <p className="primary-color">Read more</p>
      </Description>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default ProductDetail;
