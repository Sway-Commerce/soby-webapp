import React from 'react';
import { connect } from 'react-redux';

import { Card, Container } from './product-detail.styles';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  GET_PRODUCT,
  SEARCH_PRODUCT,
} from 'graphQL/repository/product.repository';
import Spinner from 'components/spinner/spinner.component';
import ProductCard from 'components/product-card/product-card.component';
import { currencyFormatter } from 'utils/formatCurrency';
import SkuChip from 'components/sku-chip/sku-chip.component';
import ShopCategory from 'components/shop-category/shop-category.component';
import { GET_SHOP_BY_ID } from 'graphQL/repository/shop.repository';
import ProductListCard from 'components/product-listcard/product-listcard.component';
import KybStatus from 'components/kyb-status/kyb-status.component';
import ShopNameCard from 'components/shop-name-card/shop-name-card.component';
import KybCard from 'components/kyb-card/kyb-card.component';

const ProductDetail = ({}) => {
  const { productId } = useParams();

  const { loading, error, data: productData } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  const { data } = productData?.getProduct || { data: {} };
  const { shopId } = data;

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
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

  const { loading: shopLoading, error: shopError, data: shopData } = useQuery(
    GET_SHOP_BY_ID,
    {
      variables: { id: shopId },
    }
  );

  if (loading || productsLoading || shopLoading) return <Spinner />;
  if (error || productsError || shopError)
    return `Error! ${error || productsError}`;

  let sku = {};
  const { skus, id, imageUrls, description, name, categories } = data;
  const { records } = productsData?.searchProduct?.data || { records: [] };
  const shopInfo = shopData?.getShopById?.data;
  const { status } = shopInfo.kyb ?? { status: null };
  let sizes = [];
  let colors = [];
  let weights = [];
  skus.map((x) =>
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

  if (skus.length) {
    sku = skus[skus.length - 1];
  }

  return (
    <Container>
      <div className="content-top">
        <div className="box-left">
          <ProductCard
            id={id}
            imageUrls={imageUrls}
            currentPrice={sku.currentPrice}
            description={description}
            isMain
          />
          <div className="shop-card">
            <ShopNameCard
              name={shopInfo.name}
              logoUrl={shopInfo.logoUrl}
              productView
              id={shopInfo.id}
            />
          </div>
          <KybCard status={status} productView />
        </div>

        <div className="box-right">
          <div className="tag"></div>
          <h2>{name}</h2>
          <h1>{currencyFormatter(sku.currentPrice)}</h1>
          <p>{description}</p>
          <h4>Colours</h4>
          <div className="options">
            {colors.map((x) => (
              <SkuChip name={x} key={x} />
            ))}
          </div>
          <h4 className="stretch">Size</h4>
          <div className="options">
            {sizes.map((x) => (
              <SkuChip name={x} key={x} />
            ))}
          </div>
          <h4 className="stretch">Weight</h4>
          <div className="options">
            {weights.map((x) => (
              <SkuChip name={x} key={x} />
            ))}
          </div>

          <h4 className="stretch">Show Categories</h4>
          <div className="options">
            {categories.map((x) => (
              <ShopCategory category={x} key={x} noBorder />
            ))}
          </div>

          <ProductListCard records={records} />
        </div>
      </div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(ProductDetail);
