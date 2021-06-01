import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import backgroundImg from 'shared/assets/home-background.svg';
import { CustomButton } from '../../components/ui/custom-button/custom-button.component';
import FormInput from 'components/form-input/form-input.component';
import { ReactComponent as SearchIcon } from 'shared/assets/search-btn.svg';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_AGGREGATED_SHOP } from 'graphQL/repository/shop.repository';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import ShopItem from './shop-item.component';

const Container = styled.div`
  margin: auto;

  .container {
    display: flex;
    height: 540px;
    background: #ffffff;
    margin-bottom: 24px;
    padding: 32px 24px 24px;
  }
`;

const Row = styled.div`
  width: 100%;
  background-color: white;
  margin-bottom: 1.2rem;
  margin-left: ${(props) =>
    props.headRow ? 'calc(((100vw - 1200px) / 2) * -1)' : 0};

  @media screen and (max-width: 1200px) {
    margin-left: 0;
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    p {
      color: #2b74e4;
    }
  }
`;

const HeadHome = styled.div`
  height: 386.84px;
  background-image: url(${backgroundImg});
  padding: 121.42px 24px 24px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;

  .soby-welcome {
    font-size: 2.6rem;
    font-weight: bold;
    line-height: 73px;
  }

  * + * {
    margin-top: 8px;
  }

  @media screen and (max-width: 600px) {
    height: 320px;
    padding-top: 112px;
    align-items: flex-start;
    .soby-welcome {
      font-size: 32px;
      line-height: 45px;
    }
    h3.mobile-hide {
      display: none;
    }
  }
`;

const Search = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  position: relative;

  .main-btn {
    width: 120px;
    margin: 0 0 0 14px;
  }
  input#home-input {
    height: 2.4rem;
    width: 600px;
    border-radius: 3px;
    padding: 0 24px;
    margin-top: 1px;
    & ~ label {
      left: 24px;
      top: 5px;
    }
  }
  svg.mobile-btn {
    display: none;
  }

  @media screen and (max-width: 768px) {
    input#home-input {
      width: calc(100vw - 48px);
      padding: 0 16px;
      & ~ label {
        left: 16px;
        top: 0;
      }
    }
    .main-btn {
      display: none;
    }
    svg.mobile-btn {
      display: block;
      position: absolute;
      right: 16px;
      bottom: 10px;
    }
  }
`;

const Latest = styled.div`
  background-color: white;
  padding: 24px;
  h3 {
    margin-bottom: 24px;
  }

  @media only screen and (min-width: 600px) {
    h3 {
      margin-bottom: 0;
    }
  }
`;

const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;

  @media only screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
  }

  padding-bottom: 24px;
  border-bottom: 1px solid #e4e4e4;

  @media only screen and (max-width: 600px) {
    padding-bottom: 24px;
    border-bottom: none;
  }
`;

const HomePage = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [query, setQuery] = useState({
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
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const lastSevenDay = date.getTime();
    const now = Date.now();
    setQuery({ ...query, filters: [`createdAt:${lastSevenDay};${now}`] });
  }, []);

  useEffect(() => {
    if (query.filters.length) {
      searchAggregatedShop({
        variables: {
          query: {
            ...query,
            filters: [],
          },
        },
      });
    }
  }, [query]);

  useEffect(() => {
    if (searchAggregatedShopError?.message) {
      setFormError(searchAggregatedShopError?.message);
      setOpen(true);
    }
  }, [searchAggregatedShopError?.message]);

  useEffect(() => {
    if (searchAggregatedShopData?.searchAggregatedShop?.data) {
      setRecords(searchAggregatedShopData?.searchAggregatedShop?.data.records);
    }
  }, [searchAggregatedShopData?.searchAggregatedShop?.data]);

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { value } = event?.target;
    setInputSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery({ ...query, queries: [`name:${inputSearch}`] });
  };
  return (
    <React.Fragment>
      <Container>
        <Row headRow>
          <HeadHome>
            <p className="soby-welcome">Welcome to Soby</p>
            <h3 className="fw-normal">
              Find your trust Sellers and have safe transactions with Soby
            </h3>
            <h3 className="fw-normal mobile-hide">
              Lorem ipsum dolor sit amet
            </h3>
            <Search onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="inputSearch"
                value={inputSearch}
                onChange={handleChange}
                placeholder="Search for Shop, product and invoice"
                required
                withoutTitle
                id="home-input"
              />
              <SearchIcon
                onClick={handleSubmit}
                className="mobile-btn clickable"
              />
              <CustomButton type="submit" className="main-btn">
                Search
              </CustomButton>
            </Search>
          </HeadHome>
        </Row>
        <Latest>
          <h3>Latest Shops</h3>
          {searchAggregatedShopLoading ? (
            <Spinner />
          ) : (
            <ItemBox>
              {records.map((shop) => (
                <ShopItem shop={shop} key={shop.id} />
              ))}
            </ItemBox>
          )}
        </Latest>
      </Container>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default HomePage;
