import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from 'components/shop-item/shop-item.component';
import { useSelector } from 'react-redux';
import { SEARCH_PRODUCT } from 'graphQL/repository/product.repository';
import ProductListCard from 'components/product-listcard/product-listcard.component';
import { bodyColor } from 'shared/css-variable/variable';

const Container = styled.div`
  margin: auto;
  background-color: white;
  padding: 24px 24px 0;
  color: ${bodyColor};
`;

const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;

  @media only screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
  }

  padding-bottom: 71px;
  border-bottom: 1px solid #e4e4e4;

  @media only screen and (max-width: 600px) {
    padding-bottom: 24px;
    border-bottom: none;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ProductSection = styled.section`
  background-color: white;
  padding: 16px 24px 24px;

  @media screen and (max-width: 760px) {
    margin: 1rem 0;
    padding: 0.8rem 1.2rem;
    color: ${bodyColor};
  }
`;

const SearchResult = () => {
  const searchInput = useSelector((state) => {
    return state.user.searchInput;
  });
  const [records, setRecords] = useState([]);
  const [productRecords, setProductRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [query] = useState({
    page: 0,
    pageSize: 6,
    filters: [],
    queries: [],
    sorts: [],
  });

  const [
    searchAggregatedShop,
    {
      data: searchAggregatedShopData,
      loading: searchAggregatedShopLoading,
      error: searchAggregatedShopError,
    },
  ] = useLazyQuery(SEARCH_AGGREGATED_SHOP, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  useEffect(() => {
    searchAggregatedShop({
      variables: {
        query: {
          ...query,
          queries: searchInput ? [`name:${searchInput}`] : [],
        },
      },
    });

    searchProduct({
      variables: {
        searchInput: {
          ...query,
          pageSize: 4,
          queries: searchInput ? [`name:${searchInput}`] : [],
        },
      },
    });
  }, [searchInput]);

  const [
    searchProduct,
    { loading: productLoading, error: productError, data: productData },
  ] = useLazyQuery(SEARCH_PRODUCT);

  useEffect(() => {
    if (productData?.searchProduct?.data) {
      setProductRecords(productData?.searchProduct?.data?.records);
    }
  }, [productData?.searchProduct?.data]);

  useEffect(() => {
    if (searchAggregatedShopError?.message || productError?.message) {
      setFormError(searchAggregatedShopError?.message || productError?.message);
      setOpen(true);
    }
  }, [searchAggregatedShopError?.message, productError?.message]);

  useEffect(() => {
    if (searchAggregatedShopData?.searchAggregatedShop?.data) {
      setRecords(searchAggregatedShopData?.searchAggregatedShop?.data.records);
    }
  }, [searchAggregatedShopData?.searchAggregatedShop?.data]);

  return (
    <React.Fragment>
      <Container>
        <React.Fragment>
          {searchInput ? (
            <h2 className="mg-b-16">
              Here are your results for "{searchInput}"
            </h2>
          ) : (
            <h2 className="mg-b-16">Here are all the results</h2>
          )}

          <h5 className="mg-b-16">Shops</h5>
          {searchAggregatedShopLoading && !records.length ? (
            <Spinner />
          ) : (
            <ItemBox>
              {!!records.length ? (
                records.map((shop) => <ShopItem shop={shop} key={shop.id} />)
              ) : (
                <p>No results found</p>
              )}
            </ItemBox>
          )}
        </React.Fragment>
      </Container>

      <ProductSection hide>
        <HeaderRow>
          <h5>Products</h5>
          <h5 className="primary-color">See all</h5>
        </HeaderRow>
        {productLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {productRecords ? (
              <ProductListCard records={productRecords} />
            ) : (
              <p>No results found</p>
            )}
          </React.Fragment>
        )}
      </ProductSection>

      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default SearchResult;
