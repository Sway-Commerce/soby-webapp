import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import locationImg from 'shared/assets/location.svg';
import mailImg from 'shared/assets/mail-black.svg';
import heedImg from 'shared/assets/heed.svg';
import { ReactComponent as ShopBadgeIcon } from 'shared/assets/badge-vector.svg';

import NewProductList from 'components/product-listcard/new-product-list.component';
import ShopVerifies from 'components/shop-verifies/shop-verifies.component';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import PhoneButton from 'pages/shop-profile/phone-button.component';
import ReactTooltip from 'react-tooltip';
import { getColor } from 'shared/constants/shop.constant';
import { redColor } from 'shared/css-variable/variable';
import buildAddressString from 'shared/utils/buildAddressString';
import { currencyFormatter } from 'shared/utils/formatCurrency';

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
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  background: #ffffff;
  margin-bottom: 24px;
  padding: 32px 24px 24px;
`;

const HeadContact = styled.div`
  padding: 24px;
  width: 260px;
  height: fit-content;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: center;

  .contact {
    height: 403px;
    width: 212px;
  }

  .head {
    display: flex;
  }

  .sign {
    margin-left: 16px;
    h3 {
      line-height: 19.44px;
    }
  }

  .avatarImg {
    width: 48px;
    height: 48px;
    border-radius: 3px;
    object-fit: cover;
  }

  .badge {
    width: 55px;
    height: 24px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    background-color: ${(props) => props?.color || redColor};
    p {
      font-size: 0.7rem;
      color: white;
      line-height: 24px;
    }
    svg {
      margin-right: 4px;
      path:last-child {
        fill: ${(props) => props?.color || redColor};
      }
    }
  }

  .contact-item {
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
    img {
      margin-right: 12px;
    }

    p {
      -webkit-line-clamp: 5;
    }
  }
`;

const TooltipData = styled.div`
  background-color: white;
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
      <ReactTooltip
        id="rank-info"
        aria-haspopup="true"
        role="example"
        place="left"
        type="light"
        effect="solid"
        globalEventOff="click"
      >
        <TooltipData>
          <h5>Soby Rank – Chỉ số uy tín</h5>
          <p className="mg-b-8">
            Giá trị của Soby Rank đối với một cửa hàng sẽ tương đương với tầm
            quan trọng của điểm IMDB đối với một bộ phim, hay của số sao
            Michelin đối với một nhà hàng.
          </p>
          <h5 className="primary-color clickable">Read more</h5>
        </TooltipData>
      </ReactTooltip>
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
              {productData.name}
            </Title>
            <h1 className="price">{currencyFormatter(productData.sku.currentPrice)}</h1>
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
          {productData.shopInfo && (
            <HeadContact
              color={getColor(productData.shopInfo.shopRank.rank.name)}
            >
              <div className="contact">
                <div className="head mg-b-16">
                  <img
                    className="avatarImg"
                    src={productData.shopInfo.logoUrl}
                    alt=""
                  />
                  <div className="sign">
                    <Link to={`/shop-profile/${productData.shopInfo.id}`}>
                      <h3
                        className="truncate"
                        data-tip={productData.shopInfo.name}
                      >
                        {productData.shopInfo.name}
                      </h3>
                    </Link>

                    <div className="contact-wrapper">
                      <div className="badge">
                        <ShopBadgeIcon />
                        <p>{+productData.shopInfo.shopRank.totalPoints / 10}</p>
                      </div>
                      <p className="status">
                        <b>{productData.shopInfo.shopRank.rank.description}</b>
                      </p>
                      <img
                        className="heed-icon"
                        src={heedImg}
                        alt=""
                        data-tip
                        data-for="rank-info"
                        data-event="click focus"
                      />
                    </div>
                  </div>
                </div>

                <ShopVerifies
                  status={productData.shopInfo.kyb?.status}
                  kycStatus={productData.shopInfo?.kycStatus}
                  shopUrls={productData.shopInfo?.shopUrls}
                />

                <PhoneButton
                  togglePhone={togglePhone}
                  phoneNumber={formatPhoneNumberIntl(
                    `${productData.shopInfo.phoneCountryCode}${productData.shopInfo.phoneNumber}`
                  )}
                  phoneNumberCovered={phoneString}
                  setTogglePhone={setTogglePhone}
                  showText="Show"
                  hideText="Hide"
                  show
                />
                <div className="contact-item">
                  <img src={locationImg} alt="" />
                  <p className="truncate" data-tip={productData.shopInfo.name}>
                    {buildAddressString(
                      productData.shopInfo.shippingLocations[0]
                    )}
                  </p>
                </div>
                <div className="contact-item">
                  <img src={mailImg} alt="" />
                  <p>{productData.shopInfo.email}</p>
                </div>
              </div>
            </HeadContact>
          )}
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
